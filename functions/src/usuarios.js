const { firestore, auth } = require("../firebase-server");
const { includeSearch, handleAutherror } = require("../helpers");
const moment = require("moment");
const { Router } = require("express");

const router = Router();

const COLLECTION = "usuarios";
const PATH = "/api/" + COLLECTION;
const INTERNAL_ERROR_MESSAGE = ", por favor intente nuevamente o comuníquese con el administrador del sistema";

router.get(PATH, async ({ query }, res) => {
	try {
		let docRef = firestore.collection(COLLECTION);

		!!query.search && (docRef = includeSearch(docRef, query.search));

		const pageNumber = parseInt(query.page) || 0;
		const pageSize = parseInt(query.size) || 5;

		const snapshot = await docRef.get();
		const page = await docRef
			.limit(pageSize)
			.offset(pageNumber * pageSize)
			.get();

		const snapshotData = page.docs.map((doc) => {
			const { displayName, role } = doc.data();

			return {
				id: doc.id,
				displayName,
				role
			};
		});

		return res.status(200).json({
			page: pageNumber,
			size: pageSize,
			count: snapshot.size,
			content: snapshotData
		});
	} catch (error) {
		return res.status(500).json({ message: "Hubo un error al obtener usuarios" + INTERNAL_ERROR_MESSAGE });
	}
});

router.get(PATH + "/:id", async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El usuario ${params.id} no existe` });
		}

		const { search, ...snapshotData } = snapshot.data();
		return res.status(200).json({ id: snapshot.id, ...snapshotData });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al obtener el usuario ${params.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.post(PATH + "/add", async ({ body }, res) => {
	try {
		const date = moment();
		const { password, ...content } = body;
		const { email, phoneNumber, nombre, apellidoPaterno, apellidoMaterno } = content;
		const displayName = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`;
		const id = date.format("x");

		const user = { uid: id, password, email, displayName };
		!!phoneNumber && (user.phoneNumber = "+52" + phoneNumber);

		const { uid } = await auth.createUser(user);
		const docRef = firestore.collection(COLLECTION).doc(uid);

		await docRef.set({ ...content, displayName, search: displayName.toLowerCase() });

		return res.status(200).json({ message: `El usuario ${displayName} ha sido creado con el id ${uid}` });
	} catch (error) {
		const { id, email, phoneNumber } = body;
		const errorMessage = `Hubo un error al agregar el usuario ${id}` + INTERNAL_ERROR_MESSAGE;
		const httpError = handleAutherror(error, { id, phoneNumber, email }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message });
	}
});

router.put(PATH + "/update", async ({ body }, res) => {
	try {
		const { id, ...content } = body;
		const docRef = firestore.collection(COLLECTION).doc(id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El usuario ${body.id} no existe` });
		}

		const meta = {};

		if (!!content.nombre || !!content.apellidoPaterno || !!content.apellidoMaterno) {
			const { nombre, apellidoPaterno, apellidoMaterno } = content;
			const current = snapshot.data();

			const displayName = `${nombre || current.nombre} ${apellidoPaterno || current.apellidoPaterno} ${
				apellidoMaterno || current.apellidoMaterno
			}`;

			content.displayName = displayName;
		}

		if (!!content.displayName) {
			meta.displayName = content.displayName;
			content.search = content.displayName.toLowerCase();
		}
		!!content.phoneNumber && (meta.phoneNumber = "+52" + content.phoneNumber);
		!!content.email && (meta.email = content.email);

		if (Object.keys(meta).length > 0) {
			const { uid } = await auth.updateUser(id, meta);
			console.log(`El usuario ${uid} ha sido actualizado`);
		}

		await docRef.update(content);

		return res.status(200).json({ message: `El usuario ${id} ha sido actualizado` });
	} catch (error) {
		const { id, email, phoneNumber } = body;
		const errorMessage = `Hubo un error al actualizar el usuario ${id}` + INTERNAL_ERROR_MESSAGE;
		const httpError = handleAutherror(error, { id, phoneNumber, email }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message });
	}
});

router.delete(PATH + "/delete/:id", async ({ params }, res) => {
	try {
		await auth.deleteUser(params.id);
		return res.status(200).json({ message: `El producto ${params.id} ha sido eliminado` });
	} catch (error) {
		const { id } = params;
		const errorMessage = `Hubo un error al eliminar el usuario ${id}` + INTERNAL_ERROR_MESSAGE;
		const httpError = handleAutherror(error, { id, phoneNumber: "", email: "" }, errorMessage);
		return res.status(httpError.status).json({ message: httpError.message });
	}
});

module.exports = router;

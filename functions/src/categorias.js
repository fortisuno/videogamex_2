const slugify = require("slugify");
const { firestore } = require("../firebase-server");
const { includeSearch } = require("../helpers");
const { Router } = require("express");

const router = Router();

const COLLECTION = "categorias";
const PATH = "/api/" + COLLECTION;
const INTERNAL_ERROR_MESSAGE =
	", por favor intente nuevamente o comuníquese con el administrador del sistema";

router.get(PATH, async ({ query }, res) => {
	try {
		let docRef = firestore.collection(COLLECTION);

		!!query.search && (docRef = includeSearch(docRef, query.search));

		const snapshot = await docRef.get();

		if (!!query.pagination && query.pagination === "true") {
			const pageNumber = parseInt(query.page) || 0;
			const pageSize = parseInt(query.size) || 5;

			const page = await docRef
				.limit(pageSize)
				.offset(pageNumber * pageSize)
				.get();

			const snapshotData = page.docs.map((doc) => {
				const { search, ...content } = doc.data();

				return {
					id: doc.id,
					...content
				};
			});

			return res.status(200).json({
				page: pageNumber,
				size: pageSize,
				count: snapshot.size,
				content: snapshotData
			});
		} else {
			const snapshotData = snapshot.docs.map((doc) => {
				const { search, ...content } = doc.data();

				return {
					id: doc.id,
					...content
				};
			});

			return res.status(200).json(snapshotData);
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: "Hubo un error al obtener categorías" + INTERNAL_ERROR_MESSAGE });
	}
});

router.get(PATH + "/:id", async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `La categoría ${params.id} no existe` });
		}

		const { search, ...snapshotData } = snapshot.data();
		return res.status(200).json({ id: snapshot.id, ...snapshotData });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al obtener la categoría ${params.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.post(PATH + "/add", async ({ body }, res) => {
	try {
		const id = slugify(body.titulo, { lower: true, strict: true, locale: "es" });
		const docRef = firestore.collection(COLLECTION).doc(id);
		const snapshot = await docRef.get();

		if (snapshot.exists) {
			return res.status(400).json({ message: `La categoría ${id} ya existe` });
		}

		await docRef.set({ ...body, search: body.titulo.toLowerCase() });

		return res.status(200).json({ message: `La categoría ${id} ha sido creado` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al agregar la categoría ${body.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.put(PATH + "/update", async ({ body }, res) => {
	try {
		const { id, titulo } = body;
		const docRef = firestore.collection(COLLECTION).doc(id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `La categoría ${id} no existe` });
		}

		const newId = slugify(titulo, { lower: true, strict: true, locale: "es" });
		const newDocRef = firestore.collection(COLLECTION).doc(newId);
		const newSnapshot = await newDocRef.get();

		if (newSnapshot.exists) {
			return res.status(400).json({ message: `La categoría ${newId} ya existe` });
		}

		const productosRef = firestore.collection("productos").where("categoriaId", "==", id);
		const productosSnapshot = await productosRef.get();
		const batch = firestore.batch();

		productosSnapshot.forEach((doc) => {
			batch.update(doc.ref, { categoriaId: newId });
		});

		batch.set(newDocRef, { titulo, search: body.titulo.toLowerCase() });
		batch.delete(docRef);

		await batch.commit();

		return res.status(200).json({ message: `La categoría ${id} ha sido actualizada a ${newId}` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al actualizar la categoría ${body.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.delete(PATH + "/delete/:id", async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `La categoría ${params.id} no existe` });
		}

		const productosRef = firestore.collection("productos").where("categoriaId", "==", params.id);
		const productosSnapshot = await productosRef.get();

		if (!productosSnapshot.empty) {
			return res.status(500).json({
				message: `La categoría ${params.id} no puede ser eliminada porque tiene productos asociados`
			});
		}

		await docRef.delete();

		return res.status(200).json({ message: `La categoría ${params.id} ha sido eliminado` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al eliminar la categoría ${params.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

module.exports = router;

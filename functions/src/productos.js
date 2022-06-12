const slugify = require("slugify");
const { includeSearch } = require("../helpers");
const { Router } = require("express");
const { firestore } = require("../firebase-server");

const router = Router();

const COLLECTION = "productos";
const PATH = "/api/" + COLLECTION;
const INTERNAL_ERROR_MESSAGE = ", por favor intente nuevamente o comuníquese con el administrador del sistema";

const validateCategoria = async (id) => {
	const docRef = firestore.collection("categorias").doc(id);
	const snapshot = await docRef.get();
	return snapshot.exists;
};

const getCategoria = async (id) => {
	const docRef = firestore.collection("categorias").doc(id);
	const snapshot = await docRef.get();
	const { titulo } = snapshot.data();
	return titulo;
};

router.get(PATH, async ({ query }, res) => {
	try {
		let docRef = firestore.collection(COLLECTION);

		!!query.search && (docRef = includeSearch(docRef, query.search));
		!!query.categoriaId && (docRef = docRef.where("categoriaId", "==", query.categoriaId));

		const pageNumber = parseInt(query.page) || 0;
		const pageSize = parseInt(query.size) || 12;

		const snapshot = await docRef.get();
		const page = await docRef
			.limit(pageSize)
			.offset(pageNumber * pageSize)
			.get();

		const snapshotData = await Promise.all(
			page.docs.map(async (doc) => {
				const { titulo, stock, precio, imagen, categoriaId } = doc.data();
				const categoria = await getCategoria(categoriaId);
				const content = { titulo, stock };

				if (!!query.asCard && query.asCard === "true") {
					content.categoria = categoria;
					content.precio = precio;
					content.imagen = imagen;
				}

				return {
					id: doc.id,
					...content
				};
			})
		);

		return res.status(200).json({
			page: pageNumber,
			size: pageSize,
			count: snapshot.size,
			content: snapshotData
		});
	} catch (error) {
		return res.status(500).json({ message: "Hubo un error al obtener productos" + INTERNAL_ERROR_MESSAGE });
	}
});

router.get(PATH + "/:id", async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El producto ${params.id} no existe` });
		}

		const { search, ...snapshotData } = snapshot.data();
		return res.status(200).json({ id: snapshot.id, ...snapshotData });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al obtener el producto ${params.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.post(PATH + "/add", async ({ body }, res) => {
	try {
		const id = slugify(body.titulo, { lower: true, strict: true, locale: "es" });
		const docRef = firestore.collection(COLLECTION).doc(id);
		const snapshot = await docRef.get();

		if (snapshot.exists) {
			return res.status(400).json({ message: `El producto ${id} ya existe` });
		}

		const categoriaExiste = await validateCategoria(body.categoriaId);
		if (!categoriaExiste) {
			return res.status(400).json({ message: `La categoría ${body.categoriaId} no existe` });
		}
		await docRef.set({ ...body, search: body.titulo.toLowerCase() });

		return res.status(200).json({ message: `El producto ${id} ha sido creado` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al agregar el producto ${body.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.put(PATH + "/update", async ({ body }, res) => {
	try {
		const { id, ...content } = body;
		const docRef = firestore.collection(COLLECTION).doc(id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(400).json({ message: `El producto ${id} ya existe` });
		}

		if (!!body.categoriaId) {
			const categoriaExiste = await validateCategoria(body.categoriaId);
			if (!categoriaExiste) {
				return res.status(400).json({ message: `La categoría ${body.categoriaId} no existe` });
			}
		}

		if (!!body.titulo) {
			const newId = slugify(body.titulo, { lower: true, strict: true, locale: "es" });
			const newDocRef = firestore.collection(COLLECTION).doc(newId);
			const newSnapshot = await newDocRef.get();

			if (newSnapshot.exists) {
				return res.status(400).json({ message: `El producto ${newId} ya existe` });
			}

			const { titulo, search, ...currentData } = snapshot.data();
			const batch = firestore.batch();

			batch.set(newDocRef, {
				...currentData,
				...content,
				search: body.titulo.toLowerCase(),
				titulo: body.titulo
			});
			batch.delete(docRef);

			await batch.commit();

			return res.status(200).json({ message: `El producto ${id} ha sido actualizado a ${newId}` });
		}

		await docRef.update(content);

		return res.status(200).json({ message: `El producto ${id} ha sido actualizado` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al actualizar el producto ${body.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.delete(PATH + "/delete/:id", async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `El producto ${params.id} no existe` });
		}

		await docRef.delete();

		return res.status(200).json({ message: `El producto ${params.id} ha sido eliminado` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al eliminar el producto ${params.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

module.exports = router;

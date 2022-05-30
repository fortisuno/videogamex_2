const functions = require("firebase-functions");
const { firestore } = require("../firebase-server");

exports.getCategorias = functions.https.onCall(async (data, context) => {
	try {
		const querySnapshot = firestore.collection("categorias").orderBy("titulo");
		const snapshot = await querySnapshot.get();

		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		throw error;
	}
});

exports.getCategoriaDetalle = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("categorias").doc(data.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}

		return { id: snapshot.id, ...snapshot.data() };
	} catch (error) {
		throw error;
	}
});

exports.addCategoria = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("categorias").doc(data.id);
		const snapshot = await docRef.get();
		if (snapshot.exists) {
			throw new functions.https.HttpsError("already-exists", "El Id proporcionado ya existe");
		}
		const { id, ...content } = data;
		await docRef.set(content);
		return `La categoría ${data.id} ha sido creada`;
	} catch (error) {
		throw error;
	}
});

exports.updateCategoria = functions.https.onCall(async (data, context) => {
	try {
		const collectionRef = firestore.collection("categorias");
		const currentRef = collectionRef.doc(data.id);
		const newRef = collectionRef.doc(data.newId);
		const currentSnapshot = await currentRef.get();
		const newSnapshot = await newRef.get();

		if (!currentSnapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		} else if (newSnapshot.exists) {
			throw new functions.https.HttpsError(
				"already-exists",
				`La categoría ${data.titulo} ya existe`
			);
		}

		const collectionProdutos = firestore.collection("productos");
		const productosSnapshot = await collectionProdutos.where("categoria.id", "==", data.id).get();

		const batch = firestore.batch();

		productosSnapshot.forEach((doc) => {
			const docRef = collectionProdutos.doc(doc.id);
			batch.update(docRef, { categoria: { id: data.newId, titulo: data.titulo } });
		});

		await batch.commit();

		const { id, newId, ...content } = data;

		await currentRef.delete();
		await newRef.set(content);

		return `La categoría ${data.id} ha sido cambiada por ${data.newId}`;
	} catch (error) {
		throw error;
	}
});

exports.deleteCategoria = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("categorias").doc(data.id);
		const snapshot = await docRef.get();
		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}

		const productos = firestore.collection("productos");
		const querySnapshot = await productos.where("categoria", "==", data.id).get();

		if (!querySnapshot.empty) {
			throw new functions.https.HttpsError(
				"aborted",
				"Existen productos con esta categoría, elimine los productos o pruebe actualizar la categoría"
			);
		}

		await docRef.delete();

		return `La categoría ${data.id} ha sido eliminada`;
	} catch (error) {
		throw error;
	}
});

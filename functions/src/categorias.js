const functions = require("firebase-functions");
const { firestore } = require("../firebase-server");

exports.getCategorias = functions.https.onCall(async (data, context) => {
	try {
		const allCollection = firestore.collection("categorias").orderBy("titulo");
		const snapshot = await allCollection.get();

		const snapshotData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return snapshotData;
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
		const query = firestore.collection("categorias");
		const snapshotCurrent = query.doc(data.id);
		const snapshotNew = query.doc(data.newId);
		const currentRef = await snapshotCurrent.get();
		const newRef = await snapshotNew.get();

		if (!currentRef.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		} else if (newRef.exists) {
			throw new functions.https.HttpsError(
				`already-exists", "La categoría ${data.titulo} ya existe`
			);
		}

		const queryProductos = firestore.collection("productos");
		const snapshotProductos = await queryProductos.where("categoria", "==", data.id).get();

		const batch = firestore.batch();

		snapshotProductos.forEach((doc) => {
			const docRef = queryProductos.doc(doc.id);
			batch.update(docRef, { categoria: { id: data.newId, titulo: data.titulo } });
		});

		await batch.commit();

		const { id, ...content } = data;

		await currentRef.delete();
		await newRef.set(content);

		return `La categoría ${data.id.current} ha sido cambiada por ${data.id.new}`;
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

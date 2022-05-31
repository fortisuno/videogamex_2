const functions = require("firebase-functions");
const { FieldValue } = require("firebase-admin/firestore");
const { firestore } = require("../firebase-server");

exports.getProductos = functions.https.onCall(async (data, context) => {
	try {
		let docRef = firestore.collection("productos");

		if (!!data.inStock) {
			docRef = docRef.where("stock", ">", 0);
		}

		if (!!data.categoria) {
			docRef = docRef.where("categoria", "==", data.categoria);
		}

		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => {
			const content = doc.data();

			const producto = { titulo: content.titulo, stock: content.stock };

			if (!!data.asCard) {
				producto.precio = content.precio;
				producto.imagen = content.imagen;
				producto.categoria = content.categoria;
			}

			return {
				id: doc.id,
				...producto
			};
		});
		return snapshotData;
	} catch (error) {
		throw error;
	}
});

exports.getProductoDetalle = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("productos").doc(data.id);
		const snapshot = await docRef.get();
		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}
		const snapshotData = snapshot.data();
		return { id: snapshot.id, ...snapshotData };
	} catch (error) {
		throw error;
	}
});

exports.addProducto = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("productos").doc(data.id);
		const snapshot = await docRef.get();

		if (snapshot.exists) {
			throw new functions.https.HttpsError(
				"already-exists",
				`Este titulo ya está registrado con el id ${data.id}`
			);
		}
		const { categoria } = data;
		const categorias = firestore.collection("categorias").doc(categoria.id);
		const categoriaSnapshot = await categorias.get();

		if (!categoriaSnapshot.exists) {
			throw new functions.https.HttpsError(
				"failed-precondition",
				"La categoria proporcionada no existe"
			);
		}

		const { id, ...content } = data;
		await docRef.set(content);

		return `El producto ${data.id} ha sido creado`;
	} catch (error) {
		throw error;
	}
});

exports.updateProducto = functions.https.onCall(async (data, context) => {
	try {
		const query = firestore.collection("productos");
		const snapshotCurrent = query.doc(data.id);
		const currentRef = await snapshotCurrent.get();

		let message = "";

		if (!currentRef.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}

		if (!!data.categoria) {
			const queryCategorias = firestore.collection("categorias").doc(data.categoria.id);
			const snapshotCategorias = await queryCategorias.get();
			if (!snapshotCategorias.exists) {
				throw new functions.https.HttpsError(
					"not-found",
					`La categoría ${data.categoria.id} no existe.`
				);
			}
		}

		if (!!data.newId) {
			const { id, newId, ...content } = data;
			const snapshotNew = query.doc(data.newId);
			const newRef = await snapshotNew.get();

			if (newRef.exists) {
				throw new functions.https.HttpsError(
					"already-exists",
					`El producto ${data.titulo} ya existe`
				);
			}

			const productoData = currentRef.data();
			const current = {
				id: snapshotCurrent.id,
				titulo: productoData.titulo,
				precio: productoData.precio
			};

			const queryVentas = firestore.collection("ventas");
			const snapshotVentas = await queryVentas
				.where("productos", "array-contains", current)
				.get();

			const batch = firestore.batch();

			snapshotVentas.forEach(async (doc) => {
				const docRef = queryVentas.doc(doc.id);
				const venta = await docRef.get();
				const { productos } = venta.data();
				batch.update(docRef, {
					productos: productos.map((p) =>
						p.id === data.id ? { ...p, id: data.newId, titulo: data.titulo } : p
					)
				});
			});

			batch.commit();

			await snapshotCurrent.delete();
			await snapshotNew.set({ ...productoData, ...content });
			message = `El producto ${data.id} a sido actualizado a ${data.newId}.`;
		} else {
			const { id, ...content } = data;
			await snapshotCurrent.update(content);
			message = `El producto ${data.id} a sido actualizado.`;
		}
		return message;
	} catch (error) {
		throw new functions.https.HttpsError(error.code, error.message);
	}
});

exports.deleteProducto = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("productos").doc(data.id);
		const snapshot = await docRef.get();
		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}
		await docRef.delete();
		return `El producto ${data.id} ha sido eliminado`;
	} catch (error) {
		throw error;
	}
});

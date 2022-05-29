const functions = require("firebase-functions");
const { firestore } = require("../firebase-server");

exports.getVentas = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("ventas").orderBy("fecha", "desc");
		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => {
			const content = doc.data();
			return {
				id: doc.id,
				content: {
					usuario: content.usuario,
					metodo: content.metodoPago,
					total: content.total
				}
			};
		});
		return snapshotData;
	} catch (error) {
		throw error;
	}
});

exports.getVentasDetalle = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("ventas").doc(data.id);
		const snapshot = await docRef.get();
		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}
		const snapshotData = snapshot.data();
		return { id: snapshot.id, content: snapshotData };
	} catch (error) {
		throw error;
	}
});

exports.addVenta = functions.https.onCall(async (data, context) => {
	try {
		await firestore.collection("ventas").doc(data.id).set(data.content);

		return "Venta Realizada";
	} catch (error) {
		throw error;
	}
});

exports.deleteVenta = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("ventas").doc(data.id);
		const snapshot = await docRef.get();
		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}
		return await docRef.delete();
	} catch (error) {
		throw error;
	}
});

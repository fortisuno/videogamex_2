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
				usuario: content.usuario,
				total: content.total
			};
		});
		return snapshotData;
	} catch (error) {
		throw error;
	}
});

exports.getVentaDetalle = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("ventas").doc(data.id);
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

exports.addVenta = functions.https.onCall(async (data, context) => {
	try {
		const { id, ...content } = data;
		await firestore.collection("ventas").doc(data.id).set(content);

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

exports.getResumen = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("ventas");
		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => doc.data());
		const ingresos = {};
		snapshotData.forEach((venta) => {
			ingresos[venta.anio] = (ingresos[venta.anio] || 0) + venta.total;
		});
		return Object.entries(ingresos).map(([anio, total]) => ({ anio, total }));
	} catch (error) {
		throw error;
	}
});

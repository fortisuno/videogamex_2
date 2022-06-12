const functions = require("firebase-functions");
const { auth, firestore } = require("./firebase-server");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({ origin: true }));

app.use(require("./src/productos"));
app.use(require("./src/categorias"));
app.use(require("./src/ventas"));
app.use(require("./src/usuarios"));

exports.app = functions.https.onRequest(app);

exports.addUserClaim = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("usuarios").doc(data.uid);
		const snapshot = await docRef.get();
		const snapshotData = snapshot.data();
		auth.setCustomUserClaims(data.uid, {
			admin: snapshotData.role === "admin" ? true : false
		});
		return "El usuario " + data.uid + " ah sido registrado como " + snapshotData.role;
	} catch (error) {
		throw error;
	}
});

exports.onCreateUser = functions.firestore.document("/usuarios/{id}").onCreate(async (snap, context) => {
	const data = snap.data();
	await auth.setCustomUserClaims(context.params.id, {
		admin: data.role === "admin" ? true : false
	});
	console.log("El usuario " + context.params.id + " ah sido registrado como " + data.role);
});

exports.onUpdateUser = functions.firestore.document("/usuarios/{id}").onUpdate(async (snap, context) => {
	const beforeSnap = snap.before.data();
	const afterSnap = snap.after.data();

	if (beforeSnap.role !== afterSnap.role) {
		await auth.setCustomUserClaims(context.params.id, {
			admin: afterSnap.role === "admin" ? true : false
		});
		console.log(`El usuario ${context.params.id} ah sido registrado como ${afterSnap.role}`);
	}
});

exports.onDeleteUser = functions.auth.user().onDelete(async (user, context) => {
	await firestore.collection("usuarios").doc(user.uid).delete();
});

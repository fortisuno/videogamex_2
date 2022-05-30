const functions = require("firebase-functions");
const { auth, firestore } = require("./firebase-server");

exports.productos = require("./src/productos");
exports.categorias = require("./src/categorias");
exports.ventas = require("./src/ventas");
exports.usuarios = require("./src/usuarios");

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

exports.setUserClaim = functions.firestore.document("/usuarios/{id}").onCreate((snap, context) => {
	const data = snap.data();
	auth.setCustomUserClaims(context.params.id, { admin: data.role === "admin" ? true : false });
	console.log("El usuario " + context.params.id + " ah sido registrado como " + data.role);
});

exports.updateUserClaim = functions.firestore
	.document("/usuarios/{id}")
	.onUpdate((snap, context) => {
		const beforeSnap = snap.before.data();
		const afterSnap = snap.after.data();
		if (beforeSnap.role !== afterSnap.role) {
			auth.setCustomUserClaims(context.params.id, {
				admin: afterSnap.role === "admin" ? true : false
			});
			console.log(
				"El usuario " + context.params.id + " ah sido actualizado a " + afterSnap.role
			);
		}
	});

exports.deleteUserData = functions.auth.user().onDelete((user, context) => {
	firestore.collection("usuarios").doc(user.uid).delete();
});

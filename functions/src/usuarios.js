const functions = require("firebase-functions");
const { firestore, auth } = require("../firebase-server");

exports.getUsuarios = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore
			.collection("usuarios")
			.orderBy("nombre")
			.orderBy("apellidoPaterno")
			.orderBy("apellidoMaterno");
		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => {
			const content = doc.data();
			return {
				id: doc.id,
				content: {
					titulo: content.titulo,
					nombreCompleto: `${content.nombre} ${content.apellidoPaterno} ${content.apellidoMaterno}`,
					role: content.role
				}
			};
		});
		return snapshotData;
	} catch (error) {
		throw error;
	}
});

exports.getUsuarioDetalle = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("usuarios").doc(data.id);
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

exports.addUsuario = functions.https.onCall(async (data, context) => {
	try {
		const userRecord = await auth.createUser({
			uid: data.id,
			password: data.password,
			email: data.content.email,
			phoneNumber: data.content.phoneNumber,
			displayName: data.content.displayName
		});
		const docRef = firestore.collection("usuarios").doc(userRecord.uid);
		return await docRef.set(data.content);
	} catch (error) {
		if (error.code.match(/^auth\//g)) {
			let message = "";
			let code = "";
			switch (error.code) {
				case "auth/email-already-exists":
					code = "already-exists";
					message = "El email proporcionado ya se encuentra registrado por otro usuario";
					break;
				case "auth/phone-number-already-exists":
					code = "already-exists";
					message = "El telefono proporcionado ya se encuentra registrado por otro usuario";
					break;
				case "auth/uid-already-exists":
					code = "already-exists";
					message = "El Id proporcionado ya se encuentra registrado por otro usuario";
					break;
				default:
					code = "unknown";
					message = "Hubo un error al momento de registrar el usuario";
			}
			throw new functions.https.HttpsError(code, message);
		} else {
			throw error;
		}
	}
});

exports.updateUsuario = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("usuarios").doc(data.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}

		if (!!data.content.email || !!data.content.phoneNumber || !!data.content.displayName) {
			await auth.updateUser(data.id, {
				email: data.content.email,
				phoneNumber: data.content.phoneNumber,
				displayName: data.content.displayName
			});
		}

		return await docRef.update(data.content);
	} catch (error) {
		if (error.code.match(/^auth\//g)) {
			let message = "";
			let code = "";
			switch (error.code) {
				case "auth/email-already-exists":
					code = "already-exists";
					message = "El email proporcionado ya se encuentra registrado por otro usuario";
					break;
				case "auth/phone-number-already-exists":
					code = "already-exists";
					message = "El telefono proporcionado ya se encuentra registrado por otro usuario";
					break;
				case "auth/uid-already-exists":
					code = "already-exists";
					message = "El Id proporcionado ya se encuentra registrado por otro usuario";
					break;
				default:
					code = "unknown";
					message = "Hubo un error al momento de registrar el usuario";
			}
			throw new functions.https.HttpsError(code, message);
		} else {
			throw error;
		}
	}
});

exports.deleteUsuario = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("usuarios").doc(data.id);
		const snapshot = await docRef.get();
		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}
		return await auth.deleteUser(data.id);
	} catch (error) {
		throw error;
	}
});

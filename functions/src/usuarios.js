const functions = require("firebase-functions");
const { firestore, auth } = require("../firebase-server");

exports.getUsuarios = functions.https.onCall(async (data, context) => {
	try {
		const docRef = firestore.collection("usuarios");
		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => {
			const content = doc.data();
			return {
				id: doc.id,
				displayName: content.displayName,
				role: content.role
			};
		});
		return snapshotData.filter((item) => item.id !== context.auth.uid);
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
		return { id: snapshot.id, ...snapshotData };
	} catch (error) {
		throw error;
	}
});

exports.addUsuario = functions.https.onCall(async (data, context) => {
	try {
		const { id, password, ...content } = data;

		const user = { uid: data.id, password: data.password, email: data.email };
		if (data.phoneNumber.length > 0) user.phoneNumber = data.phoneNumber;
		if (data.displayName.length > 0) user.displayName = data.displayName;

		const userRecord = await auth.createUser(user);
		const docRef = firestore.collection("usuarios").doc(userRecord.uid);
		await docRef.set(content);
		return `El usuario ${data.id} ah sido creado`;
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
		const { id, ...content } = data;
		const docRef = firestore.collection("usuarios").doc(data.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			throw new functions.https.HttpsError("not-found", "El Id proporcionado no existe");
		}

		const user = {};
		if (!!data.email) user.email = data.email;
		if (!!data.phoneNumber) user.phoneNumber = data.phoneNumber;
		if (!!data.displayName) user.displayName = data.displayName;
		if (Object.keys(user).length > 0) {
			await auth.updateUser(data.id, user);
		}

		await docRef.update(content);
		return `El usuario ${data.id} ah sido actualizado`;
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
		await auth.deleteUser(data.id);
		return `El usuario ${data.id} ha sido eliminado`;
	} catch (error) {
		throw error;
	}
});

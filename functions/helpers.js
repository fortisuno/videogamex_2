const functions = require("firebase-functions");
const { firestore } = require("./firebase-server");

exports.handleAutherror = (error, data, defaultMessage) => {
	const { id, email, phoneNumber } = data;
	const httpsError = {
		status: "",
		message: ""
	};
	switch (error.code) {
		case "auth/email-already-exists":
			httpsError.status = 400;
			httpsError.message = `El email ${email} ya se encuentra registrado por otro usuario`;
			break;
		case "auth/phone-number-already-exists":
			httpsError.status = 400;
			httpsError.message = `El número de teléfono ${phoneNumber} ya se encuentra registrado por otro usuario`;
			break;
		case "auth/uid-already-exists":
			httpsError.status = 400;
			httpsError.message = "Hubo un error al registrar el usuario, por favor intente nuevamente";
			break;
		case "auth/user-not-found":
			httpsError.status = 404;
			httpsError.message = `El usuario ${id} no existe`;
			break;
		default:
			httpsError.status = 500;
			httpsError.message = defaultMessage;
			break;
	}
	return httpsError;
};

exports.includeSearch = (docRef, search) => {
	const searchTerm = search.toLowerCase();
	const strlength = searchTerm.length;
	const strFrontCode = searchTerm.slice(0, strlength - 1);
	const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length);
	const endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
	return docRef.where("search", ">=", searchTerm).where("search", "<", endCode);
};

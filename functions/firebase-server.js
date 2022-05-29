const admin = require("firebase-admin");

admin.initializeApp({
	credential: admin.credential.cert("./serviceAccountKey.json")
});

exports.firestore = admin.firestore();
exports.auth = admin.auth();

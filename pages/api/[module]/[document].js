import { db } from "../../../utils/firebase";

const handlerDocument = async (req, res) => {
	const { collection, document } = req.query;
 
	try {
		if (req.method === 'PUT') {
			await db.collection(collection).doc(document).update(req.body);
		} else if (req.method === 'GET') {
			const doc = await db.collection(collection).doc(document).get();
			if (!doc.exists) {
				res.status(404).end();
			} else {
				res.status(200).json(doc.data());
			}
		} else if (req.method === 'DELETE') {
			await db.collection(collection).doc(document).delete();
		}
	  	res.status(200).end();
	} catch (e) {
	  res.status(400).end();
	}
}

export default handlerDocument
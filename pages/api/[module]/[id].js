import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

const handlerDocument = async (req, res) => {
	const { module, id } = req.query;
 
	try {
		if (req.method === 'PUT') {
			await updateDoc(doc(db, module, id), req.body)
		} else if (req.method === 'GET') {
			const data = await getDoc(doc(db, module, id))
			if (data.exists()) {
				res.status(200).json(data.data());
			} else {
				res.status(404).end();
			}
		} else if (req.method === 'DELETE') {
			await deleteDoc(doc(db, module, id))
		}
	  	res.status(200).end();
	} catch (e) {
	  res.status(400).end();
	}
}

export default handlerDocument
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { db } from "../../utils/firebase";

const handlerCollection = async (req, res) => {
	const { module } = req.query;
	
	try {
		const entities = await getDocs(collection(db, module));
		const entitiesData = entities.docs.map(doc => doc.data())

		if(req.method === 'GET') {
			res.status(200).json({ entities: entitiesData });
		} else if(req.method === 'POST') {

			const { slug } = req.body;
			
			if (entitiesData.some(data => data.slug === slug)) {
				res.status(400).end();
			} else {

				await setDoc(doc(db, module, slug), req.body);

			}

		}
		res.status(200).end();
	} catch (e) {
	  res.status(400).end();
	}
}

export default handlerCollection
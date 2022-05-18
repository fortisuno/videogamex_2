import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

const handlerCollection = async (req, res) => {
	const { module, titulo, categoria, usuario } = req.query;

	try {
		const entities = await getDocs(collection(db, module));
		const entitiesData = entities.docs.map((doc) => ({ ...doc.data() }));

		if (req.method === "GET") {
			if (module === "productos") {
				if (!!titulo || !!categoria) {
					let filterProductos = entitiesData;

					if (!!categoria) {
						filterProductos = entitiesData.filter((p) =>
							p.categoria.toLowerCase().includes(categoria)
						);
					}

					if (!!titulo) {
						filterProductos = filterProductos.filter((p) => {
							return p.titulo.toLowerCase().includes(titulo.toLowerCase());
						});
					}

					res.status(200).json(filterProductos);
				} else {
					res.status(200).json(entitiesData);
				}
			} else if (module === "categorias") {
				if (!!titulo) {
					const categoriaTitulo = titulo.toLowerCase();
					const filterTitulo = entitiesData.filter((c) =>
						c.titulo.toLowerCase().includes(categoriaTitulo)
					);
					res.status(200).json(filterTitulo);
				} else {
					res.status(200).json(entitiesData);
				}
			} else if (module === "usuarios") {
				if (!!usuario) {
					const userName = usuario.toLowerCase();
					const filterUsuario = entitiesData.filter((u) => {
						const alias = u.alias.toLowerCase();
						const nombre =
							`${u.nombre} ${u.apellidoPaterno} ${u.apellidoMaterno}`.toLowerCase();
						return alias.includes(userName) || nombre.includes(userName);
					});
					res.status(200).json(filterUsuario);
				} else {
					res.status(200).json(entitiesData);
				}
			} else {
				res.status(400).end();
			}
		} else if (req.method === "POST") {
			const { id } = req.body;
			if (entitiesData.some((data) => {
				return data.id === id
			})) {
				res.status(400).end();
			} else {
				await setDoc(doc(db, module, id), req.body);
			}
		}
		res.status(200).end();
	} catch (e) {
		res.status(400).end();
	}
};

export default handlerCollection;

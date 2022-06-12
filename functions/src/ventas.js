const { firestore } = require("../firebase-server");
const { includeSearch } = require("../helpers");
const moment = require("moment");
const { Router } = require("express");

const router = Router();

const COLLECTION = "ventas";
const PATH = "/api/" + COLLECTION;
const INTERNAL_ERROR_MESSAGE = ", por favor intente nuevamente o comuníquese con el administrador del sistema";

const getUsuario = async (id) => {
	const docRef = firestore.collection("usuarios").doc(id);
	const snapshot = await docRef.get();
	const { displayName } = snapshot.data();
	return displayName;
};

router.get(PATH, async ({ query }, res) => {
	try {
		let docRef = firestore.collection(COLLECTION);

		!!query.search && (docRef = includeSearch(docRef, query.search));

		const pageNumber = parseInt(query.page) || 0;
		const pageSize = parseInt(query.size) || 5;

		const snapshot = await docRef.get();
		const page = await docRef
			.limit(pageSize)
			.offset(pageNumber * pageSize)
			.get();

		const snapshotData = await Promise.all(
			page.docs.map(async (doc) => {
				const { usuarioId, total } = doc.data();
				const usuario = await getUsuario(usuarioId);

				return {
					id: doc.id,
					usuario,
					total
				};
			})
		);

		return res.status(200).json({
			page: pageNumber,
			size: pageSize,
			count: snapshot.size,
			content: snapshotData
		});
	} catch (error) {
		return res.status(500).json({
			message:
				"Hubo un error al obtener historial de ventas" + INTERNAL_ERROR_MESSAGE + " : " + JSON.stringify(error)
		});
	}
});

router.get(PATH + "/:id", async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();

		if (!snapshot.exists) {
			return res.status(404).json({ message: `La venta ${params.id} no existe` });
		}
		const { search, mes, anio, usuarioId, ...snapshotData } = snapshot.data();
		const usuario = await getUsuario(usuarioId);
		return res
			.status(200)
			.json({ id: snapshot.id, ...snapshotData, fecha: moment(snapshotData.fecha).toDate(), usuario });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al obtener la venta ${params.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.post(PATH + "/add", async ({ body }, res) => {
	try {
		const date = moment();
		const id = date.format("YYYYMMDDHHmmss");
		const docRef = firestore.collection(COLLECTION).doc(id);
		const snapshot = await docRef.get();

		if (snapshot.exists) {
			return res.status(400).json({ message: `La venta ${id} ya existe` });
		}

		const batch = firestore.batch();

		body.productos.forEach((producto) => {
			const productoRef = firestore.collection("productos").doc(producto.id);
			batch.update(productoRef, { stock: producto.stock - producto.cantidad });
		});

		const { productos, ...venta } = body;

		batch.set(docRef, {
			...venta,
			productos: productos.map(({ titulo, cantidad, precio }) => ({ titulo, cantidad, precio })),
			search: id,
			fecha: date.toDate(),
			anio: date.year(),
			mes: date.month()
		});

		await batch.commit();

		return res.status(200).json({ message: `La venta ${id} ha sido registrada` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al agregar la venta ${body.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.delete(PATH + "/delete/:id", async ({ params }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION).doc(params.id);
		const snapshot = await docRef.get();
		if (!snapshot.exists) {
			return res.status(404).json({ message: `La venta ${params.id} no existe` });
		}
		await docRef.delete();
		return res.status(200).json({ message: `La venta ${params.id} ha sido eliminada` });
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error al eliminar la venta ${params.id}` + INTERNAL_ERROR_MESSAGE
		});
	}
});

router.get(PATH + "-stats", async ({ query }, res) => {
	try {
		const docRef = firestore.collection(COLLECTION);
		const snapshot = await docRef.get();

		const snapshotData = snapshot.docs.map((doc) => doc.data());
		const ingresos = {};

		snapshotData.forEach((venta) => {
			ingresos[venta.anio] = (ingresos[venta.anio] || 0) + venta.total;
		});

		const data = Object.entries(ingresos).map(([anio, total]) => ({ anio, total }));
		const pageNumber = parseInt(query.page) || 0;
		const pageSize = parseInt(query.size) || 5;
		const pageCount = data.length;
		const pageContent = data.splice(pageNumber * pageSize, pageNumber * pageSize + pageSize);

		return res.status(200).json({
			page: pageNumber,
			size: pageSize,
			count: pageCount,
			content: pageContent
		});
	} catch (error) {
		return res.status(500).json({
			message: `Hubo un error obtener el resumen de ingresos` + INTERNAL_ERROR_MESSAGE
		});
	}
});

module.exports = router;

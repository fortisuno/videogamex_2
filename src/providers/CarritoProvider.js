import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const CarritoContext = createContext();

function CarritoProvider({ children }) {
	const [productos, setProductos] = useState([]);
	const [metodoPago, setMetodoPago] = useState("efectivo");
	const [total, setTotal] = useState(0);
	const [pago, setPago] = useState(0);
	const [cambio, setCambio] = useState(0);

	const updateTotal = useCallback((t) => setTotal(t), [setTotal]);
	const updateCambio = useCallback((c) => setCambio(c), [setCambio]);
	const resetPago = useCallback(() => setPago(0), [setPago]);

	useEffect(() => {
		let compra = 0;
		for (let producto of productos) {
			compra += producto.precio * producto.cantidad;
		}
		updateTotal(compra);
	}, [productos, updateTotal]);

	useEffect(() => {
		if (!(total > 0)) {
			resetPago();
		}
	}, [total, resetPago]);

	useEffect(() => {
		if (pago > total) {
			updateCambio(pago - total);
		} else {
			updateCambio(0);
		}
	}, [pago, total, updateCambio]);

	const addToCarrito = (data) => {
		const producto = productos.find((item) => item.id === data.id);

		if (!!producto) {
			setProductos(
				productos.map((item) => {
					if (item.id === producto.id) {
						item.cantidad++;
					}
					return item;
				})
			);
		} else {
			setProductos((carritoPrev) => [...carritoPrev, { ...data, cantidad: 1 }]);
		}
	};

	const updateItem = (value, id) => {
		setProductos((carritoPrev) =>
			carritoPrev.map((item) => {
				if (item.id === id) {
					item.cantidad = value;
				}
				return item;
			})
		);
	};

	const removeItem = (id) => {
		setProductos((carritoPrev) => carritoPrev.filter((item) => item.id !== id));
	};

	const ctx = {
		carrito: { productos, total, pago, cambio, metodoPago },
		setCarrito: setProductos,
		setTotal,
		setPago,
		setCambio,
		setMetodoPago,
		addToCarrito,
		updateItem,
		removeItem
	};

	return <CarritoContext.Provider value={ctx}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
	return useContext(CarritoContext);
}

export default CarritoProvider;

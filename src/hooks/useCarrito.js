import { useEffect } from "react";
import { useState } from "react";

export const useCarrito = (pago = "") => {
	const [productos, setProductos] = useState([]);
	const [total, setTotal] = useState(0);
	const [cambio, setCambio] = useState(0);

	useEffect(() => {
		let suma = 0;
		productos.forEach((producto) => {
			suma += producto.precio * producto.cantidad;
		});
		setTotal(suma);
	}, [productos]);

	useEffect(() => {
		const monto = pago.length > 0 ? parseFloat(pago) : 0;
		const cambio = monto - total;
		setCambio(cambio < 0 ? 0 : cambio);
	}, [pago, total]);

	const add = (data) => {
		const item = productos.find((producto) => producto.id === data.id);
		if (!!item) {
			item.cantidad += 1;
			setProductos(productos.map((producto) => (producto.id === item.id ? item : producto)));
		} else {
			setProductos([...productos, { ...data, cantidad: 1 }]);
		}
	};

	const remove = (id) => {
		setProductos(productos.filter((producto) => producto.id !== id));
	};

	const reset = () => {
		setProductos([]);
	};

	const handleProducto = (id, cantidad) => {
		const item = productos.find((producto) => producto.id === id);
		item.cantidad = cantidad;
		setProductos(productos.map((producto) => (producto.id === item.id ? item : producto)));
	};

	return { productos, total, cambio, add, remove, reset, handleProducto };
};

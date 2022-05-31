import { httpsCallable } from "firebase/functions";
import { functions } from "../utils/firebase-client";

export function useFunctions() {
	// Productos
	const getProductos = httpsCallable(functions, "productos-getProductos");
	const getProductoDetalle = httpsCallable(functions, "productos-getProductoDetalle");
	const addProducto = httpsCallable(functions, "productos-addProducto");
	const updateProducto = httpsCallable(functions, "productos-updateProducto");
	const deleteProducto = httpsCallable(functions, "productos-deleteProducto");

	// Categorías
	const getCategorias = httpsCallable(functions, "categorias-getCategorias");
	const getCategoriaDetalle = httpsCallable(functions, "categorias-getCategoriaDetalle");
	const addCategoria = httpsCallable(functions, "categorias-addCategoria");
	const updateCategoria = httpsCallable(functions, "categorias-updateCategoria");
	const deleteCategoria = httpsCallable(functions, "categorias-deleteCategoria");

	// Usuarios
	const getUsuarios = httpsCallable(functions, "usuarios-getUsuarios");
	const getUsuarioDetalle = httpsCallable(functions, "usuarios-getUsuarioDetalle");
	const addUsuario = httpsCallable(functions, "usuarios-addUsuario");
	const updateUsuario = httpsCallable(functions, "usuarios-updateUsuario");
	const deleteUsuario = httpsCallable(functions, "usuarios-deleteUsuario");

	// Ventas
	const getVentas = httpsCallable(functions, "ventas-getVentas");
	const getVentaDetalle = httpsCallable(functions, "ventas-getVentaDetalle");
	const addVenta = httpsCallable(functions, "ventas-addVenta");
	const deleteVenta = httpsCallable(functions, "ventas-deleteVenta");
	const getIngresos = httpsCallable(functions, "ventas-getResumen");

	return {
		getProductos,
		getProductoDetalle,
		addProducto,
		updateProducto,
		deleteProducto,
		getCategorias,
		getCategoriaDetalle,
		addCategoria,
		updateCategoria,
		deleteCategoria,
		getUsuarios,
		getUsuarioDetalle,
		addUsuario,
		updateUsuario,
		deleteUsuario,
		getVentas,
		getVentaDetalle,
		addVenta,
		deleteVenta,
		getIngresos
	};
}

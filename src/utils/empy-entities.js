export const emptyProducto = {
	id: "",
	titulo: "",
	categoria: { id: "", titulo: "" },
	desarrolladora: "",
	imagen: "",
	fechaLanzamiento: "",
	stock: "1",
	precio: ""
};

export const emptyCategoria = {
	id: "",
	titulo: ""
};

export const emptyUsuario = {
	id: "",
	nombre: "",
	apellidoPaterno: "",
	apellidoMaterno: "",
	displayName: "",
	email: "",
	phoneNumber: "",
	role: "vendedor"
};

export const emptyVenta = {
	id: "",
	usuario: "",
	productos: [],
	total: 0,
	pago: 0,
	cambio: 0,
	fecha: "",
	mes: "",
	anio: "",
	metodoPago: ""
};

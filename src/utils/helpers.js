import moment from "moment";
import validator from "validator";

export const getSlug = () => "slug";

const { isEmpty, isAlpha, isAlphanumeric, matches, isEmail, isURL, equals, isDate } = validator;

export const regexp = {
	currency: /[0-9]+|[0-9]+[.]|[0-9]+[.][0-9]{1,2}/g,
	phoneNumber: /[0-9]{0,10}/g
};

const MESSAGE = {
	email: {
		required: "El correo electrónico es requerido",
		invalid: "El correo electrónico no es válido"
	},
	password: {
		required: "La contraseña es requerida",
		minLength: "La contraseña debe tener al menos 8 caracteres",
		maxLength: "La contraseña no debe tener más de 64 caracteres",
		invalid: "Solo se permiten caracteres alfanuméricos sin espacios y los caracteres , . : - _ $ % & # ~",
		notMatch: "Las contraseñas no coinciden"
	},
	passwordConfirm: {
		required: "La confirmación de contraseña es requerida",
		notMatch: "Las contraseñas no coinciden"
	},
	search: {
		maxLength: "La búsqueda no debe tener más de 100 caracteres",
		invalid: "Solo se permiten caracteres alfanuméricos"
	},
	pago: {
		required: "El pago es requerido",
		invalid: "Solo se permiten caracteres númericos y un punto decimal"
	},
	titulo: {
		required: "El título es requerido",
		maxLength: "El título no debe tener más de 100 caracteres",
		invalid: "Solo se permiten caracteres alfanuméricos"
	},
	stock: {
		required: "El stock es requerido"
	},
	desarrolladora: {
		maxLength: "La desarrrolladora no debe tener más de 100 caracteres",
		invalid: "Solo se permiten caracteres alfanuméricos"
	},
	imagen: {
		invalid: "La imagen debe ser una URL válida"
	},
	precio: {
		required: "El precio es requerido"
	},
	categoriaId: {
		required: "La categoría es requerida"
	},
	nombre: {
		required: "El nombre es requerido",
		maxLength: "El nombre no debe tener más de 100 caracteres",
		invalid: "Solo se permiten caracteres alfabéticos"
	},
	apellidoPaterno: {
		required: "El apellido paterno es requerido",
		maxLength: "El apellido paterno no debe tener más de 100 caracteres",
		invalid: "Solo se permiten caracteres alfabéticos"
	},
	apellidoMaterno: {
		required: "El apellido materno es requerido",
		maxLength: "El apellido materno no debe tener más de 100 caracteres",
		invalid: "Solo se permiten caracteres alfabéticos"
	},
	phoneNumber: {
		invalid: "El número de teléfono debe tener 10 dígitos"
	},
	fechaLanzamiento: {
		required: "La fecha de lanzamiento es requerida",
		invalid: "Introduzca una fecha válida"
	}
};

export const validateSearch = (values) => {
	const errors = {};

	!isEmpty(values.search) &&
		!isAlphanumeric(values.search, "es-ES", { ignore: " " }) &&
		(errors.search = MESSAGE.search.invalid);

	return errors;
};

export const validateLogin = (values) => {
	const errors = {};

	isEmpty(values.email)
		? (errors.email = MESSAGE.email.required)
		: !isEmail(values.email) && (errors.email = MESSAGE.email.invalid);

	isEmpty(values.password)
		? (errors.password = MESSAGE.password.required)
		: !isAlphanumeric(values.password, "es-ES", { ignore: ",.:-_$%&#~" })
		? (errors.password = MESSAGE.password.invalid)
		: values.password.length < 8
		? (errors.password = MESSAGE.password.minLength)
		: values.password.length > 64 && (errors.password = MESSAGE.password.maxLength);

	return errors;
};

export const validateProducto = (values) => {
	const errors = {};

	isEmpty(values.titulo)
		? (errors.titulo = MESSAGE.titulo.required)
		: values.titulo.length > 100 && (errors.titulo = MESSAGE.titulo.maxLength)
		? (errors.titulo = MESSAGE.titulo.invalid)
		: !isAlphanumeric(values.titulo, "es-ES", { ignore: " " }) && (errors.titulo = MESSAGE.titulo.invalid);

	isEmpty(values.stock) && (errors.stock = MESSAGE.stock.required);

	isEmpty(values.precio) && (errors.precio = MESSAGE.precio.required);

	!isAlphanumeric(values.desarrolladora, "es-ES", { ignore: " " })
		? (errors.desarrolladora = MESSAGE.desarrolladora.invalid)
		: values.desarrolladora.length > 100 && (errors.desarrolladora = MESSAGE.desarrolladora.maxLength);

	!isEmpty(values.imagen) &&
		!isURL(values.imagen, { require_protocol: true }) &&
		(errors.imagen = MESSAGE.imagen.invalid);

	isEmpty(values.categoriaId) && (errors.categoriaId = MESSAGE.categoriaId.required);

	const fechaLanzamiento = moment(values.fechaLanzamiento).format("DD/MM/YYYY");
	isEmpty(fechaLanzamiento)
		? (errors.fechaLanzamiento = MESSAGE.fechaLanzamiento.required)
		: !isDate(fechaLanzamiento, { format: "DD/MM/YYYY", delimiters: ["/"] }) &&
		  (errors.fechaLanzamiento = MESSAGE.fechaLanzamiento.invalid);

	return errors;
};

export const validateCategoria = (values) => {
	const errors = {};

	isEmpty(values.titulo)
		? (errors.titulo = MESSAGE.titulo.required)
		: values.titulo.length > 100 && (errors.titulo = MESSAGE.titulo.maxLength)
		? (errors.titulo = MESSAGE.titulo.invalid)
		: !isAlpha(values.titulo, "es-ES", { ignore: " " }) &&
		  (errors.titulo = "Solo se permiten caracteres alfanuméricos");

	return errors;
};

export const validateUsuario = (values) => {
	const errors = {};

	isEmpty(values.nombre)
		? (errors.nombre = MESSAGE.nombre.required)
		: values.nombre.length > 100 && (errors.nombre = MESSAGE.nombre.maxLength)
		? (errors.nombre = MESSAGE.nombre.invalid)
		: !isAlpha(values.nombre, "es-ES", { ignore: " " }) && (errors.nombre = MESSAGE.nombre.invalid);

	isEmpty(values.apellidoPaterno)
		? (errors.apellidoPaterno = MESSAGE.apellidoPaterno.required)
		: values.apellidoPaterno.length > 100 && (errors.apellidoPaterno = MESSAGE.apellidoPaterno.maxLength)
		? (errors.apellidoPaterno = MESSAGE.apellidoPaterno.invalid)
		: !isAlpha(values.apellidoPaterno, "es-ES", { ignore: " " }) &&
		  (errors.apellidoPaterno = MESSAGE.apellidoPaterno.invalid);

	isEmpty(values.apellidoMaterno)
		? (errors.apellidoMaterno = MESSAGE.apellidoMaterno.required)
		: values.apellidoMaterno.length > 100 && (errors.apellidoMaterno = MESSAGE.apellidoMaterno.maxLength)
		? (errors.apellidoMaterno = MESSAGE.apellidoMaterno.invalid)
		: !isAlpha(values.apellidoMaterno, "es-ES", { ignore: " " }) &&
		  (errors.apellidoMaterno = MESSAGE.apellidoMaterno.invalid);

	!matches(values.phoneNumber, regexp.phoneNumber) && (errors.phoneNumber = MESSAGE.phoneNumber.invalid);

	isEmpty(values.email)
		? (errors.email = MESSAGE.email.required)
		: !isEmail(values.email) && (errors.email = MESSAGE.email.invalid);

	if (values.mode === "agregar") {
		isEmpty(values.password)
			? (errors.password = MESSAGE.password.required)
			: !isAlphanumeric(values.password, "es-ES", { ignore: ",.:-_$%&#~" })
			? (errors.password = MESSAGE.password.invalid)
			: values.password.length < 8
			? (errors.password = MESSAGE.password.minLength)
			: values.password.length > 64 && (errors.password = MESSAGE.password.maxLength);

		isEmpty(values.passwordConfirm)
			? (errors.passwordConfirm = MESSAGE.passwordConfirm.required)
			: !equals(values.password, values.passwordConfirm) &&
			  (errors.passwordConfirm = MESSAGE.passwordConfirm.notMatch);
	}

	return errors;
};

export const validateVenta = (values) => {
	const errors = {};

	isEmpty(values.pago)
		? (errors.pago = MESSAGE.pago.required)
		: !matches(values.pago, regexp.pago) && (errors.pago = MESSAGE.pago.invalid);

	return errors;
};

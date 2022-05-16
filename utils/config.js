import createCache from "@emotion/cache"
import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

export const createEmotionCache = () => createCache({ key: 'css', prepend: true });

export const theme = createTheme({
	palette: {
		primary: {
			main: '#2196f3',
		},
		secondary: {
			main: '#ffffff',
		},
		error: {
			main: "#f44336",
		},
	},
});

export const pages = [
	{
		slug: 'categorias',
		title: 'Categorías'
	},
	{
		slug: 'productos',
		title: 'Productos'
	},
	{
		slug: 'usuarios',
		title: 'Usuarios'
	},
	{
		slug: 'historial_de_ventas',
		title: 'Historial de ventas'
	},
	{
		slug: 'resumen_de_ingresos',
		title: 'Resumen de ingresos'
	},
]

export const titles = {
	productos: "Productos",
	categorias: "Categorias",
	usuarios: "Usuarios",
	historial_de_ventas: "Historial de ventas",
	resumen_de_ingresos: "Resumen de ingresos"
}

export const headers = {
	productos: ["id", "titulo", "categoria"],
	categorias: ["id", "titulo"],
	usuarios: ["id", "nombre", "apellidoPaterno", "apellidoMaterno"],
	historial_de_ventas: ["id", "fecha", "empleado", "total_venta"]
}

export const columns = {
	id: "Id",
	titulo: "Titulo",
	categoria: "Categoría",
	nombre: "Nombre",
	apellidoPaterno: "Apellido Paterno",
	apellidoMaterno: "Apellido materno",
	fecha: "Fecha",
	encargaro: "Empleado",
	total_venta: "Total de venta"
}

export const forms = {
	productos: { titulo: '', categoria: 'todas' },
	categorias: { titulo: '' },
	usuarios: { usuario: '' },
	historial_de_ventas: { usuario: '', fecha: '' },
}
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
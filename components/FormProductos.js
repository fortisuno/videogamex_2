import React, { useCallback, useContext } from "react";
import {
	Button,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Box,
	Stack,
	FormHelperText
} from "@mui/material";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFormik } from "formik";
import { DialogContext } from "./PageDialog";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { getSlug } from "../utils/functions";
import axios from "axios";
import { useRouter } from 'next/router'
import SelectCategoria from "./SelectCategoria";
import DetalleProductos from "./DetalleProductos";

const FormProductos = ({opciones}) => {
	const dialog = useContext(DialogContext);
	const router = useRouter()
	const { values, errors, touched, setFieldValue, setFieldError, handleChange, handleSubmit } = useFormik({
		initialValues: dialog.data,
		validate: () => {
			const errors = {};

			Object.keys(values).forEach((key) => {
				if (values[key].length == 0) {
					errors[key] = "Campo obligatorio";
				}
			});

			return errors;
		},
		onSubmit: () => {
			if(dialog.title.toLowerCase().includes('agregar')){
				axios.post('/api/productos', values)
					.then((res) => {
						router.reload()
						console.log(res)
					})
					.catch((err) => {
						console.log(err.config.data)
						setFieldError('titulo', 'Este producto ya existe en la base de datos')
					})
			} else {
				axios.put(`/api/productos/${values.id}`, values)
					.then(() => {
						dialog.changeDialogView({
							title: 'Editar producto',
							data: values,
							edition: false,
							edited: true,
							component: <DetalleProductos opciones={opciones}/>
						})
					})
					.catch((err) => {
						setFieldError('titulo', 'Hubo un error al editar este titulo')
					})
			}
		}
	});

	const handleTitle = ({target}) => {
		setFieldValue('titulo', target.value);
		setFieldValue('id', getSlug(target.value));
	}

	const handleCategorias = useCallback((c) => setFieldValue('categoria', c), [setFieldValue])

	const { titulo, desarrolladora, categoria, imagen, stock, precio, fechaLanzamiento } = values;

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Grid container component={"form"} spacing={3} sx={{pt: 2}} onSubmit={handleSubmit}>
				<Grid item xs={12}>
					<TextField
						fullWidth
						name="titulo"
						label="Titulo"
						value={titulo}
						helperText={touched.titulo && errors.titulo}
						error={touched.titulo && Boolean(errors.titulo)}
						variant="outlined"
						onChange={handleTitle}
					/>
				</Grid>
				<Grid item xs={7}>
					<TextField
						fullWidth
						name="desarrolladora"
						label="Desarrolladora"
						value={desarrolladora}
						error={touched.desarrolladora && Boolean(errors.desarrolladora)}
						variant="outlined"
						helperText={touched.desarrolladora && errors.desarrolladora}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={5}>
					<FormControl fullWidth>
						<InputLabel id="categoria">Categoría</InputLabel>
						<Select
							labelId="categoria"
							name="categoria"
							value={categoria}
							error={touched.categoria && Boolean(errors.categoria)}
							label="Categoría"
							onChange={ handleChange }
						>
							{ opciones.map((categoria) => <MenuItem value={categoria.id} key={categoria.id}>{categoria.titulo}</MenuItem>) }
						</Select>
						<FormHelperText>{touched.categoria && errors.categoria}</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						name="imagen"
						onChange={handleChange}
						error={touched.imagen && Boolean(errors.imagen)}
						value={imagen}
						helperText={touched.imagen && errors.imagen}
						label="Imagen"
						placeholder="https://ejemplo.com/imagen.jpg"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs>
					<TextField
						fullWidth
						name="stock"
						onChange={handleChange}
						error={touched.stock && Boolean(errors.stock)}
						label="Stock"
						value={stock}
						type={"number"}
						helperText={touched.stock && errors.stock}
						InputProps={{ inputProps: { min: 1 } }}
						placeholder="1"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs>
					<TextField
						fullWidth
						name="precio"
						onChange={handleChange}
						label="Precio"
						value={precio}
						error={touched.precio && Boolean(errors.precio)}
						type={"number"}
						helperText={touched.precio && errors.precio}
						placeholder="0.00"
						InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
							inputProps: { min: 0, step: 0.01 }
						}}
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={6}>
					<DatePicker
						label="Fecha de lanzamiento"
						value={fechaLanzamiento}
						name={"fechaLanzamiento"}
						onChange={((date) => setFieldValue('fechaLanzamiento', date))}
						renderInput={(params) => <TextField {...params} helperText={touched.fechaLanzamiento && errors.fechaLanzamiento}/>}
					/>
				</Grid>
				<Grid item xs={12}>
					<Stack direction={"row"} justifyContent="end" spacing={3}>
						<Button
							variant="outlined"
							color="error"
							startIcon={<CloseIcon />}
							onClick={dialog.closeDialog}
							>
							Cancelar
						</Button>
						<Button variant="contained" startIcon={<SaveIcon />} type="submit">
							Guardar
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</LocalizationProvider>
	);
};

export default FormProductos;

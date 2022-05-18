import { Close, Save } from "@mui/icons-material";
import {
	Alert,
	Button, FormControl,
	FormHelperText,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import React, { useState } from "react";
import { getSlug } from "@utils/functions";
import axios from "axios";
import { useRouter } from "next/router";
import { usePageData } from "@hooks/usePageData";
import { useDialog } from "@hooks/useDialog";
import ProductoDetalle from "./ProductoDetalle";

const ProductoFormulario = ({ nuevoItem = false }) => {
	const pageData = usePageData()
	const dialog = useDialog()
	
	const { values, errors, touched, isSubmitting, status, setStatus, setSubmitting, setFieldValue, handleChange, handleSubmit } = useFormik({
		initialValues: pageData.selectedItem,
		validate: () => {
			const errors = {};

			Object.keys(values).forEach((key) => {
				if (values[key].length == 0) {
					if(key !== "imagen") {
						errors[key] = "Campo obligatorio";
					}
				}
			});

			return errors;
		},
		onSubmit: () => {
			if(!nuevoItem) {
				axios.put(`/api/productos/${values.id}`, values)
					.then(() => {
						setStatus(200)
						setTimeout(() => {
							pageData.handleSelectedItem(values)
							dialog.handleOpenDialog({
								titulo: 'Ver producto',
								content: <ProductoDetalle/>,
								updated: true
							})
						}, 500)
					})
					.catch((error) => {
						setStatus(400)
						setTimeout(() => setSubmitting(false), 500)
					})
			} else {
				axios.post('/api/productos', values)
					.then(() => {
						setStatus(200)
						setTimeout(() => {
							pageData.reloadPage()
							dialog.handleCloseDialog()
						}, 500)
					})
					.catch((error) => {
						setStatus(400)
						setTimeout(() => setSubmitting(false), 500)
					})

			}
		}
	});

	const { titulo, desarrolladora, categoria, imagen, stock, precio, fechaLanzamiento } = values;
	const {extras: {categorias}} = pageData

	const handleCancel = () => {
		dialog.handleOpenDialog({
			titulo: 'Ver producto',
			content: <ProductoDetalle/>,
			updated: true
		})
	}

	const handleTitle = ({target}) => {
		setFieldValue('titulo', target.value);
		setFieldValue('id', getSlug(target.value));
	}


	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Grid container component={"form"} spacing={3} sx={{ pt: 2 }} onSubmit={handleSubmit}>
				<Grid item xs={12}>
					<TextField
						disabled={ !nuevoItem }
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
							onChange={handleChange}
						>
							{categorias.map((categoria) => (
								<MenuItem value={categoria.id} key={categoria.id}>
									{categoria.titulo}
								</MenuItem>
							))}
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
				<Grid item xs={3}>
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
				<Grid item xs={3}>
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
						onChange={(date) => setFieldValue("fechaLanzamiento", date)}
						renderInput={(params) => (
							<TextField
								{...params}
								fullWidth
								helperText={touched.fechaLanzamiento && errors.fechaLanzamiento}
							/>
						)}
					/>
				</Grid>
				<Grid item xs={12}>
					{status == 200 && <Alert severity="success">Producto {nuevoItem ? "agregado" : "actualizado"} exitosamente...</Alert>}
					{status == 400 && <Alert severity="error">Hubo un error al {nuevoItem ? "agregar" : "actualizar"} el producto...</Alert>}
				</Grid>
				<Grid item xs={12}>
					<Stack direction={"row"} justifyContent="end" spacing={3}>
						<Button
							disabled={isSubmitting}
							variant="outlined"
							color="error"
							startIcon={<Close />}
							onClick={!nuevoItem ? handleCancel : dialog.handleCloseDialog}
						>
							Cancelar
						</Button>
						<Button disabled={isSubmitting} variant="contained" startIcon={<Save />} type="submit">
							Guardar
						</Button>
					</Stack>
				</Grid>
			</Grid>
		</LocalizationProvider>
	);
};

export default ProductoFormulario;

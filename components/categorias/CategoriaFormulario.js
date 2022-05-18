import { useDialog } from "@hooks/useDialog";
import { usePageData } from "@hooks/usePageData";
import { Close, Save } from "@mui/icons-material";
import {
	Alert,
	Button, Grid, Stack,
	TextField
} from "@mui/material";
import { getSlug } from "@utils/functions";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";

const CategoriaFormulario = () => {

	const pageData = usePageData()
	const dialog = useDialog()
	
	const { values, errors, touched, isSubmitting, status, setStatus, setFieldValue, handleSubmit, setSubmitting } = useFormik({
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
			axios.post('/api/categorias', values)
				.then(() => {
					setStatus(200)

					setTimeout(() => {
						dialog.handleCloseDialog()
						pageData.reloadPage()
					}, 500)
				})
				.catch((error) => {
					setStatus(400)
					setTimeout(() => setSubmitting(false), 500)
				})
		}
	});

	const { titulo } = values;

	const handleTitle = ({target}) => {
		setFieldValue('titulo', target.value);
		setFieldValue('id', getSlug(target.value));
	}

	return (
		<Grid container component={"form"} spacing={3} sx={{ pt: 2 }} onSubmit={handleSubmit}>
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
			<Grid item xs={12}>
					{status == 200 && <Alert severity="success">Categoría agregada exitosamente...</Alert>}
					{status == 400 && <Alert severity="error">Hubo un error al registrar la categoría...</Alert>}
				</Grid>
			<Grid item xs={12}>
				<Stack direction={"row"} justifyContent="end" spacing={3}>
					<Button
						disabled={isSubmitting}
						variant="outlined"
						color="error"
						startIcon={<Close />}
						onClick={dialog.handleCloseDialog}
					>
						Cancelar
					</Button>
					<Button disabled={isSubmitting} variant="contained" startIcon={<Save />} type="submit">
						Guardar
					</Button>
				</Stack>
			</Grid>
		</Grid>
	)
}

export default CategoriaFormulario
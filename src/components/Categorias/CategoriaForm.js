import { Close, Save } from "@mui/icons-material";
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	InputAdornment,
	MenuItem,
	TextField
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import LoadAnimation from "../LoadAnimation";
import validator from "validator";
import moment from "moment";
import { isEmpty } from "@firebase/util";

const emptyForm = {
	id: "",
    titulo: "",
};

function CategoriaForm() {
	const { dialog, closeDialog, openDialog, loadData, stopLoading } = useMultiDialog();
	const { id, content } = dialog.data;
	const { matches } = validator;

	const { values, initialValues, touched, errors, handleChange, handleSubmit, setFieldValue } =
		useFormik({
			initialValues: dialog.mode === "agregar" ? emptyForm : content,
			validate: (values) => {
				const errors = {};

				Object.keys(values).forEach((field) => {
					const value =
						typeof values[field] === "string" ? values[field] : String(values[field]);

					if (
						isEmpty(value) &&
						(field === "titulo" || field === "stock" || field === "precio")
					) {
						errors[field] = "Campo requerido";
					}
				});

				return errors;
			},
			onSubmit: async (values) => {
				try {
					if (dialog.mode === "agregar") {
						await addCategoria(values);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});

	const [categorias, setCategorias] = useState([values.categoria]);
	const { getCategorias, updateCategoria, addCategoria } = useFunctions();

	const handleCancel = () => {
		openDialog("detalle");
		stopLoading();
	};

	const loadCategorias = useCallback(async () => {
		const result = await getCategorias({});
		setCategorias(result.data.map((doc) => ({ id: doc.id, titulo: doc.content.titulo })));
	}, [setCategorias]);

	useEffect(() => {
		loadCategorias();
	}, [loadCategorias]);

	return (
		<Box width="100%" position="relative" component="form" onSubmit={handleSubmit}>
			{dialog.loading && <LoadAnimation />}
			<DialogTitle>
				{dialog.mode === "agregar" ? "Agregar Categoria" : "Editar Categoria"}
			</DialogTitle>
			<DialogContent>
				<Grid container sx={{ py: 3 }} spacing={3}>
					<Grid item xs>
						<TextField
							label="Titulo"
							name="titulo"
							value={values.titulo}
							error={touched.titulo && !!errors.titulo}
							helperText={touched.titulo && errors.titulo}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					startIcon={<Close />}
					color="error"
					onClick={dialog.mode === "agregar" ? closeDialog : handleCancel}
				>
					Cancelar
				</Button>
				<Button startIcon={<Save />} type="submit">
					Guardar
				</Button>
			</DialogActions>
		</Box>
	);
}

export default CategoriaForm;

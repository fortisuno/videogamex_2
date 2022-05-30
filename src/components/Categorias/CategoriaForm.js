import { Close, Save } from "@mui/icons-material";
import {
	Alert,
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
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import LoadAnimation from "../LoadAnimation";
import validator from "validator";
import { LoadingButton } from "@mui/lab";
import { getSlug } from "../../utils/helpers";
import { useDataContext } from "../../providers/DataProvider";

function CategoriaForm() {
	const [feedback, setFeedback] = useState({});
	const { dialog, closeDialog, openDialog, stopLoading } = useMultiDialog();
	const { loadData } = useDataContext();
	const { getCategorias } = useFunctions();
	const { data, loading, mode } = dialog;
	const { id, ...content } = data;
	const { isEmpty } = validator;

	const { values, touched, errors, dirty, isSubmitting, handleChange, handleSubmit } = useFormik({
		initialValues: content,
		validate: (values) => {
			const errors = {};

			if (isEmpty(values.titulo)) {
				errors.titulo = "Campo requerido";
			}

			return errors;
		},
		onSubmit: async (values) => {
			try {
				if (dialog.mode === "agregar") {
					const id = getSlug(values.titulo);
					const result = await addCategoria({ ...values, id });
					setFeedback({ success: result.data });
				} else if (dialog.mode === "editar") {
					const newId = getSlug(values.titulo);
					const result = await updateCategoria({ ...values, id: data.id, newId });
					setFeedback({ success: result.data });
				}
				setTimeout(async () => {
					try {
						closeDialog();
						await loadData(getCategorias);
					} catch (error) {
						console.log(error);
					}
				}, 1000);
			} catch (error) {
				setFeedback({ error: error.message });
			}
		}
	});

	const { updateCategoria, addCategoria } = useFunctions();

	const handleCancel = () => {
		openDialog("detalle", data);
		stopLoading();
	};

	return (
		<Box width="100%" position="relative" component="form" onSubmit={handleSubmit}>
			{loading && <LoadAnimation />}
			<DialogTitle>
				{dialog.mode === "agregar" ? "Agregar Categoria" : "Editar Categoria"}
			</DialogTitle>
			<DialogContent>
				<Grid container sx={{ py: 3 }} spacing={3}>
					<Grid item xs={12}>
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
					<Grid item xs={12}>
						{!!feedback.success && <Alert severity="success">{feedback.success}</Alert>}
						{!!feedback.warning && <Alert severity="warning">{feedback.warning}</Alert>}
						{!!feedback.error && <Alert severity="error">{feedback.error}</Alert>}
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button
					startIcon={<Close />}
					color="error"
					disabled={isSubmitting || !!feedback.success}
					onClick={mode === "agregar" ? closeDialog : handleCancel}
				>
					Cancelar
				</Button>
				<LoadingButton
					startIcon={<Save />}
					loading={isSubmitting || !!feedback.success}
					loadingPosition="start"
					disabled={!dirty}
					type="submit"
				>
					Guardar
				</LoadingButton>
			</DialogActions>
		</Box>
	);
}

export default CategoriaForm;

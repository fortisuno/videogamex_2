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
import { DatePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import LoadAnimation from "../LoadAnimation";
import validator from "validator";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { getSlug } from "../../utils/helpers";
import { useDataContext } from "../../providers/DataProvider";

function ProductoForm() {
	const [feedback, setFeedback] = useState({});
	const { dialog, closeDialog, openDialog, stopLoading } = useMultiDialog();
	const { loadData } = useDataContext();
	const { getProductos } = useFunctions();
	const { data, loading, mode } = dialog;
	const { id, ...content } = data;
	const { isEmpty } = validator;

	const {
		values,
		touched,
		errors,
		dirty,
		isSubmitting,
		handleChange,
		handleSubmit,
		setFieldValue
	} = useFormik({
		initialValues: content,
		validate: (values) => {
			const errors = {};

			Object.keys(values).forEach((field) => {
				const value = typeof values[field] === "string" ? values[field] : String(values[field]);

				if (isEmpty(value) && (field === "titulo" || field === "stock" || field === "precio")) {
					errors[field] = "Campo requerido";
				}
			});

			if (!values.fechaLanzamiento) {
				errors.fechaLanzamiento = "Campo requerido";
			} else if (!moment(values.fechaLanzamiento).isValid()) {
				errors.fechaLanzamiento = "Fecha no valida";
			}
			return errors;
		},
		onSubmit: async (values) => {
			try {
				if (dialog.mode === "agregar") {
					const id = getSlug(values.titulo);
					const result = await addProducto({
						...values,
						id,
						stock: parseInt(values.stock),
						precio: parseFloat(values.precio)
					});
					setFeedback({ success: result.data });
					setTimeout(async () => {
						try {
							closeDialog();
							await loadData(getProductos);
						} catch (error) {
							console.log(error);
						}
					}, 1000);
				} else if (dialog.mode === "editar") {
					const changes = {};
					Object.keys(values).forEach((field) => {
						if (values[field] !== dialog.data[field]) {
							changes[field] = values[field];
						}
					});

					if (!!changes.titulo) {
						changes.newId = getSlug(changes.titulo);
					}

					if (Object.keys(changes).length > 0) {
						await updateProducto({ ...changes, id: data.id });
						setFeedback({ success: "Producto actualizado correctamente" });
						setTimeout(async () => {
							try {
								closeDialog();
								await loadData(getProductos);
							} catch (error) {
								console.log(error);
							}
						}, 1000);
					} else {
						setFeedback({ warning: "No se encontraron cambios" });
					}
				}
			} catch (error) {
				setFeedback({ error: error.message || "Error al guardar" });
			}
		}
	});

	const [categorias, setCategorias] = useState([data.categoria]);
	const { getCategorias, updateProducto, addProducto } = useFunctions();

	const handleCancel = () => {
		openDialog("detalle", data);
		stopLoading();
	};

	const handleCategoria = ({ target }) => {
		setFieldValue(
			"categoria",
			categorias.find((categoria) => categoria.id === target.value)
		);
	};

	const loadCategorias = useCallback(async () => {
		const result = await getCategorias({});
		setCategorias(result.data);
	}, [setCategorias]);

	useEffect(() => {
		loadCategorias();
	}, [loadCategorias]);

	return (
		<Box width="100%" position="relative" component="form" onSubmit={handleSubmit}>
			{loading && <LoadAnimation />}
			<DialogTitle>{mode === "agregar" ? "Agregar Producto" : "Editar Producto"}</DialogTitle>
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
					<Grid item xs={4}>
						<TextField
							label="Categoría"
							name="categoria"
							select
							value={values.categoria.id}
							error={touched.categoria && !!errors.categoria}
							helperText={touched.categoria && errors.categoria}
							onChange={handleCategoria}
							fullWidth
						>
							{categorias.map((categoria) => (
								<MenuItem value={categoria.id} key={categoria.id}>
									{categoria.titulo}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Desarrolladora"
							name="desarrolladora"
							value={values.desarrolladora}
							error={touched.desarrolladora && !!errors.desarrolladora}
							helperText={touched.desarrolladora && errors.desarrolladora}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Imagen"
							name="imagen"
							value={values.imagen}
							error={touched.imagen && !!errors.imagen}
							helperText={touched.imagen && errors.imagen}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label="Stock"
							name="stock"
							value={values.stock}
							error={touched.stock && !!errors.stock}
							helperText={touched.stock && errors.stock}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label="Precio"
							name="precio"
							value={values.precio}
							error={touched.precio && !!errors.precio}
							helperText={touched.precio && errors.precio}
							onChange={handleChange}
							placeholder="0.00"
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>,
								inputProps: { sx: { textAlign: "end" } }
							}}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<DatePicker
							label="Fecha de lanzamiento"
							value={values.fechaLanzamiento}
							name={"fechaLanzamiento"}
							onChange={(date) => setFieldValue("fechaLanzamiento", moment(date).toDate())}
							renderInput={(params) => (
								<TextField
									{...params}
									InputLabelProps={{ shrink: true }}
									fullWidth
									error={touched.fechaLanzamiento && !!errors.fechaLanzamiento}
									helperText={touched.fechaLanzamiento && errors.fechaLanzamiento}
								/>
							)}
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

export default ProductoForm;

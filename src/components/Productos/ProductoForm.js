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
	titulo: "",
	categoría: { id: "", titulo: "" },
	desarrolladora: "",
	imagen: "",
	fechaLanzamiento: "",
	stock: 1,
	precio: 1
};

function ProductoForm() {
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

				if (!values.fechaLanzamiento) {
					errors.fechaLanzamiento = "Campo obligatorio";
				} else if (!values.fechaLanzamiento.isValid()) {
					errors.fechaLanzamiento = "Fecha no valida";
				}
				return errors;
			},
			onSubmit: async (values) => {
				try {
					if (dialog.mode === "agregar") {
						await addProducto(values);
					}
				} catch (error) {
					console.log(error);
				}
			}
		});

	const [categorias, setCategorias] = useState([values.categoria]);
	const { getCategorias, updateProducto, addProducto } = useFunctions();

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
				{dialog.mode === "agregar" ? "Agregar Producto" : "Editar Producto"}
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
					<Grid item xs={4}>
						<TextField
							label="Categoría"
							name="categoria"
							select
							value={values.categoria.id}
							error={touched.categoria && !!errors.categoria}
							helperText={touched.categoria && errors.categoria}
							onChange={handleChange}
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
							onChange={(date) => setFieldValue("fechaLanzamiento", date)}
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

export default ProductoForm;

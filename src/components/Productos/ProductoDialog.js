import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useConfirm } from "material-ui-confirm";
import moment from "moment";
import { useData } from "../../hooks/useData";
import { validateProducto } from "../../utils/helpers";
import ProductoDetalle from "./ProductoDetalle";
import ProductoForm from "./ProductoForm";

const emptyProducto = {
	titulo: "",
	stock: "1",
	precio: "",
	desarrolladora: "",
	categoriaId: "",
	imagen: ""
};

function ProductoDialog({ id, view, onChange, onSave, dialogProps }) {
	const emptyData = { ...emptyProducto, fechaLanzamiento: moment().toDate() };
	const confirm = useConfirm();
	const dialog = useData({
		id,
		path: "/productos",
		emptyData
	});
	const { onClose } = dialogProps;

	const formik = useFormik({
		initialValues: {
			...dialog.data,
			stock: typeof dialog.data.stock !== "string" ? dialog.data.stock.toString() : dialog.data.stock,
			precio: typeof dialog.data.precio !== "string" ? dialog.data.precio.toFixed(2) : dialog.data.precio
		},
		enableReinitialize: true,
		validate: (values) => validateProducto(values),
		onSubmit: (values) => {
			confirm({ description: "¿Está seguro de que desea guardar los cambios?" })
				.then(() => {
					if (view === "agregar") {
						const producto = { ...values, precio: parseFloat(values.precio), stock: parseInt(values.stock) };
						axios
							.post(process.env.REACT_APP_API_URL + "/productos/add", producto)
							.then((response) => {
								onClose();
								onSave(response.data.message, true);
							})
							.catch(({ response }) => {
								onClose();
								onSave(response.data.message, false);
							})
							.finally(() => {
								formik.setSubmitting(false);
							});
					} else {
						const valuesChanged = {};
						for (const key in values) {
							if (values[key] !== dialog.data[key]) {
								valuesChanged[key] = values[key];
							}
						}
						valuesChanged.id = dialog.data.id;
						!!valuesChanged.precio && (valuesChanged.precio = parseFloat(valuesChanged.precio));
						!!valuesChanged.stock && (valuesChanged.stock = parseInt(valuesChanged.stock));
						axios
							.put(process.env.REACT_APP_API_URL + "/productos/update", valuesChanged)
							.then((response) => {
								handleClose();
								onSave(response.data.message, true);
							})
							.catch(({ response }) => {
								handleClose();
								onSave(response.data.message, false);
							})
							.finally(() => {
								formik.setSubmitting(false);
							});
					}
				})
				.catch(() => {
					formik.setSubmitting(false);
				});
		}
	});

	const handleClose = () => {
		formik.resetForm();
		onClose();
	};

	const handleChange = () => {
		formik.resetForm();
		onChange("detalle");
	};

	const capitalize = (s) => s.replace(/^\w/, (c) => c.toUpperCase());

	return (
		<Dialog
			maxWidth="md"
			sx={{ [`& .MuiDialog-paper`]: { borderRadius: 3 } }}
			fullWidth
			{...dialogProps} // onClose, open, ...
		>
			<DialogTitle>{capitalize(view)} producto</DialogTitle>
			<DialogContent>
				{view === "detalle" ? (
					<ProductoDetalle data={dialog.data} loading={dialog.loading} />
				) : (
					<ProductoForm
						values={formik.values}
						errors={formik.errors}
						touched={formik.touched}
						handleSubmit={formik.handleSubmit}
						handleChange={formik.handleChange}
						setFieldValue={formik.setFieldValue}
						loading={dialog.loading}
					/>
				)}
			</DialogContent>
			{view === "detalle" ? (
				<DialogActions>
					<Button onClick={onClose}>Cerrar</Button>
					<Button onClick={() => onChange("editar")}>Editar</Button>
				</DialogActions>
			) : (
				<DialogActions>
					<Button onClick={view === "agregar" ? handleClose : handleChange}>Cancelar</Button>
					<LoadingButton loading={formik.isSubmitting} disabled={!formik.dirty} onClick={formik.handleSubmit}>
						Guardar
					</LoadingButton>
				</DialogActions>
			)}
		</Dialog>
	);
}

export default ProductoDialog;

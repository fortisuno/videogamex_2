import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useData } from "../../hooks/useData";
import CategoriaDetalle from "./CategoriaDetalle";
import CategoriaForm from "./CategoriaForm";
import { useFormik } from "formik";
import { validateCategoria } from "../../utils/helpers";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import LoadingButton from "@mui/lab/LoadingButton";

const emptyCategoria = {
	titulo: ""
};

function CategoriaDialog({ id, view, onChange, onSave, dialogProps }) {
	const confirm = useConfirm();
	const dialog = useData({
		id,
		path: "/categorias",
		emptyData: emptyCategoria
	});
	const { onClose } = dialogProps;

	const formik = useFormik({
		initialValues: dialog.data,
		enableReinitialize: true,
		validate: (values) => validateCategoria(values),
		onSubmit: (values) => {
			confirm({ description: "¿Está seguro de que desea guardar los cambios?" })
				.then(() => {
					if (view === "agregar") {
						axios
							.post(process.env.REACT_APP_API_URL + "/categorias/add", values)
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
					} else {
						const valuesChanged = {};
						for (const key in values) {
							if (values[key] !== dialog.data[key]) {
								valuesChanged[key] = values[key];
							}
						}
						valuesChanged.id = dialog.data.id;
						axios
							.put(process.env.REACT_APP_API_URL + "/categorias/update", valuesChanged)
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
			<DialogTitle>{capitalize(view)} categoria</DialogTitle>
			<DialogContent>
				{view === "detalle" ? (
					<CategoriaDetalle data={dialog.data} loading={dialog.loading} />
				) : (
					<CategoriaForm
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

export default CategoriaDialog;

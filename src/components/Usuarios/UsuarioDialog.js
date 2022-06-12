import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useData } from "../../hooks/useData";
import { validateUsuario } from "../../utils/helpers";
import UsuarioDetalle from "./UsuarioDetalle";
import UsuarioForm from "./UsuarioForm";
import { LoadingButton } from "@mui/lab";
import { useFormik } from "formik";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import { useAuth } from "../../providers/AuthProvider";
import Usuarios from "../../views/Dashboard/Usuarios";

const emptyUsuario = {
	email: "",
	nombre: "",
	apellidoPaterno: "",
	apellidoMaterno: "",
	phoneNumber: "",
	role: "vendedor"
};

function UsuarioDialog({ id, view, onChange, onSave, dialogProps }) {
	const emptyData = { ...emptyUsuario };
	const { usuario } = useAuth();
	const confirm = useConfirm();
	const dialog = useData({
		id,
		path: "/usuarios",
		emptyData
	});
	const { onClose } = dialogProps;

	const { id: usuarioId, displayName, ...formData } = dialog.data;

	const formik = useFormik({
		initialValues: {
			...formData,
			password: "",
			passwordConfirm: "",
			mode: view
		},
		enableReinitialize: true,
		validate: (values) => validateUsuario(values),
		onSubmit: (values) => {
			confirm({ description: "¿Está seguro de que desea guardar los cambios?" })
				.then(() => {
					if (view === "agregar") {
						const { passwordConfirm, mode, ...newUsuario } = values;
						axios
							.post(process.env.REACT_APP_API_URL + "/usuarios/add", newUsuario)
							.then((response) => {
								onSave(response.data.message, true);
								handleClose();
							})
							.catch(({ response }) => {
								onSave(response.data.message, false);
								handleClose();
							})
							.finally(() => {
								formik.setSubmitting(false);
							});
					} else {
						const { password, passwordConfirm, mode, ...newUsuario } = values;
						const valuesChanged = {};

						for (const key in newUsuario) {
							if (newUsuario[key] !== dialog.data[key]) {
								valuesChanged[key] = newUsuario[key];
							}
						}

						valuesChanged.id = dialog.data.id;

						axios
							.put(process.env.REACT_APP_API_URL + "/usuarios/update", valuesChanged)
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

	const adminClaims = (usuario.isAdmin && !!dialog.data.id && dialog.data.id !== usuario.data.id) || !dialog.data.id;

	const capitalize = (s) => s.replace(/^\w/, (c) => c.toUpperCase());

	return (
		<Dialog
			maxWidth="sm"
			sx={{ [`& .MuiDialog-paper`]: { borderRadius: 3 } }}
			TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
			fullWidth
			{...dialogProps} // onClose, open, ...
		>
			<DialogTitle>{capitalize(view)} usuario</DialogTitle>
			<DialogContent>
				{view === "detalle" ? (
					<UsuarioDetalle data={dialog.data} loading={dialog.loading} />
				) : (
					<UsuarioForm
						values={formik.values}
						errors={formik.errors}
						touched={formik.touched}
						handleSubmit={formik.handleSubmit}
						handleChange={formik.handleChange}
						setFieldValue={formik.setFieldValue}
						loading={dialog.loading}
						adminClaims={adminClaims}
						mode={view}
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

export default UsuarioDialog;

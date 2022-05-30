import { Close, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Alert,
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	IconButton,
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
import { useDataContext } from "../../providers/DataProvider";
import { LoadingButton } from "@mui/lab";

function UsuarioForm() {
	const [feedback, setFeedback] = useState({});
	const [showPassword, setShowPassword] = useState(false);
	const { dialog, closeDialog, openDialog, stopLoading } = useMultiDialog();
	const { loadData } = useDataContext();
	const { getCategorias } = useFunctions();
	const { data, loading, mode } = dialog;
	const { isEmpty, isEmail } = validator;

	const initialValues = { ...data, phoneNumber: data.phoneNumber.substring(3) };

	const { values, touched, errors, dirty, isSubmitting, handleChange, handleSubmit } = useFormik({
		initialValues:
			mode === "agregar"
				? { ...initialValues, password: "", passwordConfirm: "" }
				: initialValues,
		validate: (values) => {
			const errors = {};

			Object.keys(values).forEach((field) => {
				const value = typeof values[field] === "string" ? values[field] : String(values[field]);

				if (
					isEmpty(value) &&
					(field === "nombre" ||
						field === "apellidoPaterno" ||
						field === "apellidoMaterno" ||
						field === "email" ||
						field === "password" ||
						field === "passwordConfirm" ||
						field === "role" ||
						field === "id")
				) {
					errors[field] = "Campo requerido";
				}
			});

			if (!isEmail(values.email)) {
				errors.email = "Email no valido";
			}

			if (values.phoneNumber.length !== 10) {
				errors.phoneNumber = "El numero de telefono debe ser de 10 digitos";
			}

			if (mode === "agregar" && values.password !== values.passwordConfirm) {
				errors.password = "";
				errors.passwordConfirm = "Las contraseñas no coinciden";
			}

			return errors;
		},
		onSubmit: async (values) => {
			try {
				if (mode === "agregar") {
					const { passwordConfirm, ...usuario } = values;

					usuario.displayName = `${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`;

					if (usuario.phoneNumber.length > 0) {
						usuario.phoneNumber = `+52${usuario.phoneNumber}`;
					}

					const result = await addUsuario(usuario);
					setFeedback({ success: result.data });
					setTimeout(async () => {
						try {
							closeDialog();
							await loadData(getUsuarios);
						} catch (error) {
							console.log(error);
						}
					}, 1000);
				} else if (mode === "editar") {
					const changes = {};

					Object.keys(values).forEach((field) => {
						if (values[field] !== dialog.data[field]) {
							changes[field] = values[field];
						}
					});

					if (!!changes.phoneNumber) {
						changes.phoneNumber = "+52" + changes.phoneNumber;
					}

					if (!!changes.nombre || !!changes.apellidoPaterno || !!changes.apellidoMaterno) {
						changes.displayName = `${changes.nombre || values.nombre} ${
							changes.apellidoPaterno || values.apellidoPaterno
						} ${changes.apellidoMaterno || values.apellidoMaterno}`;
					}

					if (Object.keys(changes).length > 0) {
						const result = await updateUsuario({ ...changes, id: data.id });
						setFeedback({ success: result.data });
						setTimeout(async () => {
							try {
								closeDialog();
								await loadData(getUsuarios);
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

	const { getUsuarios, updateUsuario, addUsuario } = useFunctions();

	const handleCancel = () => {
		openDialog("detalle", data);
		stopLoading();
	};

	return (
		<Box width="100%" position="relative" component="form" onSubmit={handleSubmit}>
			{loading && <LoadAnimation />}
			<DialogTitle>
				{dialog.mode === "agregar" ? "Agregar Usuario" : "Editar Usuario"}
			</DialogTitle>
			<DialogContent>
				<Grid container sx={{ py: 3 }} spacing={3}>
					<Grid item xs={8}>
						<TextField
							label="Id"
							name="id"
							disabled={data.id.length > 0 ? true : false}
							value={values.id}
							error={touched.id && !!errors.id}
							helperText={touched.id && errors.id}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label="Role"
							name="role"
							select
							value={values.role}
							error={touched.role && !!errors.role}
							helperText={touched.role && errors.role}
							onChange={handleChange}
							fullWidth
						>
							{["vendedor", "admin"].map((role) => (
								<MenuItem value={role} key={role}>
									{role}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label="Nombre"
							name="nombre"
							value={values.nombre}
							error={touched.nombre && !!errors.nombre}
							helperText={touched.nombre && errors.nombre}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label="Apellido Paterno"
							name="apellidoPaterno"
							value={values.apellidoPaterno}
							error={touched.apellidoPaterno && !!errors.apellidoPaterno}
							helperText={touched.apellidoPaterno && errors.apellidoPaterno}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={4}>
						<TextField
							label="Apellido Materno"
							name="apellidoMaterno"
							value={values.apellidoMaterno}
							error={touched.apellidoMaterno && !!errors.apellidoMaterno}
							helperText={touched.apellidoMaterno && errors.apellidoMaterno}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Correo"
							name="email"
							type="email"
							placeholder="correo@ejemplo.com"
							value={values.email}
							error={touched.email && !!errors.email}
							helperText={touched.email && errors.email}
							onChange={handleChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Telefono"
							name="phoneNumber"
							placeholder="5511223344"
							value={values.phoneNumber}
							error={touched.phoneNumber && !!errors.phoneNumber}
							helperText={touched.phoneNumber && errors.phoneNumber}
							onChange={handleChange}
							InputProps={{
								startAdornment: <InputAdornment position="start">(+52)</InputAdornment>
							}}
							fullWidth
						/>
					</Grid>
					{mode === "agregar" && (
						<React.Fragment>
							<Grid item xs={6}>
								<TextField
									label="Contraseña"
									name="password"
									type={showPassword ? "text" : "password"}
									value={values.password}
									error={
										touched.password && (!!errors.password || !!errors.passwordConfirm)
									}
									helperText={touched.password && errors.password}
									onChange={handleChange}
									fullWidth
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									label="Confirmar contraseña"
									name="passwordConfirm"
									type={showPassword ? "text" : "password"}
									value={values.passwordConfirm}
									error={touched.passwordConfirm && !!errors.passwordConfirm}
									helperText={touched.passwordConfirm && errors.passwordConfirm}
									onChange={handleChange}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={() => setShowPassword(!showPassword)}
												>
													{showPassword ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										)
									}}
									fullWidth
								/>
							</Grid>
						</React.Fragment>
					)}
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

export default UsuarioForm;

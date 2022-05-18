import { Close, Save, Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Alert,
	Button, FormControl,
	FormHelperText,
	Grid,
	IconButton,
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
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@utils/firebase";

const UsuarioFormulario = ({ nuevoItem = false }) => {
	const [showPassword, setShowPassword] = useState(false);
	const pageData = usePageData()
	const dialog = useDialog()
	
	const { values, errors, touched, isSubmitting, setStatus, status, setSubmitting, setFieldValue, handleChange, handleSubmit } = useFormik({
		initialValues: nuevoItem ? {...pageData.selectedItem, contra: '', contraVerif: ''} : pageData.selectedItem,
		validate: () => {
			const errors = {};

			Object.keys(values).forEach((key) => {
				if (values[key].length == 0) {
					if(key !== "imagen") {
						errors[key] = "Campo obligatorio";
					}
				}
			});

			if(values.contra !== values.contraVerif) {
				errors.contra = "Las contraseñas no coinciden"
				errors.contraVerif = "Las contraseñas no coinciden"
			}

			return errors;
		},
		onSubmit: () => {
			if(!nuevoItem) {
				delete values.contra
				delete values.contraVerif
				axios.put(`/api/usuarios/${usuario.correo}`, values)
					.then(() => {
						pageData.handleSelectedItem(values)
						dialog.handleOpenDialog({
							titulo: 'Ver usuario',
							content: null,
							updated: true
						})
					})
					.catch((error) => console.log("Error al actualizar usuario", error))
					.finally(() => {
						setSubmitting(false)
					})
			} else {
				createUserWithEmailAndPassword(auth, values.correo, values.contra)
					.then(({user}) => {
						const {alias, nombre, apellidoPaterno, apellidoMaterno, correo, telefono, role} = values
						axios.post('/api/usuarios', {id: user.uid, alias, nombre, apellidoPaterno, apellidoMaterno, correo, telefono, role})
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
					})
					.catch((error) => {
						setStatus(400)
						setSubmitting(false)
					})
				
			}
		}
	});

	const { nombre, alias, apellidoPaterno, apellidoMaterno, correo, telefono, role, contra, contraVerif } = values;
	const {extras: {categorias}} = pageData

	const handleCancel = () => {
		dialog.handleOpenDialog({
			titulo: 'Ver producto',
			content: null,
			updated: true
		})
	}

	const handleClickShowPassword = () => {
		setShowPassword((hidden) => !hidden);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};


	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<Grid container component={"form"} spacing={3} sx={{ pt: 2 }} onSubmit={handleSubmit}>
				<Grid item xs={8}>
					<TextField
						fullWidth
						label="Alias"
						name="alias"
						value={alias}
						helperText={touched.alias && errors.alias}
						error={touched.alias && Boolean(errors.alias)}
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel id="role">Rol de usuario</InputLabel>
						<Select
							labelId="role"
							name="role"
							value={role}
							error={touched.role && Boolean(errors.role)}
							label="Rol de usuario"
							onChange={handleChange}
						>
							<MenuItem value={'vendedor'}>Vendedor</MenuItem>
							<MenuItem value={'admin'}>Admin</MenuItem>
						</Select>
						<FormHelperText>{touched.role && errors.role}</FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Nombre"
						name="nombre"
						value={nombre}
						helperText={touched.nombre && errors.nombre}
						error={touched.nombre && Boolean(errors.nombre)}
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						fullWidth
						label="Apellido paterno"
						name="apellidoPaterno"
						value={apellidoPaterno}
						helperText={touched.apellidoPaterno && errors.apellidoPaterno}
						error={touched.apellidoPaterno && Boolean(errors.apellidoPaterno)}
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						fullWidth
						label="Apellido materno"
						name="apellidoMaterno"
						value={apellidoMaterno}
						helperText={touched.apellidoMaterno && errors.apellidoMaterno}
						error={touched.apellidoMaterno && Boolean(errors.apellidoMaterno)}
						variant="outlined"
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						disabled={!nuevoItem}
						type="email"
						label="Correo"
						name="correo"
						value={correo}
						error={touched.correo && Boolean(errors.correo)}
						variant="outlined"
						helperText={touched.correo && errors.correo}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Teléfono"
						name="telefono"
						value={telefono}
						error={touched.telefono && Boolean(errors.telefono)}
						variant="outlined"
						helperText={touched.telefono && errors.telefono}
						onChange={handleChange}
					/>
				</Grid>
				{
					nuevoItem && (
						<>
							<Grid item xs={6}>
								<TextField
									fullWidth
									type={showPassword ? "text" : "password"}
									name="contra"
									value={contra}
									onChange={handleChange}
									error={touched.contra && Boolean(errors.contra)}
									label="Contraseña"
									helperText={touched.contra && errors.contra}
								/>
							</Grid>
							<Grid item xs={6}>
								<TextField
									fullWidth
									type={showPassword ? "text" : "password"}
									name="contraVerif"
									value={contraVerif}
									onChange={handleChange}
									error={touched.contraVerif && Boolean(errors.contraVerif)}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										)
									}}
									label="Verificar contraseña"
									helperText={touched.contraVerif && errors.contraVerif}
								/>
							</Grid>
						</>
					)
				}
				<Grid item xs={12}>
					{status == 200 && <Alert severity="success">Usuario agregado exitosamente...</Alert>}
					{status == 400 && <Alert severity="error">Hubo un error al registrar el usuario...</Alert>}
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

export default UsuarioFormulario;

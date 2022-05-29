import { Visibility, VisibilityOff } from "@mui/icons-material";
import validator from "validator";
import LoadingButton from "@mui/lab/LoadingButton";
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState({});
	const { signin } = useAuth();
	const { values, errors, touched, handleChange, handleSubmit, isSubmitting } = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validate: ({ email, password }) => {
			const errors = {};

			if (!!message.error) {
				setMessage({});
			}

			// Email
			if (validator.isEmpty(email)) errors.email = "Introduce tu correo";
			else if (!validator.isEmail(email)) errors.email = "El correo proporcionado no es valido";

			// Password
			if (validator.isEmpty(password)) errors.password = "Introduce tu contraseña";
			else if (!validator.isAlphanumeric(password, "es-ES", { ignore: /-_.:,\$%&~#/g }))
				errors.password =
					"Solo se permiten valores alphanimericos y los caracteres especiales: - _ . : , $ % & ~ #";

			return errors;
		},
		onSubmit: async ({ email, password }) => {
			try {
				const userCredentials = await signin(email, password);
				setMessage({ success: "Bienvenido " + userCredentials.uid });
			} catch (err) {
				let message = "";

				switch (err.code) {
					case "auth/user-not-found":
						message = "Este usuario no existe";
						break;
					case "auth/wrong-password":
						message = "La contraseña es incorrecta";
						break;
					default:
						message = "Hubo un error al iniciar sesión";
						break;
				}

				setMessage({ error: message });
			}
		}
	});

	return (
		<Box maxWidth={"360px"} sx={{ p: 3 }} component="form" onSubmit={handleSubmit}>
			<Stack spacing={3}>
				<Typography variant="h4">Iniciar sesión</Typography>
				<TextField
					name="email"
					placeholder="correo@ejemplo.com"
					label="Correo"
					type="email"
					value={values.email}
					onChange={handleChange}
					error={touched.email && !!errors.email}
					helperText={touched.email && errors.email}
				/>
				<TextField
					name="password"
					label="Contraseña"
					type={showPassword ? "text" : "password"}
					value={values.password}
					onChange={handleChange}
					error={touched.password && !!errors.password}
					helperText={touched.password && errors.password}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton edge="end" onClick={() => setShowPassword((sP) => !sP)}>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						)
					}}
				/>
				{!!message.error && (
					<Alert severity="error">
						<AlertTitle>Error</AlertTitle>
						{!!message.error && message.error}
					</Alert>
				)}
				<Box>
					<LoadingButton
						variant="contained"
						type="submit"
						loading={isSubmitting}
						size="large"
						sx={{ width: "200px" }}
					>
						{/* Iniciar sesión */}
						{isSubmitting ? (
							<CircularProgress size={24} sx={{ color: "#fff" }} />
						) : (
							"Iniciar sesión"
						)}
					</LoadingButton>
				</Box>
			</Stack>
		</Box>
	);
}

export default Login;

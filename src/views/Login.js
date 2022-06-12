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
import React, { useEffect, useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import axios from "axios";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase-client";
import { validateLogin } from "../utils/helpers";

function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState({});
	const { signin } = useAuth();
	const { values, errors, touched, handleChange, handleSubmit, isSubmitting, setSubmitting } = useFormik({
		initialValues: {
			email: "",
			password: ""
		},
		validate: (values) => validateLogin(values),
		onSubmit: ({ email, password }) => {
			signin(email, password)
				.then((userCredentials) => {
					setMessage({ success: "Bienvenido " + userCredentials.displayName });
				})
				.catch(({ code }) => {
					const m = {};
					switch (code) {
						case "auth/user-not-found":
							m.error = "Este usuario no existe";
							break;
						case "auth/wrong-password":
							m.error = "La contraseña es incorrecta";
							break;
						default:
							m.error = "Hubo un error al iniciar sesión";
							break;
					}

					setMessage(m);
				})
				.finally(() => {
					setSubmitting(false);
				});
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
						"Iniciar sesión"
					</LoadingButton>
				</Box>
			</Stack>
		</Box>
	);
}

export default Login;

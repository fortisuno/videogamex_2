import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	Paper,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import { useFormik } from "formik";
import { getProviders, getSession, signIn } from "next-auth/react";
import React, { useEffect, useState } from "react";

export async function getServerSideProps(ctx) {

	const session = await getSession(ctx)

	if(session) return {
		redirect: {
			destination: '/',
			permanent: false
		}
	}

	return {
		props: {}, // will be passed to the page component as props
	}
}

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { values, errors, touched, handleChange, handleSubmit } = useFormik({
		initialValues: { correo: "", contra: "" },
		validate: () => {
			const errors = {};

			Object.keys(values).forEach((key) => {
				if (values[key].length == 0) {
					errors[key] = "Campo obligatorio";
				}
			});

			return errors
		},
		onSubmit: () => {
			signIn('credentials', {email: values.correo, password: values.contra})
			.then(() => console.log("successful"))
			.catch(() => console.log("error..."))
		}
	});

	const handleClickShowPassword = () => {
		setShowPassword((hidden) => !hidden);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Container maxWidth="sm" sx={{ height: "100vh" }}>
			<Stack justifyContent={"center"} height="100%">
				<Paper sx={{ p: 3 }}>
					<Stack
						spacing={3}
						alignItems="center"
						component={"form"}
						mb={5}
						onSubmit={handleSubmit}
					>
						<Typography variant="h3" textAlign={"center"} mb={3}>
							Iniciar sesión
						</Typography>
						<TextField
							sx={{ width: "60%" }}
							name="correo"
							label="Correo"
							variant="outlined"
							type={"email"}
							value={values.correo}
							onChange={handleChange}
							placeholder="corro@ejemplo.com"
							error={touched.correo && Boolean(errors.correo)}
							helperText={touched.correo && errors.correo}
						/>
						<TextField
							sx={{ width: "60%" }}
							type={showPassword ? "text" : "password"}
							name="contra"
							value={values.contra}
							onChange={handleChange}
							error={touched.contra && Boolean(errors.contra)}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{values.showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								)
							}}
							label="Contraseña"
							helperText={touched.contra && errors.contra}
						/>
						<Button type="submit" variant="contained" sx={{ width: "60%" }} size="large">
							Iniciar sesión
						</Button>
					</Stack>
				</Paper>
			</Stack>
		</Container>
	);
};

export default Login;

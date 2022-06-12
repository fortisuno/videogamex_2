import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Grid, IconButton, InputAdornment, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import LoadAnimation from "../LoadAnimation";
import { useAuth } from "../../providers/AuthProvider";
import { useEffect } from "react";

function UsuarioForm({
	values,
	errors,
	touched,
	handleSubmit,
	handleChange,
	loading,
	mode,
	adminClaims,
	setFieldValue
}) {
	const [showPassword, setShowPassword] = useState(false);

	const handlePattern = ({ target }) => {
		setFieldValue(target.name, target.validity.valid ? target.value : values[target.name]);
	};

	return (
		<Box width="100%" position="relative" component="form" onSubmit={handleSubmit}>
			{loading && <LoadAnimation />}
			<Grid container sx={{ py: 3 }} spacing={3}>
				<Grid item xs={12}>
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
				<Grid item xs={6}>
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
				<Grid item xs={6}>
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
						onChange={handlePattern}
						InputProps={{
							startAdornment: <InputAdornment position="start">(+52)</InputAdornment>,
							inputProps: { pattern: "[0-9]{0,10}" }
						}}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Role"
						name="role"
						select
						disabled={!adminClaims}
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
				{mode === "agregar" && (
					<React.Fragment>
						<Grid item xs={6}>
							<TextField
								label="Contraseña"
								name="password"
								type={showPassword ? "text" : "password"}
								value={values.password}
								error={touched.password && (!!errors.password || !!errors.passwordConfirm)}
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
			</Grid>
			<Button type="submit" sx={{ display: "none" }} />
		</Box>
	);
}

export default UsuarioForm;

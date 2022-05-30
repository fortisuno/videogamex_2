import { Add, Search } from "@mui/icons-material";
import {
	Button,
	IconButton,
	InputAdornment,
	MenuItem,
	TextField,
	Toolbar,
	Tooltip
} from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import validator from "validator";

function UsuarioSearch() {
	const [Usuarios, setUsuarios] = useState([]);
	const { getUsuarios } = useFunctions();
	const { isAlphanumeric, isEmpty } = validator;

	const { values, touched, errors, handleSubmit, handleChange } = useFormik({
		initialValues: { search: "", Usuario: "todas" },
		validate: ({ search }) => {
			const errors = {};
			if (!isEmpty(search) && !isAlphanumeric(search, "es-ES", { ignore: " :" })) {
				errors.search = "Introducir solo caracteres alfanuméricos";
			}
			return errors;
		},
		onSubmit: (values) => {
			console.log(values);
		}
	});

	const loadUsuarios = useCallback(async () => {
		try {
			const result = await getUsuarios({});
			setUsuarios(result.data);
		} catch (error) {
			console.log(error);
		}
	}, [setUsuarios]);

	useEffect(() => {
		loadUsuarios();
	}, [loadUsuarios]);

	return (
		<Toolbar
			disableGutters
			sx={{ p: 3, gap: 3, alignItems: "start" }}
			component="form"
			onSubmit={handleSubmit}
		>
			<Box sx={{ flexGrow: 1 }}>
				<TextField
					name="search"
					label="Buscar Usuario"
					placeholder="Buscar por nombre"
					error={touched.search && !!errors.search}
					helperText={touched.search && errors.search}
					value={values.search}
					onChange={handleChange}
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Tooltip title="Buscar Usuario">
									<IconButton edge="end" type="submit">
										<Search />
									</IconButton>
								</Tooltip>
							</InputAdornment>
						)
					}}
				/>
			</Box>
			<Tooltip title="Agregar Usuario">
				<Button
					variant="contained"
					sx={{
						borderRadius: 100,
						height: "55.97px",
						minWidth: "0px",
						width: "55.97px",
						p: 0
					}}
				>
					<Add />
				</Button>
			</Tooltip>
		</Toolbar>
	);
}

export default UsuarioSearch;

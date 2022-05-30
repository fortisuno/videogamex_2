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

function CategoriaSearch() {
	const [categorias, setCategorias] = useState([]);
	const { getCategorias } = useFunctions();
	const { isAlphanumeric, isEmpty } = validator;

	const { values, touched, errors, handleSubmit, handleChange } = useFormik({
		initialValues: { search: "", categoria: "todas" },
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

	const loadCategorias = useCallback(async () => {
		try {
			const result = await getCategorias({});
			setCategorias(result.data);
		} catch (error) {
			console.log(error);
		}
	}, [setCategorias]);

	useEffect(() => {
		loadCategorias();
	}, [loadCategorias]);

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
					label="Buscar Categoria"
					placeholder="Buscar por titulo"
					error={touched.search && !!errors.search}
					helperText={touched.search && errors.search}
					value={values.search}
					onChange={handleChange}
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Tooltip title="Buscar Categoria">
									<IconButton edge="end" type="submit">
										<Search />
									</IconButton>
								</Tooltip>
							</InputAdornment>
						)
					}}
				/>
			</Box>
			<TextField
				name="categoria"
				label="Categoría"
				value={values.categoria}
				onChange={handleChange}
				select
				sx={{ width: "200px" }}
			>
				<MenuItem value="todas">Todas</MenuItem>
				{categorias.map((content) => (
					<MenuItem value={content.id} key={content.id}>
						{content.titulo}
					</MenuItem>
				))}
			</TextField>
			<Tooltip title="Agregar Categoria">
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

export default CategoriaSearch;

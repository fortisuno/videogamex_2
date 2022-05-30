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
import { useMultiDialog } from "../../providers/MultiDialogProvider";

function CategoriaSearch() {
	const { isAlphanumeric, isEmpty } = validator;
	const { openDialog, stopLoading } = useMultiDialog();

	const { values, touched, errors, handleSubmit, handleChange } = useFormik({
		initialValues: { search: "" },
		validate: ({ search }) => {
			const errors = {};
			if (!isEmpty(search) && !isAlphanumeric(search, "es-ES", { ignore: " :-" })) {
				errors.search = "Introducir solo caracteres alfanuméricos";
			}
			return errors;
		},
		onSubmit: (values) => {
			console.log(values);
		}
	});

	const handleOpenDialog = () => {
		openDialog("agregar");
		stopLoading();
	};

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
					onClick={handleOpenDialog}
				>
					<Add />
				</Button>
			</Tooltip>
		</Toolbar>
	);
}

export default CategoriaSearch;

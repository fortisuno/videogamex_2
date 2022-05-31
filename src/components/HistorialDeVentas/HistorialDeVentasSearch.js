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
import { Add, Search } from "@mui/icons-material";

function HistorialDeVentasSearch() {
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
					label="Buscar Venta"
					placeholder="Buscar por id"
					error={touched.search && !!errors.search}
					helperText={touched.search && errors.search}
					value={values.search}
					onChange={handleChange}
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Tooltip title="Buscar venta">
									<IconButton edge="end" type="submit">
										<Search />
									</IconButton>
								</Tooltip>
							</InputAdornment>
						)
					}}
				/>
			</Box>
		</Toolbar>
	);
}

export default HistorialDeVentasSearch;

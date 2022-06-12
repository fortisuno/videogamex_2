import { Button, IconButton, InputAdornment, MenuItem, TextField, Toolbar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import validator from "validator";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import { Add, Search } from "@mui/icons-material";
import { validateSearch } from "../../utils/helpers";

function HistorialDeVentasSearch({ callback }) {
	const { values, touched, errors, handleSubmit, handleChange } = useFormik({
		initialValues: { search: "" },
		validate: (values) => validateSearch(values),
		onSubmit: (values) => {
			callback(values);
		}
	});

	return (
		<Toolbar sx={{ pb: 3, pt: 5, gap: 3, alignItems: "start" }} component="form" onSubmit={handleSubmit}>
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

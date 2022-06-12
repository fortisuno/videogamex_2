import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, Toolbar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import { validateSearch } from "../../utils/helpers";

function CategoriaSearch({ callback, children }) {
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
			<Tooltip title="Agregar Categoria">{children}</Tooltip>
		</Toolbar>
	);
}

export default CategoriaSearch;

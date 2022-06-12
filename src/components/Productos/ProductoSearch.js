import { Search } from "@mui/icons-material";
import { IconButton, InputAdornment, MenuItem, TextField, Toolbar, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { validateSearch } from "../../utils/helpers";

function ProductoSearch({ callback, disableGutters, children }) {
	const [categorias, setCategorias] = useState([]);
	const { values, touched, errors, handleSubmit, handleChange } = useFormik({
		initialValues: { search: "", categoriaId: "todas" },
		validate: (values) => validateSearch(values),
		onSubmit: (values) => {
			callback(values);
		}
	});

	useEffect(() => {
		const url = process.env.REACT_APP_API_URL + "/categorias";
		axios.get(url, { params: { pagination: false } }).then(({ data }) => {
			setCategorias(data);
		});
	}, []);

	return (
		<Toolbar
			disableGutters={disableGutters}
			sx={{ pb: 3, pt: 5, gap: 3, alignItems: "start" }}
			component="form"
			onSubmit={handleSubmit}
		>
			<Box sx={{ flexGrow: 1 }}>
				<TextField
					name="search"
					label="Buscar producto"
					placeholder="Buscar por titulo"
					error={touched.search && !!errors.search}
					helperText={touched.search && errors.search}
					value={values.search}
					onChange={handleChange}
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Tooltip title="Buscar producto">
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
				name="categoriaId"
				label="Categoría"
				value={values.categoriaId}
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
			{children}
		</Toolbar>
	);
}

export default ProductoSearch;

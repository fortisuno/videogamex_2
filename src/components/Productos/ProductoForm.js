import { Box, Button, Grid, InputAdornment, MenuItem, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import LoadAnimation from "../LoadAnimation";

function ProductoForm({ values, errors, touched, handleSubmit, handleChange, loading, setFieldValue }) {
	const [categorias, setCategorias] = useState([{ id: values.categoriaId, titulo: "" }]);

	useEffect(() => {
		const url = process.env.REACT_APP_API_URL + "/categorias";
		axios.get(url, { params: { pagination: false } }).then(({ data }) => {
			setCategorias(data);
		});
	}, []);

	const handlePattern = ({ target }) => {
		setFieldValue(target.name, target.validity.valid ? target.value : values[target.name]);
	};

	return (
		<Box width="100%" position="relative" component="form" onSubmit={handleSubmit}>
			{loading && <LoadAnimation />}
			<Grid container sx={{ py: 3 }} spacing={3}>
				<Grid item xs>
					<TextField
						label="Titulo"
						name="titulo"
						value={values.titulo}
						error={touched.titulo && !!errors.titulo}
						helperText={touched.titulo && errors.titulo}
						onChange={handleChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label="Categoría"
						name="categoriaId"
						select
						disabled={categorias.length === 0}
						value={values.categoriaId}
						error={touched.categoriaId && !!errors.categoriaId}
						helperText={touched.categoriaId && errors.categoriaId}
						onChange={handleChange}
						fullWidth
					>
						{categorias.map((categoria) => (
							<MenuItem value={categoria.id} key={categoria.id}>
								{categoria.titulo}
							</MenuItem>
						))}
					</TextField>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Desarrolladora"
						name="desarrolladora"
						value={values.desarrolladora}
						error={touched.desarrolladora && !!errors.desarrolladora}
						helperText={touched.desarrolladora && errors.desarrolladora}
						onChange={handleChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Imagen"
						name="imagen"
						placeholder="https://www.example.com/image.png"
						value={values.imagen}
						error={touched.imagen && !!errors.imagen}
						helperText={touched.imagen && errors.imagen}
						onChange={handleChange}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label="Stock"
						name="stock"
						value={values.stock}
						error={touched.stock && !!errors.stock}
						helperText={touched.stock && errors.stock}
						onChange={handlePattern}
						inputProps={{ pattern: "[0-9]*" }}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<TextField
						label="Precio"
						name="precio"
						value={values.precio}
						error={touched.precio && !!errors.precio}
						helperText={touched.precio && errors.precio}
						onChange={handlePattern}
						placeholder="0.00"
						InputProps={{
							startAdornment: <InputAdornment position="start">$</InputAdornment>,
							inputProps: { sx: { textAlign: "end" }, pattern: "[0-9]+|[0-9]+[.]|[0-9]+[.][0-9]{1,2}" }
						}}
						fullWidth
					/>
				</Grid>
				<Grid item xs={4}>
					<DatePicker
						label="Fecha de lanzamiento"
						value={values.fechaLanzamiento}
						name={"fechaLanzamiento"}
						onChange={(date) => setFieldValue("fechaLanzamiento", moment(date).toDate())}
						renderInput={(params) => (
							<TextField
								{...params}
								InputLabelProps={{ shrink: true }}
								fullWidth
								error={touched.fechaLanzamiento && !!errors.fechaLanzamiento}
								helperText={touched.fechaLanzamiento && errors.fechaLanzamiento}
							/>
						)}
					/>
				</Grid>
			</Grid>
			<Button type="submit" sx={{ display: "none" }} />
		</Box>
	);
}

export default ProductoForm;

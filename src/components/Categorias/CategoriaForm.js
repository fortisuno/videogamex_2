import { Box, Button, Grid, TextField } from "@mui/material";
import LoadAnimation from "../LoadAnimation";

function CategoriaForm({ values, errors, touched, handleSubmit, handleChange, loading }) {
	return (
		<Box width="100%" position="relative" component="form" onSubmit={handleSubmit}>
			{loading && <LoadAnimation />}
			<Grid container sx={{ py: 3 }} spacing={3}>
				<Grid item xs={12}>
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
			</Grid>
			<Button type="submit" sx={{ display: "none" }} />
		</Box>
	);
}

export default CategoriaForm;

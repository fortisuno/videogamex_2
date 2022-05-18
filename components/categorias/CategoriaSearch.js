import { useDialog } from "@hooks/useDialog";
import { usePageData } from "@hooks/usePageData";
import { Add, Search } from "@mui/icons-material";
import {
	Button, IconButton,
	InputAdornment, Stack,
	TextField,
	Tooltip
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import CategoriaFormulario from "./CategoriaFormulario";

const CategoriaSearch = () => {
	const {
		query,
		handleSelectedItem
	} = usePageData();
	const dialog = useDialog();
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			titulo: !!query.titulo ? query.titulo : "",
		},
		onSubmit: ({ titulo }) => {
			const search = {};

			if (titulo.length > 0) {
				search.titulo = titulo;
			}

			router.push({
				pathname: "/dashboard/categorias",
				query: search
			});
		}
	});

	const { values, handleChange, handleSubmit } = formik;

	const handleAgregar = () => {
		handleSelectedItem({
			id: "",
			titulo: "",
		});
		dialog.handleOpenDialog({
			titulo: "Agregar Categoría",
			content: <CategoriaFormulario />
		});
	};

	return (
		<Stack
			direction={"row"}
			spacing={3}
			sx={{ width: "100%" }}
			component="form"
			onSubmit={handleSubmit}
		>
			<TextField
				label="Buscar Categoría"
				placeholder="Buscar por titulo"
				name="titulo"
				value={values.titulo}
				onChange={handleChange}
				sx={{ flexGrow: 1 }}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<Tooltip title="Buscar producto">
								<IconButton type="submit" edge="end">
									<Search />
								</IconButton>
							</Tooltip>
						</InputAdornment>
					)
				}}
			/>
			<Tooltip title="Agregar categoría">
				<Button variant="contained" onClick={handleAgregar}>
					<Add />
				</Button>
			</Tooltip>
		</Stack>
	);
}

export default CategoriaSearch
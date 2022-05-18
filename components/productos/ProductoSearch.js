import { useDialog } from "@hooks/useDialog";
import { usePageData } from "@hooks/usePageData";
import { Add, Search } from "@mui/icons-material";
import {
	Button,
	FormControl,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Tooltip
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import ProductoFormulario from "./ProductoFormulario";
import moment from "moment";

const ProductoSearch = ({ admin = false }) => {
	const pageData = usePageData();
	const dialog = useDialog();
	const router = useRouter();

	const {
		extras: { categorias },
		query
	} = pageData;

	const formik = useFormik({
		initialValues: {
			titulo: !!query.titulo ? query.titulo : "",
			categoria: !!query.categoria ? query.categoria : "todas"
		},
		onSubmit: ({ titulo, categoria }) => {
			const search = {};

			if (titulo.length > 0) {
				search.titulo = titulo;
			}

			if (categoria !== "todas") {
				search.categoria = categoria;
			}

			router.push({
				pathname: admin ? "/dashboard/productos" : "/",
				query: search,
			});
		}
	});

	const { values, handleChange, handleSubmit } = formik;

	const handleAgregarProducto = () => {
		pageData.handleSelectedItem({
			id: "",
			titulo: "",
			desarrolladora: "",
			categoria: "disparos",
			imagen: "",
			stock: 1,
			precio: "",
			fechaLanzamiento: moment()
		});
		dialog.handleOpenDialog({
			titulo: "Agregar Producto",
			content: <ProductoFormulario nuevoItem={true} />
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
				label="Buscar producto"
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
			<FormControl sx={{ width: "200px" }}>
				<InputLabel id="categoria">Categoría</InputLabel>
				<Select
					labelId="categoria"
					name="categoria"
					value={values.categoria}
					onChange={handleChange}
					label="Categoría"
				>
					<MenuItem value={"todas"}>Todas</MenuItem>
					{categorias.map((categoria) => (
						<MenuItem value={categoria.id} key={categoria.id}>
							{categoria.titulo}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			{admin && (
				<Tooltip title="Agregar producto">
					<Button variant="contained" onClick={handleAgregarProducto}>
						<Add />
					</Button>
				</Tooltip>
			)}
		</Stack>
	);
};

export default ProductoSearch;

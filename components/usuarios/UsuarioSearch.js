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
import UsuarioFormulario from "./UsuarioFormulario";

const UsuarioSearch = () => {
	const {
		query,
		data,
		handleSelectedItem
	} = usePageData();
	const dialog = useDialog();
	const router = useRouter();
	const formik = useFormik({
		initialValues: {
			usuario: !!query.usuario ? query.usuario : "",
		},
		onSubmit: ({ usuario }) => {
			const search = {};

			if (usuario.length > 0) {
				search.usuario = usuario;
			}

			router.push({
				pathname: "/dashboard/usuarios",
				query: search
			});
		}
	});

	const { values, handleChange, handleSubmit } = formik;

	const handleAgregar = () => {
		handleSelectedItem({
			alias: '',
			nombre: '',
			apellidoPaterno: '',
			apellidoMaterno: '',
			correo: '',
			telefono: '',
			role: 'vendedor'
		});
		dialog.handleOpenDialog({
			titulo: "Agregar Usuario",
			content: <UsuarioFormulario nuevoItem/>
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
				label="Buscar Usuario"
				placeholder="Buscar por alias o por nombre"
				name="usuario"
				value={values.usuario}
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

export default UsuarioSearch
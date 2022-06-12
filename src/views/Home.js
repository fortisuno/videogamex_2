import LoadingButton from "@mui/lab/LoadingButton";
import {
	Box,
	Button,
	Divider,
	Grid,
	InputAdornment,
	List,
	ListItem,
	ListItemText,
	Snackbar,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	Typography
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useConfirm } from "material-ui-confirm";
import { useEffect, useState } from "react";
import LoadAnimation from "../components/LoadAnimation";
import Navbar from "../components/Navbar";
import ProductoCard from "../components/Productos/ProductoCard";
import ProductoSearch from "../components/Productos/ProductoSearch";
import ProductoThumbnail from "../components/Productos/ProductoThumbnail";
import UsuarioDialog from "../components/Usuarios/UsuarioDialog";
import { useCarrito } from "../hooks/useCarrito";
import { useDialog } from "../hooks/useDialog";
import { useFetch } from "../hooks/useFetch";
import { useSnackbar } from "../hooks/useSnackbar";
import { useAuth } from "../providers/AuthProvider";
import { regexp, validateVenta } from "../utils/helpers";

function Home() {
	const initialRequest = { path: "/productos", params: { asCard: true } };
	const [request, setRequest] = useState(initialRequest);
	const [selected, setSelected] = useState(null);
	const { values, errors, touched, isSubmitting, handleSubmit, setFieldValue, setSubmitting, resetForm } = useFormik({
		initialValues: { pago: "", metodoPago: "efectivo" },
		validate: (values) => validateVenta(values),
		onSubmit: (values) => {
			confirm({ description: "¿Está seguro de que desea realizar la venta?" }).then((result) => {
				const { productos, total, cambio } = carrito;
				values.pago = parseFloat(values.pago);
				const venta = {
					...values,
					productos,
					total,
					cambio,
					usuarioId: usuario.data.id
				};
				axios
					.post(process.env.REACT_APP_API_URL + "/ventas/add", venta)
					.then((response) => {
						resetForm();
						carrito.reset();
						handleFeedback(response.data.message, true);
					})
					.catch(({ response }) => {
						handleFeedback(response.data.message, false);
					})
					.finally(() => {
						setSubmitting(false);
					});
			});
		}
	});

	const usuarioDialog = useDialog({ open: false, view: "detalle" });
	const feedback = useSnackbar({ open: false, message: "" });
	const carrito = useCarrito(values.pago);
	const { usuario } = useAuth();
	const page = useFetch(request);
	const confirm = useConfirm();

	useEffect(() => {
		if (!carrito.productos.length > 0) {
			setFieldValue("pago", "");
		}
	}, [carrito.productos, setFieldValue]);

	const filterData = (props) => {
		const { search, categoriaId, ...pageParams } = request.params;
		const filter = { ...pageParams };

		!!props.search && (filter.search = props.search.toLowerCase().trim());
		props.categoriaId !== "todas" && (filter.categoriaId = props.categoriaId);

		setRequest({ path: request.path, params: filter });
	};

	const handlePago = ({ target }) => {
		setFieldValue("pago", target.validity.valid ? target.value : values.pago);
	};

	const handleMetodoPago = (event, metodo) => {
		setFieldValue("metodoPago", metodo);
	};

	const handleCancelar = () => {
		confirm({ description: "¿Estás seguro de que deseas cancelar la venta?" }).then(carrito.reset);
	};

	const handleOpenDialog = (id, view = "detalle") => {
		setSelected(id);
		usuarioDialog.open(view);
	};

	const handleFeedback = (message, refresh) => {
		if (refresh) {
			setRequest(initialRequest);
		}
		feedback.show(message);
	};

	return (
		<Box height="100vh" sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
			<Navbar openDialog={() => handleOpenDialog(usuario.data.id)} />
			<Toolbar />
			<UsuarioDialog
				id={selected}
				view={usuarioDialog.data.view}
				onChange={usuarioDialog.handleView}
				onSave={handleFeedback}
				dialogProps={{ onClose: usuarioDialog.close, open: usuarioDialog.data.open }}
			/>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={feedback.open}
				onClose={feedback.onClose}
				autoHideDuration={3000}
				message={feedback.message}
			/>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "1fr auto 300px",
					alignItems: "stretch",
					height: "100%",
					px: 5,
					gap: 5
				}}
			>
				<Box sx={{ position: "relative", height: "inherit" }}>
					<ProductoSearch callback={filterData} disableGutters />
					{!!page.loading && <LoadAnimation />}
					<Grid container spacing={5} columns={{ xs: 1, md: 3, lg: 4, xl: 6 }}>
						{!!page.data &&
							page.data.content.map((producto, index) => (
								<Grid item xs={1} key={index}>
									<ProductoCard data={producto} callback={carrito.add} />
								</Grid>
							))}
					</Grid>
				</Box>
				<Divider orientation="vertical" flexItem></Divider>
				<Stack sx={{ width: "300px", py: 5 }} component="form" onSubmit={handleSubmit}>
					<Typography variant="h4">Punto de venta</Typography>
					<List>
						{carrito.productos.map((producto, index) => (
							<ProductoThumbnail
								key={index}
								data={producto}
								remove={carrito.remove}
								handleCantidad={carrito.handleProducto}
							/>
						))}
					</List>
					<Stack mt="auto" spacing={1} pt={3}>
						<TextField
							name="pago"
							variant="outlined"
							label="Pago"
							placeholder="0.00"
							error={touched.pago && !!errors.pago}
							value={values.pago}
							disabled={carrito.productos.length === 0}
							onChange={handlePago}
							helperText={touched.pago && errors.pago}
							InputProps={{
								startAdornment: <InputAdornment position="start">$</InputAdornment>,
								inputProps: { sx: { textAlign: "end" }, pattern: "[0-9]+|[0-9]+[.]|[0-9]+[.][0-9]{1,2}" }
							}}
						/>
						<ToggleButtonGroup
							color="primary"
							value={values.metodoPago}
							onChange={handleMetodoPago}
							disabled={carrito.productos.length === 0}
							exclusive
							fullWidth
						>
							<ToggleButton value="tarjeta">Tarjeta</ToggleButton>
							<ToggleButton value="efectivo">Efectivo</ToggleButton>
						</ToggleButtonGroup>
						<List style={{ marginBottom: "1rem" }}>
							<ListItem
								disablePadding={true}
								disabled={carrito.productos.length === 0}
								secondaryAction={<ListItemText primary={`$ ${carrito.total.toFixed(2)}`} />}
							>
								<ListItemText sx={{ fontWeight: 500 }} primary="Total de venta" />
							</ListItem>
							<ListItem
								disablePadding={true}
								disabled={carrito.productos.length === 0}
								secondaryAction={
									<ListItemText
										primaryTypographyProps={{ align: "right" }}
										primary={`$ ${carrito.cambio.toFixed(2)}`}
									/>
								}
							>
								<ListItemText primary="Cambio" />
							</ListItem>
						</List>

						<LoadingButton
							variant="contained"
							size="large"
							loading={isSubmitting}
							disabled={
								carrito.productos.length === 0 ||
								(!!values.pago ? parseFloat(values.pago) < carrito.total : true)
							}
							type="submit"
							fullWidth
						>
							Pagar
						</LoadingButton>
						<Button
							variant="outlined"
							color="error"
							size="large"
							disabled={carrito.productos.length === 0}
							onClick={handleCancelar}
							fullWidth
						>
							Cancelar
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
}

export default Home;

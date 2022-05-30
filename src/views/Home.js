import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Container,
	Divider,
	Grid,
	InputAdornment,
	List,
	ListItem,
	ListItemText,
	Stack,
	TextField,
	ToggleButton,
	ToggleButtonGroup,
	Toolbar,
	Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import validator from "validator";
import MultiDialogProvider from "../providers/MultiDialogProvider";
import MultiDialog from "../components/MultiDialog";
import UsuarioDetalle from "../components/Usuarios/UsuarioDetalle";
import UsuarioForm from "../components/Usuarios/UsuarioForm";
import { emptyProducto, emptyUsuario } from "../utils/empy-entities";
import ProductoSearch from "../components/Productos/ProductoSearch";
import ProductoForm from "../components/Productos/ProductoForm";
import ProductoDetalle from "../components/Productos/ProductoDetalle";
import { useCarrito } from "../providers/CarritoProvider";
import { useData } from "../hooks/useData";
import { useDataContext } from "../providers/DataProvider";
import { useFunctions } from "../hooks/useFunctions";
import ProductoCard from "../components/Productos/ProductoCard";
import ProductoThumbnail from "../components/Productos/ProductoThumbnail";

function Home() {
	const { carrito, setMetodoPago, setPago } = useCarrito();
	const { data, loadData, resetData } = useDataContext();
	const [clientAmount, setClientAmount] = useState("");
	const { getProductos } = useFunctions();
	const [errors, setErrors] = useState({
		clientAmount: "",
		search: ""
	});

	useEffect(() => {
		loadData(getProductos, { asCard: true });
		return () => {
			resetData();
		};
	}, []);

	const { metodoPago } = carrito;

	const { isEmpty, matches } = validator;
	const regExp = {
		currency: /^[1-9][0-9]*$|^[1-9][0-9]*\.$|^[1-9][0-9]*\.[0-9]{1,2}$/g
	};

	const handleChange = (event, metodo) => {
		setMetodoPago(metodo);
	};

	const handleClientAmount = ({ target }) => {
		if (isEmpty(target.value) || matches(target.value, regExp.currency)) {
			setPago(parseFloat(target.value));
		}

		if (matches(target.value, /^[1-9][0-9]*\.$/g)) {
			setErrors({ ...errors, clientAmount: "Agrega centavos o quita el punto" });
		} else if (!isEmpty(errors.clientAmount)) {
			setErrors({ ...errors, clientAmount: "" });
		}
	};

	return (
		<Box height="100vh" sx={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
			<MultiDialogProvider initialValue={emptyUsuario}>
				<Navbar />
				<MultiDialog components={[UsuarioDetalle, UsuarioForm]} />
			</MultiDialogProvider>
			<Toolbar />
			<Container maxWidth="xl" sx={{ height: "100%" }}>
				<Stack
					direction="row"
					alignItems="stretch"
					height="inherit"
					divider={
						<Divider
							orientation="vertical"
							sx={{ height: "90%", alignSelf: "center" }}
							flexItem
						/>
					}
					spacing={5}
				>
					<Box sx={{ flexGrow: 1 }}>
						<MultiDialogProvider initialValue={emptyProducto}>
							<ProductoSearch />
							<MultiDialog components={[null, null]} />
						</MultiDialogProvider>
						<Grid container columns={5} spacing={4}>
							{data.map((producto, index) => (
								<Grid item xs={1} key={index}>
									<ProductoCard {...producto} />
								</Grid>
							))}
						</Grid>
					</Box>
					<Stack sx={{ width: "300px", py: 5 }}>
						<Typography variant="h4">Punto de venta</Typography>
						<List>
							{carrito.productos.map((producto, index) => (
								<ProductoThumbnail key={index} data={producto} />
							))}
						</List>
						<Stack mt="auto" spacing={1}>
							<TextField
								name="clientAmount"
								variant="outlined"
								label="Monto de cliente"
								placeholder="0.00"
								error={!isEmpty(errors.clientAmount)}
								value={carrito.pago}
								disabled={carrito.productos.length === 0}
								onChange={handleClientAmount}
								helperText={!isEmpty(errors.clientAmount) && errors.clientAmount}
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>,
									inputProps: { sx: { textAlign: "end" } }
								}}
							/>
							<ToggleButtonGroup
								color="primary"
								value={metodoPago}
								disabled={carrito.productos.length === 0}
								exclusive
								onChange={handleChange}
								fullWidth
							>
								<ToggleButton value="tarjeta">Tarjeta</ToggleButton>
								<ToggleButton value="efectivo">Efectivo</ToggleButton>
							</ToggleButtonGroup>
							<List style={{ marginBottom: "1rem" }}>
								<ListItem
									disablePadding={true}
									disabled={carrito.productos.length === 0}
									secondaryAction={
										<ListItemText primary={`$ ${carrito.total.toFixed(2)}`} />
									}
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

							<Button
								variant="contained"
								size="large"
								disabled={carrito.productos.length === 0}
								fullWidth
							>
								Pagar
							</Button>
							<Button
								variant="outlined"
								color="error"
								size="large"
								disabled={carrito.productos.length === 0}
								fullWidth
							>
								Cancelar
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</Container>
		</Box>
	);
}

export default Home;

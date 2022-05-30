import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Container,
	Divider,
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
import React, { useState } from "react";
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

function Home() {
	const [clientAmount, setClientAmount] = useState("");
	const [errors, setErrors] = useState({
		clientAmount: "",
		search: ""
	});

	const { isEmpty, matches } = validator;
	const regExp = {
		currency: /^[1-9][0-9]*$|^[1-9][0-9]*\.$|^[1-9][0-9]*\.[0-9]{1,2}$/g
	};

	const [metodoPago, setMetodoPago] = React.useState("efectivo");

	const handleChange = (event, metodo) => {
		setMetodoPago(metodo);
	};

	const handleClientAmount = ({ target }) => {
		if (isEmpty(target.value) || matches(target.value, regExp.currency)) {
			setClientAmount(target.value);
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
						<Alert
							sx={{ maxWidth: "50%", mx: "auto", mt: 10, borderRadius: 3 }}
							severity="warning"
						>
							<AlertTitle>Aviso</AlertTitle>
							No hay datos registrados de este modulo
						</Alert>
					</Box>
					<Stack sx={{ width: "300px", py: 5 }}>
						<Typography variant="h4">Punto de venta</Typography>
						<Stack mt="auto" spacing={1}>
							<TextField
								name="clientAmount"
								variant="outlined"
								label="Monto de cliente"
								placeholder="0.00"
								error={!isEmpty(errors.clientAmount)}
								value={clientAmount}
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
									disabled
									secondaryAction={<ListItemText primary="$0.00" />}
								>
									<ListItemText sx={{ fontWeight: 500 }} primary="Total de venta" />
								</ListItem>
								<ListItem
									disablePadding={true}
									disabled
									secondaryAction={
										<ListItemText
											primaryTypographyProps={{ align: "right" }}
											primary="$0.00"
										/>
									}
								>
									<ListItemText primary="Cambio" />
								</ListItem>
							</List>

							<Button variant="contained" size="large" fullWidth>
								Pagar
							</Button>
							<Button variant="outlined" color="error" size="large" fullWidth>
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

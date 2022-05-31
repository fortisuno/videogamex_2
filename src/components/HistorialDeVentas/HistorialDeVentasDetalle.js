import { Close, Edit } from "@mui/icons-material";
import {
	Box,
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItem,
	ListItemText
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import LoadAnimation from "../LoadAnimation";
import NoImage from "../NoImage";

function HistorialDeVentasDetalle() {
	const { dialog, closeDialog, openDialog, stopLoading } = useMultiDialog();
	const { data, loading } = dialog;

	return (
		<Box width="100%" position="relative">
			{loading && <LoadAnimation />}
			<DialogTitle>Venta detalle</DialogTitle>
			<DialogContent>
				<List disablePadding>
					<ListItem>
						<ListItemText
							primary="Id"
							primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
						/>
						<ListItemText
							primary={data.id}
							primaryTypographyProps={{ sx: { textAlign: "right" } }}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Fecha"
							primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
						/>
						<ListItemText
							primary={moment(data.fecha).format("DD/MM/YYYY")}
							primaryTypographyProps={{ sx: { textAlign: "right" } }}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Usuario"
							primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
						/>
						<ListItemText
							primary={data.usuario}
							primaryTypographyProps={{ sx: { textAlign: "right" } }}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Productos"
							primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
						/>
					</ListItem>
					{data.productos.map((producto, index) => (
						<ListItem key={index}>
							<ListItemText
								primary={producto.titulo}
								primaryTypographyProps={{ sx: { ml: 3 } }}
							/>
							<ListItemText
								primary={producto.cantidad}
								primaryTypographyProps={{ sx: { textAlign: "center" } }}
							/>
							<ListItemText
								primary={`$ ${producto.precio.toFixed(2)}`}
								primaryTypographyProps={{ sx: { textAlign: "right" } }}
							/>
						</ListItem>
					))}
					<ListItem>
						<ListItemText
							primary="Total"
							primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
						/>
						<ListItemText
							primary={`$ ${data.total.toFixed(2)}`}
							primaryTypographyProps={{ sx: { textAlign: "right" } }}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Pago"
							primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
						/>
						<ListItemText
							primary={`$ ${data.pago.toFixed(2)}`}
							primaryTypographyProps={{ sx: { textAlign: "right" } }}
						/>
					</ListItem>
					<ListItem>
						<ListItemText
							primary="Cambio"
							primaryTypographyProps={{ sx: { fontWeight: "bold" } }}
						/>
						<ListItemText
							primary={`$ ${data.cambio.toFixed(2)}`}
							primaryTypographyProps={{ sx: { textAlign: "right" } }}
						/>
					</ListItem>
				</List>
			</DialogContent>
			<DialogActions>
				<Button startIcon={<Close />} color="error" onClick={closeDialog}>
					Cerrar
				</Button>
			</DialogActions>
		</Box>
	);
}

export default HistorialDeVentasDetalle;

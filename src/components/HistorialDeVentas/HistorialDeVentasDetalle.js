import { Box, List, ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import LoadAnimation from "../LoadAnimation";

function HistorialDeVentasDetalle({ data, loading }) {
	const capitalize = (s) => s.replace(/^\w/, (c) => c.toUpperCase());
	return (
		<Box width="100%" position="relative">
			{loading && <LoadAnimation />}
			<List disablePadding>
				<ListItem>
					<ListItemText primary="Id" primaryTypographyProps={{ sx: { fontWeight: "bold" } }} />
					<ListItemText primary={data.id} primaryTypographyProps={{ sx: { textAlign: "right" } }} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Fecha" primaryTypographyProps={{ sx: { fontWeight: "bold" } }} />
					<ListItemText
						primary={moment(data.fecha).format("DD/MM/YYYY")}
						primaryTypographyProps={{ sx: { textAlign: "right" } }}
					/>
				</ListItem>
				<ListItem>
					<ListItemText primary="Usuario" primaryTypographyProps={{ sx: { fontWeight: "bold" } }} />
					<ListItemText primary={data.usuario} primaryTypographyProps={{ sx: { textAlign: "right" } }} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Productos" primaryTypographyProps={{ sx: { fontWeight: "bold" } }} />
				</ListItem>
				{data.productos.map((producto, index) => (
					<ListItem key={index}>
						<ListItemText
							primary={producto.titulo}
							sx={{ width: "50%" }}
							primaryTypographyProps={{ sx: { ml: 3 } }}
						/>
						<ListItemText primary={producto.cantidad} primaryTypographyProps={{ sx: { textAlign: "center" } }} />
						<ListItemText
							primary={`$ ${producto.precio.toFixed(2)}`}
							sx={{ width: "50px" }}
							primaryTypographyProps={{ sx: { textAlign: "right" } }}
						/>
					</ListItem>
				))}
				<ListItem>
					<ListItemText primary="Metodo de pago" primaryTypographyProps={{ sx: { fontWeight: "bold" } }} />
					<ListItemText
						primary={capitalize(data.metodoPago)}
						primaryTypographyProps={{ sx: { textAlign: "right" } }}
					/>
				</ListItem>
				<ListItem>
					<ListItemText primary="Total" primaryTypographyProps={{ sx: { fontWeight: "bold" } }} />
					<ListItemText
						primary={`$ ${data.total.toFixed(2)}`}
						primaryTypographyProps={{ sx: { textAlign: "right" } }}
					/>
				</ListItem>
				<ListItem>
					<ListItemText primary="Pago" primaryTypographyProps={{ sx: { fontWeight: "bold" } }} />
					<ListItemText
						primary={`$ ${data.pago.toFixed(2)}`}
						primaryTypographyProps={{ sx: { textAlign: "right" } }}
					/>
				</ListItem>
				<ListItem>
					<ListItemText primary="Cambio" primaryTypographyProps={{ sx: { fontWeight: "bold" } }} />
					<ListItemText
						primary={`$ ${data.cambio.toFixed(2)}`}
						primaryTypographyProps={{ sx: { textAlign: "right" } }}
					/>
				</ListItem>
			</List>
		</Box>
	);
}

export default HistorialDeVentasDetalle;

import { Box, List, ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import LoadAnimation from "../LoadAnimation";

function ProductoDetalle({ data, loading }) {
	const fechaLanzamiento = data.fechaLanzamiento.length > 0 ? moment(data.fechaLanzamiento).format("DD/MM/YYYY") : "";

	return (
		<Box width="100%" position="relative">
			{loading && <LoadAnimation />}
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: "auto 1fr",
					gap: 5,
					alignItems: "center"
				}}
			>
				<Box sx={{ width: "250px" }}>
					<img
						onError={(e) => (e.target.src = "/imagen-no-disponible.jpg")}
						src={data.imagen}
						alt={data.id}
						style={{ width: "100%" }}
					/>
				</Box>
				<Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
					<List>
						<ListItem>
							<ListItemText primary="Id" secondary={data.id} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Titulo" secondary={data.titulo} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Desarrolladora" secondary={data.desarrolladora} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Lanzamiento" secondary={fechaLanzamiento} />
						</ListItem>
					</List>
					<List>
						<ListItem>
							<ListItemText primary="CategoríaId" secondary={data.categoriaId} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Stock" secondary={data.stock} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Precio" secondary={`$ ${parseFloat(data.precio).toFixed(2)}`} />
						</ListItem>
					</List>
				</Box>
			</Box>
		</Box>
	);
}

export default ProductoDetalle;

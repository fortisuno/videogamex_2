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
import React, { useEffect } from "react";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import { emptyProducto } from "../../utils/empy-entities";
import LoadAnimation from "../LoadAnimation";
import NoImage from "../NoImage";

function ProductoDetalle() {
	const { dialog, closeDialog, openDialog, stopLoading } = useMultiDialog();
	const { data, loading } = dialog;

	const updateData = () => {
		openDialog("editar", data);
		stopLoading();
	};

	const fechaLanzamiento =
		data.fechaLanzamiento.length > 0 ? moment(data.fechaLanzamiento).format("DD/MM/YYYY") : "";

	return (
		<Box width="100%" position="relative">
			{loading && <LoadAnimation />}
			<DialogTitle>Producto detalle</DialogTitle>
			<DialogContent>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr auto",
						gap: 2,
						alignItems: "center"
					}}
				>
					<Box>
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
								<ListItemText primary="Categoría" secondary={data.categoria.titulo} />
							</ListItem>
							<ListItem>
								<ListItemText primary="Stock" secondary={data.stock} />
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Precio"
									secondary={`$ ${parseFloat(data.precio).toFixed(2)}`}
								/>
							</ListItem>
						</List>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button startIcon={<Close />} color="error" onClick={closeDialog}>
					Cerrar
				</Button>
				<Button startIcon={<Edit />} onClick={updateData}>
					Editar
				</Button>
			</DialogActions>
		</Box>
	);
}

export default ProductoDetalle;

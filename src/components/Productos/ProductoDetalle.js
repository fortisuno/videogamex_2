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

function ProductoDetalle() {
	const { dialog, closeDialog, openDialog, stopLoading } = useMultiDialog();

	const { id, content } = dialog.data;

	const showForm = () => {
		openDialog("editar");
		stopLoading();
	};

	const fechaLanzamiento = !!content ? moment(content.fechaLanzamiento).format("DD/MM/YYYY") : "";

	return (
		<Box width="100%" position="relative">
			{dialog.loading && <LoadAnimation />}
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
						{!!content && content.imagen.length > 0 ? (
							<img src={content.imagen} alt={id} style={{ width: "100%" }} />
						) : (
							<NoImage />
						)}
					</Box>
					<Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
						<List>
							<ListItem>
								<ListItemText primary="Id" secondary={!!id ? id : ""} />
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Titulo"
									secondary={!!content ? content.titulo : ""}
								/>
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Desarrolladora"
									secondary={!!content ? content.desarrolladora : ""}
								/>
							</ListItem>
							<ListItem>
								<ListItemText primary="Lanzamiento" secondary={fechaLanzamiento} />
							</ListItem>
						</List>
						<List>
							<ListItem>
								<ListItemText
									primary="Categoría"
									secondary={!!content ? content.categoria.titulo : ""}
								/>
							</ListItem>
							<ListItem>
								<ListItemText primary="Stock" secondary={!!content ? content.stock : ""} />
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Precio"
									secondary={`$ ${(!!content ? content.precio : 0).toFixed(2)}`}
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
				<Button startIcon={<Edit />} onClick={showForm}>
					Editar
				</Button>
			</DialogActions>
		</Box>
	);
}

export default ProductoDetalle;

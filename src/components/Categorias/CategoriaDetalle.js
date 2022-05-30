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
import React from "react";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import LoadAnimation from "../LoadAnimation";
import NoImage from "../NoImage";

function CategoriaDetalle() {
	const { dialog, closeDialog, openDialog, stopLoading } = useMultiDialog();
	const { data, loading } = dialog;

	const updateData = () => {
		openDialog("editar", data);
		stopLoading();
	};

	//const fechaLanzamiento = !!content ? moment(content.fechaLanzamiento).format("DD/MM/YYYY") : "";

	return (
		<Box width="100%" position="relative">
			{loading && <LoadAnimation />}
			<DialogTitle>Categoria detalle</DialogTitle>
			<DialogContent>
				<Box display="flex">
					<ListItem>
						<ListItemText primary="Id" secondary={data.id} />
					</ListItem>
					<ListItem>
						<ListItemText primary="Titulo" secondary={data.titulo} />
					</ListItem>
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

export default CategoriaDetalle;

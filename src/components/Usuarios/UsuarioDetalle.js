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

function UsuarioDetalle() {
	const { dialog, closeDialog, openDialog, stopLoading } = useMultiDialog();
	const { data, loading } = dialog;

	const showForm = () => {
		openDialog("editar", data);
		stopLoading();
	};

	//const fechaLanzamiento = !!content ? moment(content.fechaLanzamiento).format("DD/MM/YYYY") : "";

	return (
		<Box width="100%" position="relative">
			{loading && <LoadAnimation />}
			<DialogTitle>Usuario detalle</DialogTitle>
			<DialogContent>
				<Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
					<List>
						<ListItem>
							<ListItemText primary="Id" secondary={data.id} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Nombre completo" secondary={data.displayName} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Role" secondary={data.role} />
						</ListItem>
					</List>
					<List>
						<ListItem>
							<ListItemText primary="Correo" secondary={data.email} />
						</ListItem>
						<ListItem>
							<ListItemText primary="Telefono" secondary={data.phoneNumber} />
						</ListItem>
					</List>
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

export default UsuarioDetalle;

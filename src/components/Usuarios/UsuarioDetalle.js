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

	const content = dialog.data;

	const showForm = () => {
		openDialog("editar");
		stopLoading();
	};

    //const fechaLanzamiento = !!content ? moment(content.fechaLanzamiento).format("DD/MM/YYYY") : "";

	return (
		<Box width="100%" position="relative">
			{dialog.loading && <LoadAnimation />}
			<DialogTitle>Usuario detalle</DialogTitle>
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
							<img src={content.imagen} alt={content.id} style={{ width: "100%" }} />
						) : (
							<NoImage />
						)}
					</Box>
					<Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
						<List>
							<ListItem>
								<ListItemText primary="Id" secondary={!!content.id ? content.id : ""} />
							</ListItem>
							<ListItem>
								<ListItemText
									primary="Nombre"
									secondary={!!content ? content.Nombre : ""}
								/>
							</ListItem>
						</List>
						<List>
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

export default UsuarioDetalle;

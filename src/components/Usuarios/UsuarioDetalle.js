import { Box, List, ListItem, ListItemText } from "@mui/material";
import { useEffect } from "react";
import LoadAnimation from "../LoadAnimation";

function UsuarioDetalle({ data, loading }) {
	return (
		<Box width="100%" position="relative">
			{loading && <LoadAnimation />}
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
		</Box>
	);
}

export default UsuarioDetalle;

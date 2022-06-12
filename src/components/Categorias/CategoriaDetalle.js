import { Box, ListItem, ListItemText } from "@mui/material";
import LoadAnimation from "../LoadAnimation";

function CategoriaDetalle({ data, loading }) {
	return (
		<Box width="100%" position="relative">
			{loading && <LoadAnimation />}
			<Box display="flex">
				<ListItem>
					<ListItemText primary="Id" secondary={data.id} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Titulo" secondary={data.titulo} />
				</ListItem>
			</Box>
		</Box>
	);
}

export default CategoriaDetalle;

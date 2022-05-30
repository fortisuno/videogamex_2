import { Add, Close } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, ListItem, ListItemText, TextField } from "@mui/material";
import React from "react";
import { useCarrito } from "../../providers/CarritoProvider";

function ProductoThumbnail({ data }) {
	const { updateItem, removeItem } = useCarrito();
	return (
		<ListItem
			disableGutters
			secondaryAction={
				<IconButton size="small" color="error" edge="end" onClick={() => removeItem(data.id)}>
					<Close />
				</IconButton>
			}
		>
			<ListItemText
				primaryTypographyProps={{ noWrap: true }}
				primary={data.titulo}
				secondary={`$ ${data.precio.toFixed(2)}`}
			/>
			<Box width={"80px"}>
				<TextField
					name={`producto_${data.id}`}
					size="small"
					type="number"
					value={data.cantidad}
					onChange={({ target }) => updateItem(target.value, data.id)}
					fullWidth
					InputProps={{
						inputProps: { min: 1 }
					}}
				/>
			</Box>
		</ListItem>
	);
}

export default ProductoThumbnail;

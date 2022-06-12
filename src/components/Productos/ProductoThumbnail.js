import { Add, Close } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, ListItem, ListItemText, TextField } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useCarrito } from "../../providers/CarritoProvider";

function ProductoThumbnail({ data, handleCantidad, remove }) {
	const updateCantidad = ({ target }) => {
		const cantidad =
			!target.value.length > 0 ? 1 : parseInt(target.value) > data.stock ? data.stock : parseInt(target.value);
		handleCantidad(data.id, cantidad);
	};

	return (
		<ListItem
			disableGutters
			dense
			secondaryAction={
				<IconButton size="small" color="error" edge="end" onClick={() => remove(data.id)}>
					<Close />
				</IconButton>
			}
		>
			<ListItemText
				primaryTypographyProps={{ noWrap: true, maxWidth: "100px" }}
				primary={data.titulo}
				secondary={`$ ${data.precio.toFixed(2)}`}
			/>
			<Box width={"80px"}>
				<TextField
					name={`producto_${data.id}`}
					size="small"
					type="number"
					value={data.cantidad}
					onChange={updateCantidad}
					fullWidth
					InputProps={{
						inputProps: { min: 1, max: data.stock }
					}}
				/>
			</Box>
		</ListItem>
	);
}

export default ProductoThumbnail;

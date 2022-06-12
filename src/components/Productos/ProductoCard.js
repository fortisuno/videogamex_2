import { AddShoppingCart } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useCarrito } from "../../providers/CarritoProvider";

function ProductoCard({ data, callback }) {
	const { id, titulo, categoria, precio, imagen, stock } = data;
	const addToCart = () => {
		callback({ id, titulo, precio, stock });
	};
	return (
		<Card elevation={0}>
			<CardMedia
				component={"img"}
				alt={id}
				sx={{ width: "100%" }}
				src={imagen}
				onError={(e) => (e.target.src = "/imagen-no-disponible.jpg")}
			/>
			<CardContent>
				<Typography variant="subtitle1" textAlign={"center"} noWrap component="div">
					<b>{titulo}</b>
				</Typography>
				<Typography gutterBottom variant="subtitle2" textAlign={"center"} noWrap component="div">
					{categoria}
				</Typography>
				<Typography gutterBottom variant="body1" textAlign={"center"} noWrap component="div">
					${precio.toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button variant="contained" startIcon={<AddShoppingCart />} disabled={!stock} fullWidth onClick={addToCart}>
					Agregar
				</Button>
			</CardActions>
		</Card>
	);
}

export default ProductoCard;

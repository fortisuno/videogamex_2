import { AddShoppingCart } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { useCarrito } from "../../providers/CarritoProvider";

function ProductoCard({
	id = "",
	titulo = "",
	categoria = "",
	precio = 0,
	imagen = "",
	stock = 0
}) {
	const { addToCarrito } = useCarrito();
	return (
		<Card elevation={0}>
			<CardMedia
				component={"img"}
				alt={id}
				height={200}
				src={imagen}
				onError={(e) => (e.target.src = "/imagen-no-disponible.jpg")}
			/>
			<CardContent>
				<Typography variant="subtitle1" textAlign={"center"} noWrap component="div">
					<b>{titulo}</b>
				</Typography>
				<Typography
					gutterBottom
					variant="subtitle2"
					textAlign={"center"}
					noWrap
					component="div"
				>
					{categoria.titulo}
				</Typography>
				<Typography gutterBottom variant="body1" textAlign={"center"} noWrap component="div">
					${precio.toFixed(2)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant="contained"
					startIcon={<AddShoppingCart />}
					fullWidth
					onClick={() => addToCarrito({ id, titulo, precio, stock })}
				>
					Agregar
				</Button>
			</CardActions>
		</Card>
	);
}

export default ProductoCard;

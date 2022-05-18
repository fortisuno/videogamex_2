import NoImage from "@components/NoImage";
import { Close, Edit } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { usePageData } from "hooks/usePageData";
import { useDialog } from "hooks/useDialog";
import Image from "next/image";
import ProductoFormulario from "./ProductoFormulario";

const ProductoDetalle = () => {
	const pageData = usePageData();
	const dialog = useDialog();

	const { imagen, titulo, categoria, desarrolladora, stock, precio, fechaLanzamiento, id } =
		pageData.selectedItem;

	const handleReload = () => {
		pageData.reloadPage();
		dialog.handleCloseDialog();
	};

	const handleEditarItem = () => {
		dialog.handleOpenDialog({
			titulo: "Editar Producto",
			content: <ProductoFormulario />
		});
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs>
				{imagen ? <img src={imagen} style={{width: '100%'}} alt={id} /> : <NoImage />}
			</Grid>
			<Grid item xs={7}>
				<Stack spacing={3}>
					<Box display={"grid"} gridTemplateColumns="40% 1fr" alignItems={"baseline"}>
						<Typography variant="overline" gutterBottom>
							<b>Titulo:</b>
						</Typography>
						<Typography variant="body" gutterBottom>
							{titulo}
						</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr" alignItems={"baseline"}>
						<Typography variant="overline" gutterBottom>
							<b>Desarrolladora:</b>
						</Typography>
						<Typography variant="body" gutterBottom>
							{desarrolladora}
						</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr" alignItems={"baseline"}>
						<Typography variant="overline" gutterBottom>
							<b>Categoría id:</b>
						</Typography>
						<Typography variant="body" gutterBottom>
							{categoria}
						</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr" alignItems={"baseline"}>
						<Typography variant="overline" gutterBottom>
							<b>Lanzamiento:</b>
						</Typography>
						<Typography variant="body" gutterBottom>
							{moment(fechaLanzamiento).format("DD/MM/YYYY")}
						</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr" alignItems={"baseline"}>
						<Typography variant="overline" gutterBottom>
							<b>Stock:</b>
						</Typography>
						<Typography variant="body" gutterBottom>
							{stock}
						</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr" alignItems={"baseline"}>
						<Typography variant="overline" gutterBottom>
							<b>Precio:</b>
						</Typography>
						<Typography variant="h6" gutterBottom>
							${precio}
						</Typography>
					</Box>
				</Stack>
			</Grid>
			<Grid item xs={12}>
				<Stack direction={"row"} justifyContent="end" spacing={3}>
					<Button
						variant="outlined"
						color="error"
						startIcon={<Close />}
						onClick={dialog.updated ? handleReload : dialog.handleCloseDialog}
					>
						Cerrar
					</Button>
					<Button variant="contained" startIcon={<Edit />} onClick={handleEditarItem}>
						Editar
					</Button>
				</Stack>
			</Grid>
		</Grid>
	);
};

export default ProductoDetalle;

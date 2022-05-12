import { Grid, Stack, Typography, Box } from '@mui/material'
import React from 'react'
import DetalleView from './DetalleView'
import NoImage from './NoImage'

const ProductoDetalle = ({data, dialogActions}) => {
  	return (
		<DetalleView {...dialogActions}>
			<Grid item xs>
				{
					data.imagen
						? <img src={data.imagen} style={{width: '100%'}} alt={data.slug} />
						: <NoImage/>
				}
			</Grid>
			<Grid item xs={7}>
				<Stack spacing={3}>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Titulo:</b></Typography>
						<Typography variant="overline" gutterBottom>{data.titulo}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Dev:</b></Typography>
						<Typography variant="overline" gutterBottom>{data.desarrolladora}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Categoría:</b></Typography>
						<Typography variant="overline" gutterBottom>{data.categoria}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Stock:</b></Typography>
						<Typography variant="overline" gutterBottom>{data.stock}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Precio:</b></Typography>
						<Typography variant="h6" gutterBottom>${data.precio}</Typography>
					</Box>
				</Stack>
			</Grid>
		</DetalleView>
	)
}

export default ProductoDetalle
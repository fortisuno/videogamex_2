import { Grid, Stack, Typography, Box } from '@mui/material'
import React, { useContext } from 'react'
import DetalleView from './DetalleView'
import { DialogContext } from './DialogContainer'
import NoImage from './NoImage'
import ProductoForm from './ProductoForm'

const ProductoDetalle = () => {
	
	const {data} = useContext(DialogContext)

  	return (
		<DetalleView editableView={<ProductoForm checkOnSave={true}/>} title="Editar producto">
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
						<Typography variant="overline" gutterBottom><b>Desarrolladora:</b></Typography>
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
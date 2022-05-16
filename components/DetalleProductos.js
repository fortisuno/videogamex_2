import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import React, { useContext } from 'react'
import NoImage from './NoImage'
import { DialogContext } from './PageDialog'
import moment from 'moment'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import FormProductos from './FormProductos'
import {useRouter} from 'next/router'

const DetalleProductos = ({opciones}) => {
	const dialog = useContext(DialogContext)
	const router = useRouter()

	const {titulo, imagen, stock, categoria, precio, desarrolladora, fechaLanzamiento, id} = dialog.data

	const editItem = () => {
		dialog.changeDialogView({
			title: 'Editar producto',
			edition: true,
			component: <FormProductos opciones={opciones}/>
		})
	}

	const reloadData = () => {
		router.reload()
	}

	return (
		<Grid container spacing={3}>
			<Grid item xs>
				{
					imagen
						? <img src={imagen} style={{width: '100%'}} alt={id} />
						: <NoImage/>
				}
			</Grid>
			<Grid item xs={7}>
				<Stack spacing={3}>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Titulo:</b></Typography>
						<Typography variant="overline" gutterBottom>{titulo}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Desarrolladora:</b></Typography>
						<Typography variant="overline" gutterBottom>{desarrolladora}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Categoría:</b></Typography>
						<Typography variant="overline" gutterBottom>{categoria}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Lanzamiento:</b></Typography>
						<Typography variant="overline" gutterBottom>{moment(fechaLanzamiento).format('YYYY/MM/DD')}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Stock:</b></Typography>
						<Typography variant="overline" gutterBottom>{stock}</Typography>
					</Box>
					<Box display={"grid"} gridTemplateColumns="40% 1fr">
						<Typography variant="overline" gutterBottom><b>Precio:</b></Typography>
						<Typography variant="h6" gutterBottom>${precio}</Typography>
					</Box>
				</Stack>
			</Grid>
			<Grid item xs={12}>
				<Stack direction={"row"} justifyContent="end" spacing={3}>
					<Button variant='outlined' color="error" startIcon={<CloseIcon/>} onClick={ dialog.edited ? reloadData : dialog.closeDialog }>Cerrar</Button>
					<Button variant='contained' startIcon={<EditIcon/>} onClick={ editItem }>Editar</Button>
				</Stack>
			</Grid>
		</Grid>
	)
}

export default DetalleProductos
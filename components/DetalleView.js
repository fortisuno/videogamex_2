import { Button, DialogActions, DialogContent, Grid, Stack } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

const DetalleView = ({handleClose, handleAction, children}) => {
	return (
		<>
			<DialogContent>
				<Grid container spacing={3}>
					{children}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={2} px={2} pb={3}>
					<Button variant='outlined' startIcon={<CloseIcon/>} color='error' onClick={handleClose}>Cerrar</Button>
					<Button variant='contained' startIcon={<EditIcon/>} onClick={() => handleAction('editar')}>Editar</Button>
				</Stack>
			</DialogActions>
		</>
	)
}

export default DetalleView
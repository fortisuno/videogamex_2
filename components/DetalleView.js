import { Button, DialogActions, DialogContent, Grid, Stack } from '@mui/material'
import React, { useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { DialogContext } from './DialogContainer';

const DetalleView = ({editableView, title, children}) => {

	const {data, closeDialog, changeDialogView} = useContext(DialogContext)

	const handleChangeDialogView = () => {
		changeDialogView ({ view: editableView, title })
	}

	return (
		<>
			<DialogContent>
				<Grid container spacing={3}>
					{children}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={2} px={2} pb={3}>
					<Button variant='outlined' startIcon={<CloseIcon/>} color='error' onClick={ closeDialog }>Cerrar</Button>
					<Button variant='contained' startIcon={<EditIcon/>} onClick={handleChangeDialogView}>Editar</Button>
				</Stack>
			</DialogActions>
		</>
	)
}

export default DetalleView
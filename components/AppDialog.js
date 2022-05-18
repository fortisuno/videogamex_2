import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'

const AppDialog = ({onClose, open, mode='ver', titulo, detalle, formulario }) => {
	return (
		<Dialog onClose={onClose} open={open} maxWidth="md" fullWidth>
			<DialogTitle variant='h4' textAlign={"center"} sx={{pb: 5}}>{titulo}</DialogTitle>
			<DialogContent>
				{mode === 'ver' && detalle}
				{(mode === 'editar' || mode === 'agregar') && formulario}
			</DialogContent>
		</Dialog>
	)
}

export default AppDialog
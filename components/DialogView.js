import { Dialog, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { capitalize } from '../utils/functions';

const DialogView = ({opened, handleClose, action, children}) => {

	return (
		<Dialog fullWidth maxWidth="md" open={opened} onClose={handleClose} disableEscapeKeyDown>
			<DialogTitle>
				<Typography variant="h4" pt={3} pb={3} textAlign="center" component="div">
					{capitalize(action) + " Producto"}
				</Typography>
			</DialogTitle>
			{children}
      </Dialog>
	)
}

export default DialogView
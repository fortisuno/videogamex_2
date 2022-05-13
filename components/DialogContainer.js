import { Dialog, DialogTitle, Typography } from '@mui/material'
import { setConfig } from 'next/config'
import React, { createContext, useState } from 'react'

export const DialogContext = createContext()

const DialogContainer = ({ children }) => {
	const [dialog, setDialog] = useState({
		show: false,
		title: '',
		data: {},
		view: null
	})

	const openDialog = (props) => {
		setDialog({
			...props,
			show: true
		})
	}

	const closeDialog = (event, reason) => {
		if(reason && reason == "backdropClick")
			return;
		setDialog((props) => ({
			...props,
			show: false
		}))
	}

	const changeDialogView = (props) => {
		setDialog((prev) => ({...prev, ...props}))
	}

	return (
		<DialogContext.Provider value={{data: dialog.data, openDialog, closeDialog, changeDialogView}}>
			<Dialog fullWidth sx={{maxWidth: 800, mx: "auto"}} open={dialog.show} onClose={closeDialog} disableEscapeKeyDown>
					<DialogTitle variant='h5' sx={{mb: 2}} textAlign="center">
						{dialog.title}
					</DialogTitle>
					{ dialog.view }
			</Dialog>
			{children}
		</DialogContext.Provider>
	)
}

export default DialogContainer
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'
import { setConfig } from 'next/config'
import React, { createContext, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

export const DialogContext = createContext()

const PageDialog = ({ children }) => {
	const [dialog, setDialog] = useState({
		show: false,
		title: '',
		data: {},
		edition: false,
		edited: false,
		component: null
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

	const handleDialogData = (data) => {
		setDialog((props) => ({ ...props, data }))
	}

	const changeDialogView = (props) => {
		setDialog((prev) => ({...prev, ...props}))
	}

	return (
		<DialogContext.Provider value={{data: dialog.data, openDialog, closeDialog, changeDialogView, handleDialogData, title: dialog.title, edited: dialog.edited}}>
			<Dialog fullWidth maxWidth="md" open={dialog.show} onClose={closeDialog} disableEscapeKeyDown>
				<DialogTitle variant='h5' textAlign="center">
					{dialog.title}
				</DialogTitle>
				<DialogContent>
					{dialog.component}
				</DialogContent>
			</Dialog>
			{children}
		</DialogContext.Provider>
	)
}

export default PageDialog
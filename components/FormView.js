import { Button, DialogActions, DialogContent, Grid, Stack } from '@mui/material'
import { Formik, useFormik } from 'formik'
import React, { createContext, useContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { DialogContext } from './DialogContainer';

const FormView = ({handleSubmit, detailView, title, checkOnSave = false , children}) => {

	const {data, closeDialog, changeDialogView} = useContext(DialogContext)

	const handleChangeDialogView = () => {
		changeDialogView ({ view: detailView, title })
	}

	return (
		<form onSubmit={handleSubmit}>
			<DialogContent>
				<Grid container spacing={3}>
					{children}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={2} px={2} pb={3}>
					<Button variant='outlined' startIcon={<CloseIcon/>} color='error' onClick={!checkOnSave ? closeDialog : handleChangeDialogView}>cancelar</Button>
					<Button variant='contained' type='submit' startIcon={<SaveIcon/>}>Guardar</Button>
				</Stack>
			</DialogActions>
		</form>
	)
}

export default FormView
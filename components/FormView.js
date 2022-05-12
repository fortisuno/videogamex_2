import { Button, DialogActions, DialogContent, Grid, Stack } from '@mui/material'
import { Formik, useFormik } from 'formik'
import React, { createContext } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';

const FormContext = createContext()

const FormView = ({onSubmit, handleClose, action, handleAction, children}) => {

	return (
		<form onSubmit={onSubmit}>
			<DialogContent>
				<Grid container spacing={3}>
					{children}
				</Grid>
			</DialogContent>
			<DialogActions>
				<Stack direction={"row"} spacing={2} px={2} pb={3}>
					<Button variant='outlined' startIcon={<CloseIcon/>} color='error' onClick={action === 'agregar' ? handleClose : () => handleAction('ver')}>cancelar</Button>
					<Button variant='contained' type='submit' startIcon={<SaveIcon/>}>Guardar</Button>
				</Stack>
			</DialogActions>
		</form>
	)
}

export default FormView
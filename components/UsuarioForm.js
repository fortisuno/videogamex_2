import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import FormView from './FormView'

const UsuarioForm = ({data, dialogActions}) => {

	const {handleSubmit, values, handleChange} = useFormik({
		initialValues: {...data, contraVerif: ''},
		onSubmit: (e) => {
			const {contraVerif, ...usuario} = values
			console.log(usuario)
		}
	})

	const {alias, nombre, apellidoPaterno, apellidoMaterno, correo, contra, telefono, contraVerif} = values
	const {action} = dialogActions

	return (
		<FormView onSubmit={handleSubmit} {...dialogActions}>
			<Grid item xs={4}>
				<TextField fullWidth name='alias' label="Alias" value={alias} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={8}>
				<TextField fullWidth name='nombre' label="Nombre" value={nombre} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={6}>
				<TextField fullWidth name='apellidoPaterno' label="Apellido Paterno" value={apellidoPaterno} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={6}>
				<TextField fullWidth name='apellidoMaterno' label="Apellido Materno" value={apellidoMaterno} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={12}>
				<TextField fullWidth name='correo' label="Correo" type={"email"} value={correo} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={12}>
				<TextField fullWidth name='telefono' label="Telefono" value={telefono} variant="outlined" onChange={handleChange} />
			</Grid>
		</FormView>
	)
}

export default UsuarioForm
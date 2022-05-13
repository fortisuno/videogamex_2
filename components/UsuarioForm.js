import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { DialogContext } from './DialogContainer'
import FormView from './FormView'
import UsuarioDetalle from './UsuarioDetalle'

const emptyFrom = {
	alias: '',
	nombre: '',
	apellidoPaterno: '',
	apellidoMaterno: '',
	correo: '',
	telefono: '',
	tipo: 'vendedor'
}

const UsuarioForm = ({checkOnSave}) => {

	const {data} = useContext(DialogContext)

	const {handleSubmit, values, handleChange} = useFormik({
		initialValues: {...data},
		onSubmit: (e) => {
			e.preventDefault()
			console.log(values)
		}
	})

	const {alias, nombre, apellidoPaterno, apellidoMaterno, correo, telefono, tipo} = values

	return (
		<FormView detailView={<UsuarioDetalle/>} title="Ver usuario" handleSubmit={handleSubmit} checkOnSave={checkOnSave}>
			<Grid item xs={4}>
				<TextField fullWidth name='nombre' label="Nombre" value={nombre} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={4}>
				<TextField fullWidth name='apellidoPaterno' label="Apellido Paterno" value={apellidoPaterno} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={4}>
				<TextField fullWidth name='apellidoMaterno' label="Apellido Materno" value={apellidoMaterno} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={8}>
				<TextField fullWidth name='alias' label="Alias" value={alias} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={4}>
				<FormControl fullWidth>
					<InputLabel id="usuario-tipo">Tipo</InputLabel>
					<Select
						labelId="usuario-tipo"
						name="tipo"
						value={tipo}
						label="Tipo"
						onChange={handleChange}
					>
						<MenuItem value={'vendedor'}>Vendedor</MenuItem>
						<MenuItem value={'admin'}>Admin</MenuItem>
					</Select>
				</FormControl>
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
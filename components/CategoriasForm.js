import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { getSlug } from '../utils/functions'
import FormView from './FormView'

const CategoriasForm = ({data, dialogActions}) => {
	const {handleSubmit, values, handleChange} = useFormik({
		initialValues: data,
		onSubmit: (e) => {
			const categoria = {...values, slug: getSlug(values.titulo)}
			console.log(categoria)
		}
	})

	const {titulo} = values

	return (
		<FormView onSubmit={handleSubmit} {...dialogActions}>
			<Grid item xs={12}>
				<TextField fullWidth name='titulo' label="Titulo" value={titulo} variant="outlined" onChange={handleChange} />
			</Grid>
		</FormView>
	)
}

export default CategoriasForm
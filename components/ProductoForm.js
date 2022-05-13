import { FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { getSlug } from '../utils/functions'
import { DialogContext } from './DialogContainer'
import FormView from './FormView'
import ProductoDetalle from './ProductoDetalle'

const ProductoForm = ({checkOnSave}) => {

	const {data} = useContext(DialogContext)
  
	const {handleSubmit, values, handleChange} = useFormik({
		initialValues: data,
		onSubmit: (e) => {
			const producto = {...values, slug: getSlug(values.titulo)}
			console.log(producto)
		}
	})

	const {titulo, desarrolladora, categoria, imagen, stock, precio, fechaLanzamiento} = values

	return (
		<FormView detailView={<ProductoDetalle/>} title="Ver producto" handleSubmit={handleSubmit} checkOnSave={checkOnSave}>
			<Grid item xs={12}>
				<TextField fullWidth name='titulo' label="Titulo" value={titulo} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={7}>
				<TextField fullWidth name='desarrolladora' label="Desarrolladora" value={desarrolladora} variant="outlined" onChange={handleChange} />
			</Grid>
			<Grid item xs={5}>
				<FormControl fullWidth>
				<InputLabel id="categoria">Categoría</InputLabel>
				<Select
					labelId="categoria"
					name='categoria'
					value={categoria}
					label="Categoría"
					onChange={handleChange}
				>
					<MenuItem value={'accion'}>Acción</MenuItem>
					<MenuItem value={'carreras'}>Carreras</MenuItem>
					<MenuItem value={'aventura'}>Aventura</MenuItem>
				</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<TextField fullWidth name='imagen' onChange={handleChange} value={imagen} label="Imagen" placeholder='https://ejemplo.com/imagen.jpg' variant="outlined" />
			</Grid>
			<Grid item xs={4}>
				<TextField fullWidth name='stock' onChange={handleChange} label="Stock" value={stock} type={"number"} InputProps={{ inputProps: { min: 1 } }} placeholder='1' variant="outlined" />
			</Grid>
			<Grid item xs>
				<TextField fullWidth name='precio' onChange={handleChange} label="Precio" value={precio} type={"number"} placeholder='0.00' InputProps={{
				startAdornment: <InputAdornment position="start">$</InputAdornment>,
				inputProps: { min: 0, step: 0.01 }
				}} variant="outlined" />
			</Grid>
		</FormView>
	)
}

export default ProductoForm
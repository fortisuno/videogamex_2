import React, { useCallback, useContext, useEffect } from 'react'
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { DialogContext } from './PageDialog';
import FormProductos from './FormProductos';
import moment from "moment"
import SelectCategoria from './SelectCategoria';
import { useFormik } from 'formik';
import { SessionContext } from './Session';
import { useRouter } from 'next/router';
import { getQuery } from '../utils/functions';

const SearchProductos = ({adminView = false, opciones = []}) => {
	const dialog = useContext(DialogContext)
	const router = useRouter()
	const {values, touched, errors, setFieldValue, handleChange, handleSubmit} = useFormik({
		initialValues: getQuery(router.asPath, {titulo: '', categoria: 'todas'}),
		onSubmit: () => {
			const query = {}

			if(!!titulo && titulo.length > 0) {
				query.titulo = values.titulo
			}

			if(categoria !== 'todas') {
				query.categoria = values.categoria
			}

			router.push({
				pathname: '/dashboard/[module]',
				query: {...query, module: 'productos'}
			})
		}
	})

	const {titulo, categoria} = values

	const handleDialog = () => {
		dialog.openDialog({
			title: 'Agregar producto',
			data: {
				id: '',
				titulo: '',
				desarrolladora: '',
				categoria: 'disparos',
				imagen: '',
				stock: 1,
				precio: '',
				fechaLanzamiento: moment()
			},
			edition: true,
			component: <FormProductos opciones={opciones}/>
		})
	}

	return (
		<Stack direction={"row"} sx={{width: "100%"}} spacing={3} component="form" onSubmit={handleSubmit}>
			<Box flexGrow={1}>
				<TextField
					label={`Buscar productos`} 
					name={"titulo"}
					placeholder="Buscar por titulo"
					variant="outlined"
					fullWidth
					value={titulo}
					onChange={({target}) => setFieldValue('titulo', target.value)}
					InputProps={{
						endAdornment: <InputAdornment position="end">
							<Tooltip title="Buscar producto">
								<IconButton type='submit' edge="end">
									<SearchIcon/>
								</IconButton>
							</Tooltip>
						</InputAdornment>,
					}}/>
			</Box>
			<Box sx={{width: 200}}>
				<FormControl fullWidth>
					<InputLabel id="categoria">Categoría</InputLabel>
					<Select
						labelId="categoria"
						name="categoria"
						value={categoria}
						error={errors.categoria}
						label="Categoría"
						onChange={ handleChange }
					>
						<MenuItem value={"todas"}>Todas</MenuItem>
						{ opciones.map((opt) => <MenuItem value={opt.id} key={opt.id}>{opt.titulo}</MenuItem>)}
					</Select>
				</FormControl>
			</Box>
			{
				adminView && (
					<Tooltip title="Agregar producto">
						<Button variant="contained" onClick={ handleDialog }>
							<AddIcon/>
						</Button>
					</Tooltip>
				)
			}
		</Stack>
	)
}

export default SearchProductos
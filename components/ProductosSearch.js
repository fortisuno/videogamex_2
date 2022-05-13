import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { appData } from '../utils/data';
import { SessionContext } from './Session';
import { DialogContext } from './DialogContainer';
import ProductoForm from './ProductoForm';

const ProductosSearch = ({handleFilter, handleReset, checkpoint, withAddButton = true}) => {
	const {openDialog} = useContext(DialogContext)
	const {categorias} = useContext(SessionContext)
	const [filter, setFilter] = useState({
		titulo: '',
		categoria: 'todas'
	})

	const filterData = () => {
		const {titulo, categoria} = filter
		
		if(titulo.length === 0 && categoria === 'todas') {
			handleReset()
		} else {
			let filtered = checkpoint
			
			if(titulo.length > 0) {
				filtered = filtered.filter(item => item.titulo.includes(titulo))
			}

			if(categoria !== 'todas') {
				filtered = filtered.filter(item => item.categoria === categoria)
			}

			handleFilter(filtered)
		}
	}

	const handleOpenDialog = () => {
		openDialog({
			title: 'Agregar producto',
			data: {
				slug: '',
				titulo: '',
				desarrolladora: '',
				categoria: 'accion',
				imagen: '',
				stock: 1,
				precio: (0).toFixed(2)
			},
			view: <ProductoForm/>
		});
	}

	return (
		<Stack direction={"row"} width="100%" spacing={4}>
			<Box flexGrow={1} >
				<FormControl fullWidth variant="outlined">
					<InputLabel htmlFor="outlined-adornment-titulo">Buscar Producto</InputLabel>
					<OutlinedInput
						id="outlined-adornment-productos"
						type={"text"}
						name="titulo"
						placeholder={"Buscar por titulo"}
						value={filter.titulo}
						onChange={({target}) => setFilter({...filter, [target.name]: target.value})}
						endAdornment={
						<InputAdornment position="end">
							<Tooltip title="Buscar">
								<IconButton edge="end" onClick={filterData}>
									<SearchIcon/>
								</IconButton>
							</Tooltip>
						</InputAdornment>
						}
						label="Buscar Producto"
					/>
				</FormControl>
			</Box>
			<Box width={"200px"}>
				<FormControl fullWidth>
					<InputLabel id="outlined-adornment-producto">Categoría</InputLabel>
					<Select
						labelId="outlined-adornment-producto"
						id="demo-simple-select"
						value={filter.categoria}
						name="categoria"
						onChange={({target}) => setFilter({...filter, [target.name]: target.value})}
						label="Categoría"
						disabled={categorias.length > 0 ? false : true}
					>
						<MenuItem value={'todas'}>Todas</MenuItem>
						{ categorias.map((c) => <MenuItem value={c.slug} key={c.slug}>{c.titulo}</MenuItem>) }
					</Select>
				</FormControl>
			</Box>
			{
				withAddButton && (
					<Tooltip title="Agregar">
						<Button variant="contained" onClick={handleOpenDialog}>
							<AddIcon/>
						</Button>
					</Tooltip>
				)
			}
		</Stack>
	)
}

export default ProductosSearch
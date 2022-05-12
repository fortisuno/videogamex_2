import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { appData } from '../utils/data';

const ProductosSearch = ({handleOpened, handleData, base, withAddButton = true}) => {
	const [categorias, setCategorias] = useState([])
	const [filter, setFilter] = useState({
		titulo: '',
		categoria: 'todas'
	})

	const loadCategorias = useCallback((c) => setCategorias(c), [setCategorias])

	useEffect(() => {
		loadCategorias(appData.categorias)
	}, [loadCategorias])

	const handleFilter = ({target}) => {
		setFilter({
			...filter,
			[target.name]: target.value
		})
	}

	const filterRows = () => {
		const {titulo, categoria} = filter
		
		if(titulo.length === 0 && categoria === 'todas') {
			handleData(base)
		} else {
			let filtered = base
			
			if(titulo.length > 0) {
				filtered = filtered.filter(item => item.titulo.includes(titulo))
			}

			if(categoria !== 'todas') {
				filtered = filtered.filter(item => item.categoria === categoria)
			}

			handleData(filtered)
		}
	}

	const handleOpenDialog = () => {
		handleOpened({
			slug: '',
			titulo: '',
			desarrolladora: '',
			categoria: 'accion',
			imagen: '',
			stock: 1,
			precio: (0).toFixed(2)
		}, 'agregar');
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
						onChange={handleFilter}
						endAdornment={
						<InputAdornment position="end">
							<Tooltip title="Buscar">
								<IconButton edge="end" onClick={filterRows}>
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
						onChange={handleFilter}
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
import React, { useState } from 'react'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const CategoriasSearch = ({handleOpened, handleData, base}) => {
	const [filter, setFilter] = useState({
		titulo: '',
		categoria: 'todas'
	})

	const handleFilter = ({target}) => {
		setFilter({
			...filter,
			[target.name]: target.value
		})
	}

	const filterRows = () => {
		const {titulo, categoria} = filter
		
		if(titulo.length === 0) {
			handleData(base)
		} else {
			let filtered = base.filter(item => item.titulo.includes(titulo))

			handleData(filtered)
		}
	}

	const handleOpenDialog = () => {
		handleOpened({
			slug: '',
			titulo: '',
		}, 'agregar');
	}

	return (
		<Stack direction={"row"} width="100%" spacing={4}>
			<Box flexGrow={1} >
				<FormControl fullWidth variant="outlined">
					<InputLabel htmlFor="outlined-adornment-titulo">Buscar Categoría</InputLabel>
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
						label="Buscar categoría"
					/>
				</FormControl>
			</Box>
			<Tooltip title="Agregar">
				<Button variant="contained" onClick={handleOpenDialog}>
					<AddIcon/>
				</Button>
			</Tooltip>
		</Stack>
	)
}

export default CategoriasSearch
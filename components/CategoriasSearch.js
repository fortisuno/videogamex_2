import React, { useContext, useState } from 'react'
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { DialogContext } from './DialogContainer';
import CategoriasForm from './CategoriasForm';

const CategoriasSearch = ({handleFilter, handleReset, checkpoint}) => {
	const {openDialog} = useContext(DialogContext)
	const [filter, setFilter] = useState({
		titulo: '',
	})

	const handleChange = ({target}) => {
		setFilter({
			...filter,
			[target.name]: target.value
		})
	}

	const filterData = () => {
		const {titulo} = filter
		
		if(titulo.length === 0) {
			handleReset()
		} else {
			handleFilter(checkpoint.filter(item => item.titulo.includes(titulo)))
		}
	}

	const handleOpenDialog = () => {
		openDialog({
			title: 'Agregar categoría',
			data: {
				slug: '',
				titulo: '',
			},
			view: <CategoriasForm/>
		});
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
						onChange={handleChange}
						endAdornment={
						<InputAdornment position="end">
							<Tooltip title="Buscar">
								<IconButton edge="end" onClick={filterData}>
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
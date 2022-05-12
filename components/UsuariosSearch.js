import React, { useState } from 'react'
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

const UsuariosSearch = ({handleOpened, handleData, base}) => {

	const [filter, setFilter] = useState({
		usuario: '',
	})

	const handleFilter = ({target}) => {
		setFilter({
			...filter,
			[target.name]: target.value
		})
	}

	const filterRows = () => {
		const {usuario} = filter
		
		if(usuario.length === 0) {
			handleData(base)
		} else {
			let filtered = base.filter((item) => 
				item.alias.includes(usuario) || (`${item.nombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`).includes(usuario)
			)

			handleData(filtered)
		}
	}

	const handleOpenDialog = () => {
		handleOpened({
			alias: '',
			nombre: '',
			apellidoPaterno: '',
			apellidoMaterno: '',
			correo: '',
			telefono: '',
			contra: '',
		}, 'agregar');
	}

	return (
		<Stack direction={"row"} width="100%" spacing={4}>
			<Box flexGrow={1}>
				<FormControl fullWidth variant="outlined">
					<InputLabel htmlFor="outlined-adornment-categoria">Buscar usuario</InputLabel>
					<OutlinedInput
						id="outlined-adornment-usuarios"
						type={"text"}
						name="usuario"
						placeholder={"Buscar por alias, nombre"}
						value={filter.usuario}
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
						label="Buscar usuario"
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

export default UsuariosSearch
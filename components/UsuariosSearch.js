import React, { useContext, useState } from 'react'
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, Tooltip } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import UsuarioForm from './UsuarioForm';
import { DialogContext } from './DialogContainer';

const UsuariosSearch = ({handleFilter, handleReset, checkpoint}) => {
	const {openDialog} = useContext(DialogContext)
	const [filter, setFilter] = useState({
		usuario: '',
	})

	const handleChange = ({target}) => {
		setFilter({
			...filter,
			[target.name]: target.value
		})
	}

	const filterData = () => {
		const {usuario} = filter
		
		if(usuario.length === 0) {
			handleReset()
		} else {
			handleFilter(checkpoint.filter((item) => 
				item.alias.includes(usuario) || (`${item.nombre} ${item.apellidoPaterno} ${item.apellidoMaterno}`).includes(usuario)
			))
		}
	}

	const handleOpenDialog = () => {
		openDialog({
			title: 'Agregar usuario',
			data: {
				alias: '',
				nombre: '',
				apellidoPaterno: '',
				apellidoMaterno: '',
				correo: '',
				telefono: '',
				contra: '',
			},
			view: <UsuarioForm/>
		});
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
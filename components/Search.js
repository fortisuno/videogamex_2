import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material'
import { useFormik, validateYupSchema } from 'formik'
import React, { useEffect } from 'react'
import { forms } from '../utils/config'
import SearchIcon from '@mui/icons-material/Search';

const PageSearch = ({variant = 'productos', handleData, disableAddButton=false, form}) => {

	
	
	return (
		<Stack direction={"row"} sx={{width: "100%"}} spacing={3}>
			<Box flexGrow={1}>
				{
					!!Object.keys(form).find(k => k === "titulo") && (
						<TextField
							label={`Buscar ${variant}`} 
							name={"titulo"}
							placeholder="Buscar por titulo"
							variant="outlined" 
							fullWidth
							value={form.titulo}
							InputProps={{
								endAdornment: <InputAdornment position="end">
									<IconButton type='submit' edge="end">
										<SearchIcon/>
									</IconButton>
								</InputAdornment>,
							}}/>
					)
				}
				{
					!!Object.keys(form).find(k => k === "usuario") && (
						<TextField
							label={`Buscar ${variant}`} 
							name={"usuario"}
							placeholder="Buscar por usuario"
							variant="outlined" 
							fullWidth
							value={form.usuario}
							InputProps={{
								endAdornment: <InputAdornment position="end">
									<IconButton type='submit' edge="end">
										<SearchIcon/>
									</IconButton>
								</InputAdornment>,
							}}/>
					)
				}
			</Box>
			<FormControl sx={{width: 200}}>
				<InputLabel id="categoria">Categoria</InputLabel>
				<Select
					labelId="categoria"
					name={"categoria"}
					value={form.categoria}
					label="Categoria"
					onChange={handleData}
				>
					<MenuItem value={'todas'}>Todas</MenuItem>
					<MenuItem value={'accion'}>Acción</MenuItem>
					<MenuItem value={'disparos'}>disparos</MenuItem>
				</Select>
			</FormControl>
		</Stack>
	)
}

export default PageSearch
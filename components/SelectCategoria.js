import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

const SelectCategoria = ({disableAllOptions=false, value, error, handleChange, helperText}) => {
	const [categorias, setCategorias] = useState([{id: value, titulo: ''}])
	const [selected, setSelected] = useState(categorias[0])

	useEffect(() => {
		axios.get('/api/categorias')
			.then(({data}) => {
				setCategorias(data)
				setSelected(value)
			})
	}, [])

	const handleSelected = ({target}) => {
		setSelected(target.value)
		handleChange(target.value)
	}

	return (
		<FormControl fullWidth>
			<InputLabel id="categoria">Categoría</InputLabel>
			<Select
				labelId="categoria"
				name="categoria"
				value={selected}
				error={error}
				label="Categoría"
				onChange={ handleSelected }
			>
				{ !disableAllOptions && <MenuItem value={"todas"}>Todas</MenuItem> }
				{ categorias.map((categoria) => <MenuItem value={categoria.id} key={categoria.id}>{categoria.titulo}</MenuItem>) }
			</Select>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	)
}

export default SelectCategoria
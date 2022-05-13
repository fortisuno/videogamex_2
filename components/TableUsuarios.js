import React, { useCallback } from 'react'
import TableView from './TableView';
import { useFilteredData } from '../hooks/useFilteredData';
import UsuariosSearch from './UsuariosSearch';
import UsuarioDetalle from './UsuarioDetalle';

const TableUsuarios = ({loading, rows}) => {
	
	const {items, pagedItems, pagination, filterItems, resetItems} = useFilteredData(rows)

	const handleFilter = useCallback(filterItems, [filterItems])
	const handleReset = useCallback(resetItems, [resetItems])

	const headCells = [
		{id: 'alias', title: 'Alias'},
		{id: 'nombre', title: 'Nombre'},
		{id: 'apellidoPaterno', title: 'Apellido Paterno'},
		{id: 'apellidoMaterno', title: 'Apellido Materno'},
		{id: 'tipo', title: 'Tipo'},
	]

  	return (
		<TableView headCells={headCells} items={items} pagedItems={pagedItems} pagination={pagination} loading={loading} detailView={<UsuarioDetalle/>}>
			<UsuariosSearch  handleFilter={handleFilter} handleReset={handleReset} checkpoint={items}/>
		</TableView>
	)
}

export default TableUsuarios
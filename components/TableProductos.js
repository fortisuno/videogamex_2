import React, { useCallback } from 'react'
import ProductosSearch from './ProductosSearch';
import TableView from './TableView';
import { useFilteredData } from '../hooks/useFilteredData';
import UsuarioDetalle from './UsuarioDetalle';
import ProductoDetalle from './ProductoDetalle';


const TableProductos = ({loading, rows}) => {

	const {items, pagedItems, pagination, filterItems, resetItems} = useFilteredData(rows)

	const handleFilter = useCallback(filterItems, [filterItems])
	const handleReset = useCallback(resetItems, [resetItems])

	const headCells = [
		{id: 'slug', title: 'Slug'},
		{id: 'titulo', title: 'Titulo'},
		{id: 'categoria', title: 'Categoria'},
	]

  	return (
		<TableView headCells={headCells} items={items} pagedItems={pagedItems} pagination={pagination} loading={loading} detailView={<ProductoDetalle/>}>
			<ProductosSearch handleFilter={handleFilter} handleReset={handleReset} checkpoint={items}/>
		</TableView>
	)
}

export default TableProductos
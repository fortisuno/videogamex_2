import React, { useCallback } from 'react'
import TableView from './TableView';
import { useFilteredData } from '../hooks/useFilteredData';
import CategoriasSearch from './CategoriasSearch';

const TableCategorias = ({loading, rows}) => {
	
	const {items, pagedItems, pagination, filterItems, resetItems} = useFilteredData(rows)

	const handleFilter = useCallback(filterItems, [filterItems])
	const handleReset = useCallback(resetItems, [resetItems])

	const headCells = [
		{id: 'slug', title: 'Slug'},
		{id: 'titulo', title: 'Titulo'},
	]

  	return (
		<TableView headCells={headCells} items={items} pagedItems={pagedItems} pagination={pagination} loading={loading} showDetails={false}>
			<CategoriasSearch handleFilter={handleFilter} handleReset={handleReset} checkpoint={items}/>
		</TableView>
	  )
}

export default TableCategorias
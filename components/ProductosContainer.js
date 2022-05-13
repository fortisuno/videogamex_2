import { Box, Toolbar } from '@mui/material'
import React, { useCallback } from 'react'
import { useDialog } from '../hooks/useDialog';
import { useTable } from '../hooks/useTable';
import ProductoCard from './ProductoCard';
import ProductosSearch from './ProductosSearch'
import moment from 'moment';
import { useFilteredData } from '../hooks/useFilteredData';

const ProductosContainer = ({data}) => {
	const {items, pagedItems, pagination, filterItems, resetItems} = useFilteredData(data)

	const handleFilter = useCallback(filterItems, [filterItems])
	const handleReset = useCallback(resetItems, [resetItems])



	return (
		<Box width={"100%"} >
			<Toolbar sx={{ mb: 5, px: 0 }} disableGutters>
				<ProductosSearch handleFilter={handleFilter} handleReset={handleReset} checkpoint={items} withAddButton={false}/>
			</Toolbar>
			<Box sx={{
				display: "grid",
				gridTemplateColumns: "repeat(5, 1fr)",
				gap: 5
			}}>
				{
					items.map((producto, idx) => <ProductoCard key={producto.slug + "_" + idx + moment().toDate().getTime()} producto={producto}/>)
				}
			</Box>
		</Box>
	)
}

export default ProductosContainer
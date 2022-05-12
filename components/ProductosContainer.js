import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { useDialog } from '../hooks/useDialog';
import { useTable } from '../hooks/useTable';
import ProductoCard from './ProductoCard';
import ProductosSearch from './ProductosSearch'
import moment from 'moment';

const ProductosContainer = ({rows, addToCarrito}) => {
	const {filteredRows, filterRows, config} = useTable(rows);

	return (
		<Box width={"100%"}>
			<Toolbar sx={{ mb: 5, px: 0 }}>
				<ProductosSearch handleData={filterRows} base={rows} withAddButton={false}/>
			</Toolbar>
			<Box sx={{
				display: "grid",
				gridTemplateColumns: "repeat(5, 1fr)",
				gap: 5,
				px: 3
			}}>
				{
					filteredRows.map((producto) => <ProductoCard key={producto.slug + "_" + moment().toDate().getTime()} producto={producto}/>)
				}
			</Box>
		</Box>
	)
}

export default ProductosContainer
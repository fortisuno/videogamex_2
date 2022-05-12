import React from 'react'
import ProductosSearch from './ProductosSearch';
import ProductoDialog from './ProductoDialog';
import TableView from './TableView';
import { useDialog } from '../hooks/useDialog';
import { useTable } from '../hooks/useTable';

const ProductosTable = ({loading, rows}) => {
	const {opened, data, dialogView, handleOpen, handleClose, handleDialogView} = useDialog();
	const {filteredRows, filterRows, config} = useTable(rows);

	const headCells = [
		{id: 'slug', title: 'Slug'},
		{id: 'titulo', title: 'Titulo'},
		{id: 'categoria', title: 'Categoria'},
	]

  	return (
		<>
			<ProductoDialog dialogActions={{opened, handleClose, action: dialogView, handleAction: handleDialogView}} data={data} />
			<TableView headCells={headCells} loading={loading} rows={filteredRows} handleOpen={handleOpen} {...config}>
				<ProductosSearch handleOpened={handleOpen} handleData={filterRows} base={rows}/>
			</TableView>;
		</>
	)
}

export default ProductosTable
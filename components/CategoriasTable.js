import React from 'react'
import TableView from './TableView';
import { useDialog } from '../hooks/useDialog';
import { useTable } from '../hooks/useTable';
import CategoriaDialog from './CategoriaDialog';
import CategoriasSearch from './CategoriasSearch';

const CategoriasTable = ({loading, rows}) => {
	const {opened, data, dialogView, handleOpen, handleClose, handleDialogView} = useDialog();
	const {filteredRows, filterRows, config} = useTable(rows);

	const headCells = [
		{id: 'slug', title: 'Slug'},
		{id: 'titulo', title: 'Titulo'},
	]

  	return (
			<>
				<CategoriaDialog dialogActions={{opened, handleClose, action: dialogView, handleAction: handleDialogView}} data={data} />
				<TableView headCells={headCells} loading={loading} rows={filteredRows} handleOpen={handleOpen} editable={false} {...config}>
					<CategoriasSearch handleOpened={handleOpen} handleData={filterRows} base={rows}/>
				</TableView>;
			</>
	  )
}

export default CategoriasTable
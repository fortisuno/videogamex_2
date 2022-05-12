import React from 'react'
import TableView from './TableView';
import { useDialog } from '../hooks/useDialog';
import { useTable } from '../hooks/useTable';
import UsuariosSearch from './UsuariosSearch';
import UsuariosDialog from './UsuariosDialog';

const UsuariosTable = ({loading, rows}) => {
	const {opened, data, dialogView, handleOpen, handleClose, handleDialogView} = useDialog();
	const {filteredRows, filterRows, config} = useTable(rows);

	const headCells = [
		{id: 'alias', title: 'Alias'},
		{id: 'nombre', title: 'Nombre'},
		{id: 'apellidoPaterno', title: 'Apellido Paterno'},
		{id: 'apellidoMaterno', title: 'Apellido Materno'},
	]

  	return (
		<>
			<UsuariosDialog dialogActions={{opened, handleClose, action: dialogView, handleAction: handleDialogView}} data={data} />
			<TableView headCells={headCells} loading={loading} rows={filteredRows} handleOpen={handleOpen} {...config}>
				<UsuariosSearch handleOpened={handleOpen} handleData={filterRows} base={rows}/>
			</TableView>;
		</>
	)
}

export default UsuariosTable
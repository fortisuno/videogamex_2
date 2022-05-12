import React from 'react'
import DialogView from './DialogView';
import CategoriasForm from './CategoriasForm';

const CategoriaDialog = ({data, dialogActions}) => {
	return (
		<DialogView {...dialogActions}>
			<CategoriasForm data={data} dialogActions={dialogActions}/>
		</DialogView>
	)
}

export default CategoriaDialog
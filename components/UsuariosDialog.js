import React from 'react'
import ProductoForm from './ProductoForm';
import DialogView from './DialogView';
import UsuarioDetalle from './UsuarioDetalle';
import UsuarioForm from './UsuarioForm';

const UsuariosDialog = ({data, dialogActions}) => {
	return (
		<DialogView {...dialogActions}>
			{
				dialogActions.action === 'ver'
					? <UsuarioDetalle data={data} dialogActions={dialogActions}/>
					: <UsuarioForm data={data} dialogActions={dialogActions}/>
			}
		</DialogView>
	)
}

export default UsuariosDialog
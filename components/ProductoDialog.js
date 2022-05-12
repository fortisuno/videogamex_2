import React from 'react'
import ProductoDetalle from './ProductoDetalle';
import ProductoForm from './ProductoForm';
import DialogView from './DialogView';

const ProductoDialog = ({data, dialogActions}) => {
	return (
		<DialogView {...dialogActions}>
			{
				dialogActions.action === 'ver'
					? <ProductoDetalle data={data} dialogActions={dialogActions}/>
					: <ProductoForm data={data} dialogActions={dialogActions}/>
			}
		</DialogView>
	)
}

export default ProductoDialog
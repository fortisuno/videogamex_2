import React from 'react'
import ContentLayout from '../layouts/ContentLayout'
import { appData } from '../utils/appData'

export async function getServerSideProps({params}) {

	const page = appData.productos.find((info) => info.slug === params.producto)

	return {
		props: {
			data: {
				...page,
				admin: false,
			}
		},
	}
 }

const ProductoDetalle = ({data}) => {
	return (
		<div>Producto</div>
	)
}

ProductoDetalle.getLayout = ContentLayout.getLayout

export default ProductoDetalle
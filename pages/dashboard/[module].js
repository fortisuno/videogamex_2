import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import TableProductos from '../../components/TableProductos';
import DashboardLayout from '../../layouts/DashboardLayout';
import {appData} from '../../utils/appData';

export async function getStaticProps({params}) {

	const page = appData.pages.find((info) => info.slug === params.module)

	return {
		props: {
			data: {
				title: page.title,
				admin: true,
				slug: params.module,
				path: '/dashboard/' + params.module
			}
		},
	}
}

export async function getStaticPaths() {
	return {
		paths: [
			{ params: { module: 'productos' } },
			{ params: { module: 'categorias' } },
			{ params: { module: 'usuarios' } },
		],
		fallback: false
	};
}

const Module = ({data}) => {

	const [table, setTable] = useState([])

	useEffect(() => {
		let keys = [];
		let items = [];
		
		switch(data.slug) {
			case 'usuarios':
				items = [
					['Alias', 'Nombre completo', 'RFC'],
					...appData.usuarios.map((item) => [ item.alias, item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno, item.rfc])
				]
				break;
			case 'categorias':
				items = [
					['Slug', 'Titulo',],
					...appData.categorias.map((item) => [ item.slug, item.title])
				]
				break;
			default:
				items = [
					['Slug', 'Titulo', 'Categoría'],
					...appData.productos.map((item) => [ item.slug, item.titulo, item.categoria ])
				]
				break;
		}

		setTable(items)
	}, [data])

	if(table.length > 0) {
		return <TableProductos items={table}/>
	}

	return (
		<div className='py-5 text-center'>
			<h2 className='display-4 mt-5'>No se encontraron registros</h2>
		</div>
	)
}

Module.getLayout = DashboardLayout.getLayout

export default Module
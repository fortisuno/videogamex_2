import React, { useCallback, useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout';
import { appData } from '../../utils/data';
import ProductosTable from '../../components/ProductosTable';
import CategoriasTable from '../../components/CategoriasTable';
import UsuariosTable from '../../components/UsuariosTable';

export async function getStaticProps({params}) {
	return {
		props: {
			data: {
				slug:[ params.module],
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
			{ params: { module: 'historial_de_ventas' } },
			{ params: { module: 'resumen_de_ingresos' } },
		],
		fallback: false
	};
}

const Module = ({data}) => {
	const [tableData, setTableData] = useState({
		rows: [],
		loading: true
	})

	const loadTableData = useCallback((td) => {
		setTableData(td)
	}, [setTableData])

	useEffect(() => {

		loadTableData({rows: appData[data.slug[0]], loading: false})

	}, [data, loadTableData])

	return (
		<ContentSwitch slug={data.slug[0]} data={tableData}/>
	)
}

const ContentSwitch = ({slug, data}) => {
	switch(slug) {
		case 'productos':
			return <ProductosTable {...data}/>
		case 'categorias':
			return <CategoriasTable {...data}/>
		case 'usuarios':
			return <UsuariosTable {...data}/>
		default:
			return <span>No disponible</span>
	}
}

Module.getLayout = DashboardLayout.getLayout

export default Module
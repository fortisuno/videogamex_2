import React, { useEffect } from 'react'
import { forms, headers, titles } from '../../utils/config';
import PageTable from '../../components/PageTable';
import { Box, Paper, Toolbar } from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import { useFetch } from '../../hooks/useFetch';
import PageSearch from '../../components/Search';
import { useFormik } from 'formik';
import SearchProductos from '../../components/SearchProductos';
import axios from 'axios';
import { useRouter } from 'next/router';
import SearchCategorias from '../../components/SearchCategorias';

export async function getStaticProps({params}) {
	const data = {}

	if(params.module === "productos") {
		const categorias = await axios.get(process.env.APIMASK + "/api/categorias")
		data.categorias = await categorias.data || []
	}

	data.slug = params.module
	data.title = titles[params.module]

	return {
		props: { data },
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
	const router = useRouter()
	const {table, filterRows} = useFetch(`/api${router.asPath.substring(10)}`)
	
	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 3}}>
				{
					data.slug !== "resumen_de_ingresos" ? (
						<React.Fragment>
							<Toolbar sx={{py: 3}}>
								{data.slug === 'productos' && <SearchProductos opciones={data.categorias} adminView={true}/>}
								{data.slug === 'categorias' && <SearchCategorias/>}
							</Toolbar>
							<PageTable 
								data={{
									headers: headers[data.slug],
									rows: !!table.data ?  table.data : []
								}}
								variant={data.slug}
								detailed={data.slug === "categorias" ? false : true}
								categorias={data.categorias}
								loading={table.loading}/>
						</React.Fragment>
					) : <span>Pagina de resumen...</span>
				}
			</Paper>
		</Box>
	)
}

Module.getLayout = DashboardLayout.getLayout

export default Module
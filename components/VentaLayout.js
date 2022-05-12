import { Container, Toolbar } from '@mui/material'
import React from 'react'
import DefaultLayout from './DefaultLayout'

const VentaLayout = ({data, children}) => {
	return (
		<DefaultLayout dashboard={data.dashboard}>
			<Toolbar/>
			<Container maxWidth="xl">
				{children}
			</Container>
		</DefaultLayout>
	)
}

VentaLayout.getLayout = (data, page) => <VentaLayout data={data}>{page}</VentaLayout>

export default VentaLayout
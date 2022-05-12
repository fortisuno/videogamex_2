import { Box } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'

const DefaultLayout = ({dashboard = false, children}) => {
	return (
		<Box>
			<Navbar dashboard={dashboard}/>
			<Box sx={{display: "grid", gridTemplateRows: "auto 1fr", minHeight: '100vh'}}>
				{children}
			</Box>
		</Box>
	)
}

DefaultLayout.getLayout = (data, page) => <DefaultLayout data={data}>{ page }</DefaultLayout>

export default DefaultLayout
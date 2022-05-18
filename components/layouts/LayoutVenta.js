import Navbar from '@components/Navbar';
import { Container, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { DialogProvider } from 'hooks/useDialog';
import { PageDataProvider } from 'hooks/usePageData';
import React from 'react';

const LayoutVenta = ({apiPath, currentPage, extras, query, usuario, titulo, children}) => {
	return (
		<PageDataProvider url={{apiPath, query}} usuario={usuario} extras={extras}>
			<DialogProvider>
				<Box sx={{ display: 'flex'}}>
					<Navbar/>
					<Box component="main" sx={{ flexGrow: 1, p: 5 }}>
						<Toolbar/>
						<Container maxWidth="xl">
							{children}
						</Container>
					</Box>
				</Box>
			</DialogProvider>
		</PageDataProvider>
	)
}

LayoutVenta.getLayout = (props, page) => <LayoutVenta {...props}>{ page }</LayoutVenta>

export default LayoutVenta
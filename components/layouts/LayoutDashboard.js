import DrawerItem from '@components/DrawerItem';
import Navbar from '@components/Navbar';
import { Category, Group, Inventory } from '@mui/icons-material';
import { Container, Drawer, List, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DialogProvider } from 'hooks/useDialog';
import { PageDataProvider } from 'hooks/usePageData';
import React from 'react';

const drawerWidth = 250;

const LayoutDashboard = ({apiPath, currentPage, extras, query, usuario, titulo, children}) => {

	return (
		<PageDataProvider url={{apiPath, query}} usuario={usuario} extras={extras}>
			<DialogProvider>
				<Box sx={{ display: 'flex'}}>
					<Navbar dashboard={true}/>
					<Drawer
						variant="permanent"
						sx={{
							minWidth: drawerWidth,
							flexShrink: 0,
							[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
						}}
					>
						<Toolbar />
						<Box overflow={"auto"}>
						<List sx={{marginTop: '50px'}}>
							<DrawerItem
								text="Productos"
								icon={<Inventory/>}
								selected={currentPage === 'productos' ? true : false}
								path={'productos'}
							/>
							<DrawerItem
								text="Categorias"
								icon={<Category/>}
								selected={currentPage === 'categorias' ? true : false}
								path={'categorias'}
							/>
							<DrawerItem
								text="Usuarios"
								icon={<Group/>}
								selected={currentPage === 'usuarios' ? true : false}
								path={'usuarios'}
							/>
						</List>
						</Box>
					</Drawer>
					<Box component="main" sx={{ flexGrow: 1, p: 5 }}>
						<Toolbar/>
						<Container maxWidth="lg">
							<Typography variant="h2" gutterBottom marginBottom={5} component="div">
								{titulo}
							</Typography>
							{children}
						</Container>
					</Box>
				</Box>
			</DialogProvider>
		</PageDataProvider>
	)
}

LayoutDashboard.getLayout = (props, page) => <LayoutDashboard {...props}>{ page }</LayoutDashboard>

export default LayoutDashboard
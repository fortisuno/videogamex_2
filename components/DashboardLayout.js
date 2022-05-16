import React from 'react'
import { Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import GroupIcon from '@mui/icons-material/Group';
import SellIcon from '@mui/icons-material/Sell';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Box } from '@mui/system';
import Navbar from './Navbar';
import Link from './Link';
import { pages } from '../utils/config';

const drawerWidth = 300;
const modules = [
	{slug: 'productos', title: 'Productos', icon: <InventoryIcon/>},
	{slug: 'categorias', title: 'Categorías', icon: <CategoryIcon/>},
	{slug: 'usuarios', title: 'Usuarios', icon: <GroupIcon/>},
	{slug: 'historial_de_ventas', title: 'Historial de ventas', icon: <SellIcon/>},
	{slug: 'resumen_de_ingresos', title: 'Resumen de ingresos', icon: <MonetizationOnIcon/>},
]

const DashboardLayout = ({data, children}) => {

	return (
		<Box sx={{ display: 'flex'}}>
			<Navbar dashboard={true}/>
			<Drawer
				variant="permanent"
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
				}}
			>
				<Toolbar />
				<Box overflow={"auto"}>
				<List sx={{marginTop: '50px'}}>
					{
						modules.map((module, i) => (
							<ListItem key={i} disablePadding>
								<ListItemButton selected={module.slug === data.slug ? true : false} component={Link} noLinkStyle href={'/dashboard/' + module.slug}>
									<ListItemIcon>
										{module.icon}
									</ListItemIcon>
									<ListItemText primary={module.title}/>
								</ListItemButton>
							</ListItem>
						))
					}
				</List>
				</Box>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 5 }}>
				<Toolbar/>
				<Container maxWidth="lg">
					<Typography variant="h2" gutterBottom marginBottom={5} component="div">
						{ pages.find(page => page.slug === data.slug).title }
					</Typography>
					{children}
				</Container>
			</Box>
		</Box>
	)
}

DashboardLayout.getLayout = (data, page) => <DashboardLayout data={data}>{ page }</DashboardLayout>

export default DashboardLayout
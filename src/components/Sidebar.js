import { Category, Group, Inventory, Sell, Summarize } from "@mui/icons-material";
import { Box, Drawer, Toolbar, List, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React from "react";
import SidebarListItem from "./SidebarListItem";

const drawerWidth = 300;

function Sidebar() {
	return (
		<Drawer
			variant="permanent"
			sx={{
				minWidth: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" }
			}}
		>
			<Toolbar sx={{ justifyContent: "center" }}>
				<Typography
					variant="h6"
					noWrap
					style={{ userSelect: "none" }}
					sx={{
						mr: 2,
						display: { xs: "none", md: "flex" },
						fontFamily: "monospace",
						fontWeight: 700,
						letterSpacing: ".1rem",
						color: "inherit",
						textDecoration: "none"
					}}
				>
					Videogamex
				</Typography>
			</Toolbar>
			<Box overflow={"auto"}>
				<List>
					<SidebarListItem pathname="/dashboard/productos">
						<ListItemIcon sx={{ color: "inherit" }}>
							<Inventory />
						</ListItemIcon>
						<ListItemText primary="Productos" />
					</SidebarListItem>
					<SidebarListItem pathname="/dashboard/categorias">
						<ListItemIcon sx={{ color: "inherit" }}>
							<Category />
						</ListItemIcon>
						<ListItemText primary="Categorías" />
					</SidebarListItem>
					<SidebarListItem pathname="/dashboard/usuarios">
						<ListItemIcon sx={{ color: "inherit" }}>
							<Group />
						</ListItemIcon>
						<ListItemText primary="Usuarios" />
					</SidebarListItem>
					<SidebarListItem pathname="/dashboard/historial-de-ventas">
						<ListItemIcon sx={{ color: "inherit" }}>
							<Sell />
						</ListItemIcon>
						<ListItemText primary="Historias de ventas" />
					</SidebarListItem>
					<SidebarListItem pathname="/dashboard/resumen-de-ingresos">
						<ListItemIcon sx={{ color: "inherit" }}>
							<Summarize />
						</ListItemIcon>
						<ListItemText primary="Resumen de ingresos" />
					</SidebarListItem>
				</List>
			</Box>
		</Drawer>
	);
}

export default Sidebar;

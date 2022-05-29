import { MoreVert, Settings } from "@mui/icons-material";
import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Tooltip,
	Typography
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../providers/AuthProvider";

function Dashboard() {
	const [anchorElUser, setAnchorElUser] = useState(null);
	const { signout } = useAuth();
	const navigate = useNavigate();

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleSignOut = async () => {
		await signout();
	};

	return (
		<Box display={"flex"}>
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, px: 10, color: grey[800] }}>
				<Toolbar disableGutters sx={{ justifyContent: "end", gap: 3 }}>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => navigate("/", { replace: true })}
					>
						Ir a la tienda
					</Button>
					<Tooltip title="Abrir ajustes">
						<IconButton onClick={handleOpenUserMenu} variant="outlined" color="inherit">
							<Settings />
						</IconButton>
					</Tooltip>
					<Menu
						sx={{ mt: "45px" }}
						id="menu-appbar"
						anchorEl={anchorElUser}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right"
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right"
						}}
						open={Boolean(anchorElUser)}
						onClose={handleCloseUserMenu}
					>
						<MenuItem onClick={handleSignOut}>
							<Typography textAlign="center">Cerrar sesión</Typography>
						</MenuItem>
					</Menu>
				</Toolbar>
				<Stack spacing={3} sx={{ pb: 8 }}>
					<Outlet />
				</Stack>
			</Box>
		</Box>
	);
}

export default Dashboard;

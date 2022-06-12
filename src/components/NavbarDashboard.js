import { Settings } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

function NavbarDashboard({ openDialog }) {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const { signout, usuario } = useAuth();
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
		<Toolbar disableGutters sx={{ justifyContent: "end", gap: 3 }}>
			<Button variant="outlined" color="primary" onClick={() => navigate("/", { replace: true })}>
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
				<MenuItem onClick={openDialog}>
					<Typography textAlign="center">Ver cuenta</Typography>
				</MenuItem>
				<MenuItem onClick={handleSignOut}>
					<Typography textAlign="center">Cerrar sesión</Typography>
				</MenuItem>
			</Menu>
		</Toolbar>
	);
}

export default NavbarDashboard;

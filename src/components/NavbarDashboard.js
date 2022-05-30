import { Settings } from "@mui/icons-material";
import { Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFunctions } from "../hooks/useFunctions";
import { useAuth } from "../providers/AuthProvider";
import { useMultiDialog } from "../providers/MultiDialogProvider";

function NavbarDashboard() {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const { openDialog, loadData } = useMultiDialog();
	const { getUsuarioDetalle } = useFunctions();
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

	const handleShowDetalle = () => {
		const { id } = usuario.data;
		openDialog("detalle");
		loadData(getUsuarioDetalle, id);
	};
	return (
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
				<MenuItem onClick={handleShowDetalle}>
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

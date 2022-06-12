import { Settings } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

function Navbar({ openDialog }) {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const { signout, usuario } = useAuth();
	const navigate = useNavigate();
	const { pathname } = useLocation();

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
		<AppBar
			position="fixed"
			sx={{
				zIndex: (theme) => theme.zIndex.drawer + 1,
				...(pathname === "/" && { bgcolor: "white", color: grey[800] })
			}}
		>
			<Box px={10}>
				<Toolbar disableGutters>
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

					<Box flexGrow={1} display="flex" justifyContent="right" gap={3}>
						{!!usuario.isAdmin && (
							<Button
								variant="outlined"
								color={pathname === "/" ? "primary" : "inherit"}
								onClick={() => navigate(pathname === "/" ? "/dashboard/productos" : "/")}
							>
								Ir al dashboard
							</Button>
						)}
						<Tooltip title="Abrir ajustes">
							<IconButton onClick={handleOpenUserMenu} color="inherit">
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
					</Box>
				</Toolbar>
			</Box>
		</AppBar>
	);
}

export default Navbar;

import React, { useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import Link, { NextLinkComposed } from './Link'
import { Avatar, Button } from '@mui/material';
import { stringAvatar } from '../utils/functions';
import { DialogContext } from './DialogContainer';
import { SessionContext } from './Session';
import UsuarioDetalle from './UsuarioDetalle';

const settings = ['Ver cuenta', 'Cerrar sesión'];

const Navbar = ({dashboard}) => {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const {openDialog} = useContext(DialogContext)
	const {usuario} = useContext(SessionContext)

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleOpenDialog = () => {
		handleCloseUserMenu()
		openDialog({
			title: 'Ver usuario',
			data: data.usuario,
			view: <UsuarioDetalle/>
		})
	}

	return (
		<AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} color={dashboard ? 'primary' : 'secondary'}>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						style={{userSelect: 'none'}}
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						Videogamex
					</Typography>

					<Box flexGrow={1} display="flex" justifyContent="right" gap={5}>
						{
							!!usuario && usuario.tipo === 'admin' && (
								<Button
									variant="outlined"
									color={dashboard ? "inherit" : "primary"}
									component={Link}
									noLinkStyle
									href={dashboard ? "/" : "/dashboard/productos"}
								>
									{dashboard ? "Ir a la tienda" : "Ir al dashboard"}
								</Button>
							)
						}
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} color="inherit">
								<SettingsIcon/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem onClick={ handleOpenDialog }>
								<Typography textAlign="center">Ver cuenta</Typography>
							</MenuItem>
							<MenuItem onClick={handleCloseUserMenu}>
								<Typography textAlign="center">Cerrar sesión</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Navbar
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
import MultiDialog from "../components/MultiDialog";
import NavbarDashboard from "../components/NavbarDashboard";
import Sidebar from "../components/Sidebar";
import UsuarioDetalle from "../components/Usuarios/UsuarioDetalle";
import UsuarioForm from "../components/Usuarios/UsuarioForm";
import { useAuth } from "../providers/AuthProvider";
import MultiDialogProvider from "../providers/MultiDialogProvider";
import { emptyUsuario } from "../utils/empy-entities";

function Dashboard() {
	return (
		<Box display={"flex"}>
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, px: 10, color: grey[800] }}>
				<MultiDialogProvider initialValue={emptyUsuario}>
					<NavbarDashboard />
					<MultiDialog components={[UsuarioDetalle, UsuarioForm]} />
				</MultiDialogProvider>
				<Stack spacing={3} sx={{ pb: 8 }}>
					<Outlet />
				</Stack>
			</Box>
		</Box>
	);
}

export default Dashboard;

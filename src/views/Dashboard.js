import { Box, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarDashboard from "../components/NavbarDashboard";
import Sidebar from "../components/Sidebar";
import UsuarioDialog from "../components/Usuarios/UsuarioDialog";
import { useDialog } from "../hooks/useDialog";
import { useSnackbar } from "../hooks/useSnackbar";
import { useAuth } from "../providers/AuthProvider";

function Dashboard() {
	const [selected, setSelected] = useState(null);
	const usuarioDialog = useDialog({ open: false, view: "detalle" });
	const feedback = useSnackbar({ open: false, message: "" });
	const { usuario } = useAuth();

	const handleOpenDialog = (id, view = "detalle") => {
		setSelected(id);
		usuarioDialog.open(view);
	};

	const handleFeedback = (message) => {
		feedback.show(message);
	};

	return (
		<Box display={"flex"}>
			<Sidebar />
			<Box component="main" sx={{ flexGrow: 1, px: 10, color: grey[800] }}>
				<NavbarDashboard openDialog={() => handleOpenDialog(usuario.data.id)} />
				<UsuarioDialog
					id={selected}
					view={usuarioDialog.data.view}
					onChange={usuarioDialog.handleView}
					onSave={handleFeedback}
					dialogProps={{ onClose: usuarioDialog.close, open: usuarioDialog.data.open }}
				/>
				<Stack spacing={3} sx={{ pb: 8 }}>
					<Outlet />
				</Stack>
			</Box>
		</Box>
	);
}

export default Dashboard;

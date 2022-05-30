import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Home from "./views/Home";
import Productos from "./views/Dashboard/Productos";
import Categorias from "./views/Dashboard/Categorias";
import Usuarios from "./views/Dashboard/Usuarios";
import HistorialDeVentas from "./views/Dashboard/HistorialDeVentas";

import "./App.css";
import NotFound from "./views/NotFound";
import AuthProvider from "./providers/AuthProvider";
import RedirectIfLogged from "./components/RedirectIfLogged";
import ProtectedRoute from "./components/ProtectedRoute";
import { Chip } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import "moment/locale/es";
import { ConfirmProvider } from "material-ui-confirm";
import ResumenDeIngresos from "./views/Dashboard/ResumenDeIngresos";

function App() {
	return (
		<LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={"es-ES"}>
			<AuthProvider>
				<ConfirmProvider
					defaultOptions={{
						title: "Advertencia",
						description: "¿Está seguro que desea realizar esta acción?",
						confirmationText: "Aceptar",
						cancellationText: "Cancelar",
						confirmationButtonProps: {
							color: "primary"
						},
						cancellationButtonProps: {
							color: "error"
						},
						confirmaText: "Aceptar",
						cancelText: "Cancelar"
					}}
				>
					<Routes>
						<Route
							index
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path="login"
							element={
								<RedirectIfLogged>
									<Login />
								</RedirectIfLogged>
							}
						/>
						<Route
							path="dashboard"
							element={
								<ProtectedRoute requireAdmin={true}>
									<Dashboard />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate to="productos" replace />} />
							<Route path="productos" element={<Productos />} />
							<Route path="categorias" element={<Categorias />} />
							<Route path="usuarios" element={<Usuarios />} />
							<Route path="historial-de-ventas" element={<HistorialDeVentas />} />
							<Route path="resumen-de-ingresos" element={<ResumenDeIngresos />} />
						</Route>
						<Route path="*" element={<NotFound />} />
					</Routes>
					<Chip
						label="v0.2.2"
						sx={{
							position: "fixed",
							bottom: 20,
							left: 20,
							bgcolor: "#111",
							color: "white",
							opacity: 0.8,
							userSelect: "none",
							zIndex: (theme) => theme.zIndex.drawer + 1
						}}
					/>
				</ConfirmProvider>
			</AuthProvider>
		</LocalizationProvider>
	);
}

export default App;

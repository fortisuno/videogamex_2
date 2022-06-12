import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useData } from "../../hooks/useData";
import HistorialDeVentasDetalle from "./HistorialDeVentasDetalle";
import moment from "moment";

const emptyVenta = {
	metodoPago: "",
	cambio: 0,
	total: 0,
	pago: 0,
	usuarioId: "",
	productos: []
};

function HistorialDeVentasDialog({ id, dialogProps }) {
	const emptyData = { ...emptyVenta, fecha: moment().toDate() };
	const dialog = useData({
		id,
		path: "/ventas",
		emptyData
	});
	const { onClose } = dialogProps;

	return (
		<Dialog
			maxWidth="sm"
			sx={{ [`& .MuiDialog-paper`]: { borderRadius: 3 } }}
			TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
			fullWidth
			{...dialogProps} // onClose, open, ...
		>
			<DialogTitle>Detalle venta</DialogTitle>
			<DialogContent>
				<HistorialDeVentasDetalle data={dialog.data} loading={dialog.loading} />
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cerrar</Button>
			</DialogActions>
		</Dialog>
	);
}

export default HistorialDeVentasDialog;

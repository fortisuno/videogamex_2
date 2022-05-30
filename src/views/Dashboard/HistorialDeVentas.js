import { Alert, AlertTitle, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/DataTable";
import MultiDialog from "../../components/MultiDialog";
import HistorialDeVentasDetalle from "../../components/HistorialDeVentas/HistorialDeVentasDetalle";
import HistorialDeVentasForm from "../../components/HistorialDeVentas/HistorialDeVentasForm";
import HistorialDeVentasRow from "../../components/HistorialDeVentas/HistorialDeVentasRow";
import HistorialDeVentasSearch from "../../components/HistorialDeVentas/HistorialDeVentasSearch";
import { useDialog } from "../../hooks/useDialog";
import { useFunctions } from "../../hooks/useFunctions";
import { useTable } from "../../hooks/useTable";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function HistorialDeVentas() {
	return (
		<MultiDialogProvider>
			<Typography variant="h3">Historial de ventas</Typography>
			<Alert sx={{ maxWidth: "50%", mx: "auto", mt: 10, borderRadius: 3 }} severity="warning">
				<AlertTitle>Aviso</AlertTitle>
				No hay datos registrados de este modulo
			</Alert>
		</MultiDialogProvider>
	);
}

export default HistorialDeVentas;

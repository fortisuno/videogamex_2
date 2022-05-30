import { Alert, AlertTitle, Typography } from "@mui/material";
import React from "react";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function ResumenDeIngresos() {
	return (
		<MultiDialogProvider>
			<Typography variant="h3">Resumen de ingresos</Typography>
			<Alert sx={{ maxWidth: "50%", mx: "auto", mt: 10, borderRadius: 3 }} severity="warning">
				<AlertTitle>Aviso</AlertTitle>
				No hay datos registrados de este modulo
			</Alert>
		</MultiDialogProvider>
	);
}

export default ResumenDeIngresos;

import { Typography } from "@mui/material";
import React from "react";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function ResumenDeIngresos() {
	return (
		<MultiDialogProvider>
			<Typography variant="h3">Resumen de ingresos</Typography>
		</MultiDialogProvider>
	);
}

export default ResumenDeIngresos;

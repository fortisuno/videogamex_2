import { Dialog } from "@mui/material";
import React from "react";
import { useMultiDialog } from "../providers/MultiDialogProvider";

function MultiDialog({ components, children, callback }) {
	const { dialog, closeDialog } = useMultiDialog();

	const DetalleComponent = components[0] || "div";
	const EditComponent = components[1] || "div";

	return (
		<Dialog
			onClose={closeDialog}
			open={dialog.open}
			maxWidth="sm"
			sx={{ [`& .MuiDialog-paper`]: { borderRadius: 3 } }}
			fullWidth
		>
			{dialog.mode === "detalle" ? <DetalleComponent /> : <EditComponent reload={callback} />}
		</Dialog>
	);
}

export default MultiDialog;

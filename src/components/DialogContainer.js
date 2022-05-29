import { Dialog } from "@mui/material";
import React from "react";

function DialogContainer({ handleClose, showDialog, children }) {
	return (
		<Dialog
			onClose={handleClose}
			open={showDialog}
			maxWidth="md"
			sx={{ [`& .MuiDialog-paper`]: { borderRadius: 3 } }}
			fullWidth
		>
			{children}
		</Dialog>
	);
}

export default DialogContainer;

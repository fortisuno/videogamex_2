import { Dialog } from "@mui/material";
import React from "react";

function PageDialog({ children, ...props }) {
	return (
		<Dialog
			maxWidth="md"
			sx={{ [`& .MuiDialog-paper`]: { borderRadius: 3 } }}
			TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
			fullWidth
			{...props} // onClose, open, ...
		>
			{children}
		</Dialog>
	);
}

export default PageDialog;

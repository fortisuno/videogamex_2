import { Dialog } from "@mui/material";
import React, { createContext, useContext } from "react";

const DialogContext = createContext();

function DialogProvider({ dialog, children }) {
	return (
		<DialogContext.Provider value={dialog}>
			<Dialog
				onClose={dialog.handleClose}
				open={dialog.showDialog}
				maxWidth="sm"
				sx={{ [`& .MuiDialog-paper`]: { borderRadius: 3 } }}
				fullWidth
			>
				{children}
			</Dialog>
		</DialogContext.Provider>
	);
}

export function useDialogContext() {
	return useContext(DialogContext);
}

export default DialogProvider;

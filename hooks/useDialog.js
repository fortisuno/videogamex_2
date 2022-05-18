import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import { usePageData } from "./usePageData";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
	const [dialog, setDialog] = useState({
		open: false,
		titulo: "",
		updated: false,
		content: null
	});

	const handleCloseDialog = () => {
		setDialog({
			open: false,
			titulo: dialog.titulo,
			updated: false,
			content: dialog.content
		});
	};

	const handleOpenDialog = ({ titulo, content, updated = false }) => {
		setDialog({ titulo, content, updated, open: true });
	};

	return (
		<DialogContext.Provider
			value={{
				...dialog,
				handleCloseDialog,
				handleOpenDialog
			}}
		>
			<Dialog onClose={handleCloseDialog} open={dialog.open} maxWidth="md" fullWidth>
				<DialogTitle variant="h4" textAlign={"center"} sx={{ pb: 5 }}>
					{dialog.titulo}
				</DialogTitle>
				<DialogContent>{dialog.content}</DialogContent>
			</Dialog>
			{children}
		</DialogContext.Provider>
	);
};

export const useDialog = () => {
	return useContext(DialogContext);
};

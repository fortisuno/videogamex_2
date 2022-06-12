import { useState } from "react";

export function useDialog(initialProps) {
	const [dialog, setDialog] = useState(initialProps);

	const handleCloseDialog = (event, reason) => {
		if (reason === "backdropClick") return;
		setDialog((prev) => ({ ...prev, open: false }));
	};

	const handleOpenDialog = (view = initialProps.view) => {
		setDialog({ open: true, view });
	};

	const handleViewDialog = (view) => {
		setDialog((prev) => ({ ...prev, view }));
	};

	return {
		data: dialog,
		open: handleOpenDialog,
		close: handleCloseDialog,
		handleView: handleViewDialog
	};
}

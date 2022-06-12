import { useState } from "react";

export const useSnackbar = (initialState) => {
	const [snackbar, setSnackbar] = useState(initialState);

	const handleOpen = (message) => {
		setSnackbar({ open: true, message });
	};

	const handleClose = () => {
		setSnackbar({ ...snackbar, open: false });
	};

	return {
		open: snackbar.open,
		message: snackbar.message,
		show: handleOpen,
		onClose: handleClose
	};
};

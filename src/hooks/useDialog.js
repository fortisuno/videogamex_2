import { useState } from "react";

export function useDialog() {
	const [showDialog, setShowDialog] = useState(false);
	const [loading, setLoading] = useState(true);
	const [content, setContent] = useState({});

	const openDialog = () => {
		setShowDialog(true);
		setLoading(true);
	};

	const closeDialog = () => {
		setShowDialog(false);
	};

	const handleContent = (data) => {
		setContent(data);
	};

	const stopLoading = () => {
		setLoading(false);
	};

	return { showDialog, content, loading, openDialog, closeDialog, handleContent, stopLoading };
}

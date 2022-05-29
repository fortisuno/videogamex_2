import { Box, CircularProgress } from "@mui/material";
import React from "react";

function Loading() {
	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				height: "100vh",
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<CircularProgress />
		</Box>
	);
}

export default Loading;

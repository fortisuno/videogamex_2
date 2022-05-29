import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function LoadAnimation() {
	return (
		<Box
			sx={{
				position: "absolute",
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				bgcolor: "white",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 100
			}}
		>
			<CircularProgress />
		</Box>
	);
}

export default LoadAnimation;

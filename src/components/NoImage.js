import { VisibilityOff } from "@mui/icons-material";
import { Box } from "@mui/material";
import React from "react";

function NoImage({ height = "100%" }) {
	return (
		<Box width={"100%"} pt={height} position={"relative"}>
			<Box
				position={"absolute"}
				top={0}
				left={0}
				right={0}
				bottom={0}
				backgroundColor="#fafafa"
				display="flex"
				justifyContent={"center"}
				alignItems="center"
			>
				<VisibilityOff fontSize="large" />
			</Box>
		</Box>
	);
}

export default NoImage;

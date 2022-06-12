import { Button, TableCell, Typography } from "@mui/material";
import React from "react";
function ButtonCell({ text, disabled, callback }) {
	return (
		<TableCell sx={{ textAlign: "center", maxWidth: "100px" }}>
			<Button disabled={disabled} sx={{ textTransform: "lowercase" }} onClick={callback}>
				<Typography noWrap variant="body2">
					{text}
				</Typography>
			</Button>
		</TableCell>
	);
}

export default ButtonCell;

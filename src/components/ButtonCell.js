import { Button, TableCell } from "@mui/material";
import React from "react";
function ButtonCell({ text, disabled, callback }) {
	return (
		<TableCell sx={{ textAlign: "center" }}>
			<Button style={{ textTransform: "lowercase" }} disabled={disabled} onClick={callback}>
				{text}
			</Button>
		</TableCell>
	);
}

export default ButtonCell;

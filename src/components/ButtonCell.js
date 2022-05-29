import { Button, TableCell } from "@mui/material";
import React from "react";
function ButtonCell({ text, callback }) {
	return (
		<TableCell sx={{ textAlign: "center" }}>
			<Button style={{ textTransform: "lowercase" }} onClick={callback}>
				{text}
			</Button>
		</TableCell>
	);
}

export default ButtonCell;

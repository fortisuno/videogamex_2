import { Delete } from "@mui/icons-material";
import { IconButton, TableCell, Tooltip } from "@mui/material";
import React from "react";

function IconButtonCell({ text, disabled, callback }) {
	return (
		<TableCell sx={{ textAlign: "center" }}>
			<Tooltip title={"Eliminar " + text}>
				<IconButton color="error" disabled={disabled} onClick={callback}>
					<Delete />
				</IconButton>
			</Tooltip>
		</TableCell>
	);
}

export default IconButtonCell;

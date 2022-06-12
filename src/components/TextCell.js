import { TableCell } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

function TextCell({ text, disabled }) {
	const style = disabled ? { color: grey[400], userSelect: "none" } : {};
	return <TableCell sx={{ textAlign: "center", ...style }}>{text}</TableCell>;
}

export default TextCell;

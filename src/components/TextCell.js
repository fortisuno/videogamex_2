import { TableCell } from "@mui/material";
import React from "react";

function TextCell({ text }) {
	return <TableCell sx={{ textAlign: "center" }}>{text}</TableCell>;
}

export default TextCell;

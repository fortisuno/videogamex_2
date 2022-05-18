import { Delete } from "@mui/icons-material";
import { Button, Chip, IconButton, TableCell, Tooltip } from "@mui/material";
import React from "react";

const TableBodyCell = ({ text = "", variant = "text", onClick }) => {
	return (
		<TableCell sx={{ textAlign: "center" }}>
			{variant === "text" ? (
				text
			) : variant === "button" ? (
				<Button style={{ textTransform: "lowercase" }} onClick={onClick}>
					{text}
				</Button>
			) : variant === "iconButton" ? (
				<Tooltip title={"Eliminar " + text}>
					<IconButton color="error" onClick={onClick}>
						<Delete />
					</IconButton>
				</Tooltip>
			) : variant === "badge" ? (
				<Chip label={text} color={text === "admin" ? "success" : "default"}/>
			) : null}
		</TableCell>
	);
};

export default TableBodyCell;

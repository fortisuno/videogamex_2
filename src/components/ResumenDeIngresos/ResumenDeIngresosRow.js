import { TableRow } from "@mui/material";
import React from "react";
import ButtonCell from "../ButtonCell";
import TextCell from "../TextCell";

function ResumenDeIngresosRow({ anio, total }) {
	return (
		<TableRow>
			<TextCell text={anio} />
			<TextCell text={`$ ${total.toFixed(2)}`} />
		</TableRow>
	);
}

export default ResumenDeIngresosRow;

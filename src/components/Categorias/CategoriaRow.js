import { TableRow } from "@mui/material";
import React from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function CategoriaRow({ id, titulo, categoria }) {
	const { openDialog, loadData } = useMultiDialog();
	const { getCategoriaDetalle } = useFunctions();

	const handleShowDetalle = () => {
		openDialog("detalle");
		loadData(getCategoriaDetalle, id);
	};

	return (
		<TableRow>
			<ButtonCell text={id} callback={handleShowDetalle} />
			<TextCell text={titulo} />
			<IconButtonCell text={id} />
		</TableRow>
	);
}

export default CategoriaRow;

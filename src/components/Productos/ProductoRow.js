import { TableRow } from "@mui/material";
import React from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function ProductoRow({ id, titulo, categoria }) {
	const { openDialog, loadData } = useMultiDialog();
	const { getProductoDetalle } = useFunctions();

	const handleShowDetalle = () => {
		openDialog("detalle");
		loadData(getProductoDetalle, id);
	};

	return (
		<TableRow>
			<ButtonCell text={id} callback={handleShowDetalle} />
			<TextCell text={titulo} />
			<TextCell text={categoria.titulo} />
			<IconButtonCell text={id} />
		</TableRow>
	);
}

export default ProductoRow;

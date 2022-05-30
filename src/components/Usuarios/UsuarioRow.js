import { TableRow } from "@mui/material";
import React from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function UsuarioRow({ id, Nombre, Usuario }) {
	const { openDialog, loadData } = useMultiDialog();
	const { getUsuarioDetalle } = useFunctions();

	const handleShowDetalle = () => {
		openDialog("detalle");
		loadData(getUsuarioDetalle, id);
	};

	return (
		<TableRow>
			<ButtonCell text={id} callback={handleShowDetalle} />
			<TextCell text={Nombre} />
			<IconButtonCell text={id} />
		</TableRow>
	);
}

export default UsuarioRow;

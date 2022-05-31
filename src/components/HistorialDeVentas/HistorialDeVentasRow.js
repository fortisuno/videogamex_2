import { TableRow } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useDataContext } from "../../providers/DataProvider";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function HistorialDeVentasRow({ id, usuario, total = 0 }) {
	const { openDialog, loadData } = useMultiDialog();
	const [disabled, setDisabled] = useState(false);
	const { getVentaDetalle, getVentas, deleteVenta } = useFunctions();
	const { loadData: refresh } = useDataContext();
	const confirm = useConfirm();

	const handleShowDetalle = () => {
		openDialog("detalle");
		loadData(getVentaDetalle, id);
	};

	const handleDelete = () => {
		confirm({
			description: `¿Estas seguro de eliminar la venta ${id}?`
		})
			.then(async () => {
				// do something
				try {
					const result = await deleteVenta({ id });
					console.log(result.data);
					setDisabled(true);
					refresh(getVentas);
				} catch (error) {
					throw error;
				}
			})
			.catch((error) => {
				// do something
				console.log(error);
			});
	};
	return (
		<TableRow>
			<ButtonCell text={id} callback={handleShowDetalle} />
			<TextCell text={usuario} />
			<TextCell text={`$ ${total.toFixed(2)}`} />
			<IconButtonCell text={id} callback={handleDelete} />
		</TableRow>
	);
}

export default HistorialDeVentasRow;

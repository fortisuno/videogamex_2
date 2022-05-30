import { Box, TableRow, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React, { useState } from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useDataContext } from "../../providers/DataProvider";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function ProductoRow({ id, titulo }) {
	const { openDialog, loadData } = useMultiDialog();
	const [disabled, setDisabled] = useState(false);
	const { getProductoDetalle, getProductos, deleteProducto } = useFunctions();
	const { loadData: refresh } = useDataContext();
	const confirm = useConfirm();

	const handleShowDetalle = () => {
		openDialog("detalle");
		loadData(getProductoDetalle, id);
	};

	const handleDelete = () => {
		confirm({
			description: `¿Estas seguro de eliminar el producto ${id}?`
		})
			.then(async () => {
				// do something
				try {
					const result = await deleteProducto({ id });
					console.log(result.data);
					setDisabled(true);
					await refresh(getProductos);
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
			<ButtonCell text={id} disabled={disabled} callback={handleShowDetalle} />
			<TextCell text={titulo} />
			<IconButtonCell text={id} disabled={disabled} callback={handleDelete} />
		</TableRow>
	);
}

export default ProductoRow;

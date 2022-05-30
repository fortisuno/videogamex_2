import { TableRow } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useDataContext } from "../../providers/DataProvider";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function CategoriaRow({ id, titulo }) {
	const { openDialog, loadData } = useMultiDialog();
	const { getCategoriaDetalle, getCategorias, deleteCategoria } = useFunctions();
	const { loadData: refresh } = useDataContext();
	const confirm = useConfirm();

	const handleShowDetalle = () => {
		openDialog("detalle");
		loadData(getCategoriaDetalle, id);
	};

	const handleDelete = () => {
		confirm({
			description: `¿Estas seguro de eliminar la categoría ${id}?`
		})
			.then(async () => {
				// do something
				try {
					const result = await deleteCategoria({ id });
					console.log(result.data);
				} catch (error) {
					console.log(error);
				} finally {
					await refresh(getCategorias);
				}
			})
			.catch(() => {
				// do something
			});
	};

	return (
		<TableRow>
			<ButtonCell text={id} callback={handleShowDetalle} />
			<TextCell text={titulo} />
			<IconButtonCell text={id} callback={handleDelete} />
		</TableRow>
	);
}

export default CategoriaRow;

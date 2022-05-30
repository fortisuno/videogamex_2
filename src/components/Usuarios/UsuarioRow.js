import { TableRow } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useDataContext } from "../../providers/DataProvider";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function UsuarioRow({ id, displayName, role }) {
	const { openDialog, loadData } = useMultiDialog();
	const { getUsuarioDetalle, getUsuarios, deleteUsuario } = useFunctions();
	const { loadData: refresh } = useDataContext();
	const confirm = useConfirm();

	const handleShowDetalle = () => {
		openDialog("detalle");
		loadData(getUsuarioDetalle, id);
	};

	const handleDelete = () => {
		confirm({
			description: `¿Estas seguro de eliminar el usuario ${id}?`
		})
			.then(async () => {
				// do something
				try {
					const result = await deleteUsuario({ id });
					console.log(result.data);
				} catch (error) {
					console.log(error);
				} finally {
					await refresh(getUsuarios);
				}
			})
			.catch(() => {
				// do something
			});
	};

	return (
		<TableRow>
			<ButtonCell text={id} callback={handleShowDetalle} />
			<TextCell text={displayName} />
			<TextCell text={role} />
			<IconButtonCell text={id} callback={handleDelete} />
		</TableRow>
	);
}

export default UsuarioRow;

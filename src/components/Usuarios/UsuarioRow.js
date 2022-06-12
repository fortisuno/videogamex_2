import { TableRow, Tooltip } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { useFunctions } from "../../hooks/useFunctions";
import { useDataContext } from "../../providers/DataProvider";
import { useMultiDialog } from "../../providers/MultiDialogProvider";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";
import { useAuth } from "../../providers/AuthProvider";
import axios from "axios";

function UsuarioRow({ data, openDialog, onDelete }) {
	const { usuario } = useAuth();
	const { id, displayName, role } = data;
	const confirm = useConfirm();

	const handleDelete = () => {
		confirm({
			description: `¿Estas seguro de eliminar a ${displayName}?`
		}).then(() => {
			axios
				.delete(process.env.REACT_APP_API_URL + "/usuarios/delete/" + id)
				.then((response) => {
					onDelete(response.data.message, true);
				})
				.catch(({ response }) => {
					onDelete(response.data.message, false);
				});
		});
	};

	const disabled = data.id === usuario.data.id;

	return disabled ? (
		<Tooltip title="Usuario actual" placement="left" arrow>
			<TableRow>
				<ButtonCell text={id} disabled callback={openDialog} />
				<TextCell disabled text={displayName} />
				<TextCell disabled text={role} />
				<IconButtonCell text={id} disabled callback={handleDelete} />
			</TableRow>
		</Tooltip>
	) : (
		<TableRow>
			<ButtonCell text={id} callback={openDialog} />
			<TextCell text={displayName} />
			<TextCell text={role} />
			<IconButtonCell text={id} callback={handleDelete} />
		</TableRow>
	);
}

export default UsuarioRow;

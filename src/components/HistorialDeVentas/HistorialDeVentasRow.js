import { TableRow } from "@mui/material";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function HistorialDeVentasRow({ data, openDialog, onDelete }) {
	const { id, usuario, total = 0 } = data;
	const confirm = useConfirm();

	const handleDelete = () => {
		confirm({
			description: `¿Estas seguro de eliminar la venta ${id}?`
		}).then(() => {
			axios
				.delete(process.env.REACT_APP_API_URL + "/ventas/delete/" + id)
				.then((response) => {
					onDelete(response.data.message, true);
				})
				.catch(({ response }) => {
					onDelete(response.data.message, false);
				});
		});
	};
	return (
		<TableRow>
			<ButtonCell text={id} callback={openDialog} />
			<TextCell text={usuario} />
			<TextCell text={`$ ${total.toFixed(2)}`} />
			<IconButtonCell text={id} callback={handleDelete} />
		</TableRow>
	);
}

export default HistorialDeVentasRow;

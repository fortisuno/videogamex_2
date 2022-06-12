import { TableRow } from "@mui/material";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import ButtonCell from "../ButtonCell";
import IconButtonCell from "../IconButtonCell";
import TextCell from "../TextCell";

function ProductoRow({ data, openDialog, onDelete }) {
	const { id, titulo, stock } = data;
	const confirm = useConfirm();

	const handleDelete = () => {
		confirm({
			description: `¿Estas seguro de eliminar el producto ${id}?`
		}).then(() => {
			axios
				.delete(process.env.REACT_APP_API_URL + "/productos/delete/" + id)
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
			<TextCell text={titulo} />
			<TextCell text={stock} />
			<IconButtonCell text={id} callback={handleDelete} />
		</TableRow>
	);
}

export default ProductoRow;

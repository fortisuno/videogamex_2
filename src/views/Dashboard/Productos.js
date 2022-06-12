import { Add } from "@mui/icons-material";
import { Button, Paper, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import ProductoDialog from "../../components/Productos/ProductoDialog";
import ProductoRow from "../../components/Productos/ProductoRow";
import ProductoSearch from "../../components/Productos/ProductoSearch";
import { useDialog } from "../../hooks/useDialog";
import { useFetch } from "../../hooks/useFetch";
import { useSnackbar } from "../../hooks/useSnackbar";

function Productos() {
	const initialRequest = { path: "/productos", params: { size: 5 } };
	const [request, setRequest] = useState(initialRequest);
	const [selected, setSelected] = useState(null);
	const productoDialog = useDialog({ open: false, view: "detalle" });
	const feedback = useSnackbar({ open: false, message: "" });
	const page = useFetch(request);

	const filterData = (props) => {
		const { search, categoriaId, ...pageParams } = request.params;
		const filter = { ...pageParams };

		!!props.search && (filter.search = props.search.toLowerCase().trim());
		props.categoriaId !== "todas" && (filter.categoriaId = props.categoriaId);

		setRequest({ path: request.path, params: filter });
	};

	const refreshPage = () => {
		setRequest(initialRequest);
	};

	const handleSizeChange = ({ target }) => {
		setRequest({ path: request.path, params: { ...request.params, page: 0, size: target.value } });
	};

	const handlePageChange = (event, newPage) => {
		setRequest({ path: request.path, params: { ...request.params, page: newPage } });
	};

	const handleOpenDialog = (id, view = "detalle") => {
		setSelected(id);
		productoDialog.open(view);
	};

	const handleFeedback = (message, refresh) => {
		if (refresh) {
			setRequest(initialRequest);
			setSelected(null);
		}
		feedback.show(message);
	};

	return (
		<React.Fragment>
			<Typography variant="h3">Productos</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<ProductoSearch callback={filterData}>
					<Button
						variant="contained"
						sx={{
							borderRadius: 100,
							height: "55.97px",
							minWidth: "0px",
							width: "55.97px",
							p: 0
						}}
						onClick={() => handleOpenDialog(null, "agregar")}
					>
						<Add />
					</Button>
				</ProductoSearch>
				<DataTable
					headers={["Id", "Titulo", "Stock", "Eliminar"]}
					loading={page.loading}
					pagination={{
						page: !!page.data ? page.data.page : 0,
						size: !!page.data ? page.data.size : 5,
						count: !!page.data ? page.data.count : 0,
						sizeOptions: [5, 10, 20, 50, 100],
						handleSize: handleSizeChange,
						handlePage: handlePageChange
					}}
				>
					{!!page.data &&
						page.data.content.map((item, idx) => (
							<ProductoRow
								key={idx}
								data={item}
								openDialog={() => handleOpenDialog(item.id)}
								onDelete={handleFeedback}
							/>
						))}
				</DataTable>
			</Paper>
			<ProductoDialog
				id={selected}
				view={productoDialog.data.view}
				onChange={productoDialog.handleView}
				onSave={handleFeedback}
				dialogProps={{ onClose: productoDialog.close, open: productoDialog.data.open }}
			/>
			<Snackbar
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				open={feedback.open}
				onClose={feedback.onClose}
				autoHideDuration={3000}
				message={feedback.message}
			/>
		</React.Fragment>
	);
}

export default Productos;

import { Add } from "@mui/icons-material";
import { Button, Paper, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import HistorialDeVentasDialog from "../../components/HistorialDeVentas/HistorialDeVentasDialog";
import HistorialDeVentasRow from "../../components/HistorialDeVentas/HistorialDeVentasRow";
import HistorialDeVentasSearch from "../../components/HistorialDeVentas/HistorialDeVentasSearch";
import { useDialog } from "../../hooks/useDialog";
import { useFetch } from "../../hooks/useFetch";
import { useSnackbar } from "../../hooks/useSnackbar";

function HistorialDeVentas() {
	const initialRequest = { path: "/ventas", params: { size: 5 } };
	const [request, setRequest] = useState(initialRequest);
	const [selected, setSelected] = useState(null);
	const historialDeVentasDialog = useDialog({ open: false, view: "detalle" });
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
		historialDeVentasDialog.open(view);
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
			<Typography variant="h3">Historial de ventas</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<HistorialDeVentasSearch callback={filterData} />
				<DataTable
					headers={["Id", "Usuario", "Total de venta", "Eliminar"]}
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
							<HistorialDeVentasRow
								key={idx}
								data={item}
								openDialog={() => handleOpenDialog(item.id)}
								onDelete={handleFeedback}
							/>
						))}
				</DataTable>
			</Paper>
			<HistorialDeVentasDialog
				id={selected}
				view={historialDeVentasDialog.data.view}
				handleView={historialDeVentasDialog.handleView}
				dialogProps={{ onClose: historialDeVentasDialog.close, open: historialDeVentasDialog.data.open }}
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

export default HistorialDeVentas;

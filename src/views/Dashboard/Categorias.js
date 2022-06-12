import { Add } from "@mui/icons-material";
import { Button, Paper, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import CategoriaDialog from "../../components/Categorias/CategoriaDialog";
import CategoriaRow from "../../components/Categorias/CategoriaRow";
import CategoriaSearch from "../../components/Categorias/CategoriaSearch";
import DataTable from "../../components/DataTable";
import { useDialog } from "../../hooks/useDialog";
import { useFetch } from "../../hooks/useFetch";
import { useSnackbar } from "../../hooks/useSnackbar";

function Categorias() {
	const initialRequest = { path: "/categorias", params: { pagination: true, size: 5 } };
	const [request, setRequest] = useState(initialRequest);
	const [selected, setSelected] = useState(null);
	const categoriasDialog = useDialog({ open: false, view: "detalle" });
	const feedback = useSnackbar({ open: false, message: "" });
	const page = useFetch(request);

	const filterData = (props) => {
		const { search, ...pageParams } = request.params;
		const filter = { ...pageParams };

		!!props.search && (filter.search = props.search.toLowerCase().trim());

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
		categoriasDialog.open(view);
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
			<Typography variant="h3">Categorias</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<CategoriaSearch callback={filterData}>
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
				</CategoriaSearch>
				<DataTable
					headers={["Id", "Titulo", "Eliminar"]}
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
							<CategoriaRow
								key={idx}
								data={item}
								openDialog={() => handleOpenDialog(item.id)}
								onDelete={handleFeedback}
							/>
						))}
				</DataTable>
			</Paper>
			<CategoriaDialog
				id={selected}
				view={categoriasDialog.data.view}
				onChange={categoriasDialog.handleView}
				onSave={handleFeedback}
				dialogProps={{ onClose: categoriasDialog.close, open: categoriasDialog.data.open }}
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

export default Categorias;

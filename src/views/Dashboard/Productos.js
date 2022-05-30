import { Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/DataTable";
import MultiDialog from "../../components/MultiDialog";
import ProductoDetalle from "../../components/Productos/ProductoDetalle";
import ProductoForm from "../../components/Productos/ProductoForm";
import ProductoRow from "../../components/Productos/ProductoRow";
import ProductoSearch from "../../components/Productos/ProductoSearch";
import { useData } from "../../hooks/useData";
import { useFunctions } from "../../hooks/useFunctions";
import { useTable } from "../../hooks/useTable";
import { useDataContext } from "../../providers/DataProvider";
import MultiDialogProvider from "../../providers/MultiDialogProvider";
import { emptyProducto } from "../../utils/empy-entities";

function Productos() {
	const { data, loading, pagination, loadData, resetData } = useDataContext();
	const { getProductos } = useFunctions();

	useEffect(() => {
		loadData(getProductos);
		return () => {
			resetData();
		};
	}, [loadData, resetData]);

	const reloadData = useCallback(async () => {
		await loadData(getProductos);
	}, [loadData, resetData]);

	return (
		<MultiDialogProvider initialValue={emptyProducto}>
			<Typography variant="h3">Productos</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<ProductoSearch disableAddButton={false} />
				<DataTable
					headers={["Id", "Titulo", "Eliminar"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content) => (
						<ProductoRow key={content.id} {...content} />
					))}
				</DataTable>
			</Paper>
			<MultiDialog components={[ProductoDetalle, ProductoForm]} />
		</MultiDialogProvider>
	);
}

export default Productos;

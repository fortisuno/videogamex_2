import { Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/DataTable";
import MultiDialog from "../../components/MultiDialog";
import ProductoDetalle from "../../components/Productos/ProductoDetalle";
import ProductoForm from "../../components/Productos/ProductoForm";
import ProductoRow from "../../components/Productos/ProductoRow";
import ProductoSearch from "../../components/Productos/ProductoSearch";
import { useDialog } from "../../hooks/useDialog";
import { useFunctions } from "../../hooks/useFunctions";
import { useTable } from "../../hooks/useTable";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function Productos() {
	const { data, setData, loading, setLoading, pagination } = useTable();
	const { getProductos } = useFunctions();

	const loadData = useCallback(async () => {
		try {
			const result = await getProductos({});
			setData(result.data);
		} catch (error) {}
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, [setLoading, setData]);

	useEffect(() => {
		loadData();
		return () => {
			setData([]);
			setLoading(true);
		};
	}, [loadData]);

	return (
		<MultiDialogProvider>
			<Typography variant="h3">Productos</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<ProductoSearch />
				<DataTable
					headers={["Id", "Titulo", "Eliminar"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content) => (
					<ProductoRow key= {content.id} id= {content.id} {...content} />	
					))}
				</DataTable>
			</Paper>
			<MultiDialog components={[ProductoDetalle, ProductoForm]} />
		</MultiDialogProvider>
	);
}

export default Productos;

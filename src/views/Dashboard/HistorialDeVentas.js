import { Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/DataTable";
import MultiDialog from "../../components/MultiDialog";
import HistorialDeVentasDetalle from "../../components/HistorialDeVentas/HistorialDeVentasDetalle";
import HistorialDeVentasForm from "../../components/HistorialDeVentas/HistorialDeVentasForm";
import HistorialDeVentasRow from "../../components/HistorialDeVentas/HistorialDeVentasRow";
import HistorialDeVentasSearch from "../../components/HistorialDeVentas/HistorialDeVentasSearch";
import { useDialog } from "../../hooks/useDialog";
import { useFunctions } from "../../hooks/useFunctions";
import { useTable } from "../../hooks/useTable";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function HistorialDeVentas() {
	const { data, setData, loading, setLoading, pagination } = useTable();
	const { getHistorialDeVentas } = useFunctions();

	const loadData = useCallback(async () => {
		try {
			const result = await getHistorialDeVentas({});
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
			<Typography variant="h3">HistorialDeVentas</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<HistorialDeVentasSearch />
				<DataTable
					headers={["Id", "Titulo", "Eliminar"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content) => (
					<HistorialDeVentasRow key= {content.id} id= {content.id} {...content} />	
					))}
				</DataTable>
			</Paper>
			<MultiDialog components={[HistorialDeVentasDetalle, HistorialDeVentasForm]} />
		</MultiDialogProvider>
	);
}

export default HistorialDeVentas;

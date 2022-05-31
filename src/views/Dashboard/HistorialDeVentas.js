import { Alert, AlertTitle, Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/DataTable";
import MultiDialog from "../../components/MultiDialog";
import HistorialDeVentasDetalle from "../../components/HistorialDeVentas/HistorialDeVentasDetalle";
import HistorialDeVentasRow from "../../components/HistorialDeVentas/HistorialDeVentasRow";
import HistorialDeVentasSearch from "../../components/HistorialDeVentas/HistorialDeVentasSearch";
import { useDialog } from "../../hooks/useDialog";
import { useFunctions } from "../../hooks/useFunctions";
import { useTable } from "../../hooks/useTable";
import MultiDialogProvider from "../../providers/MultiDialogProvider";
import { emptyVenta } from "../../utils/empy-entities";
import { useDataContext } from "../../providers/DataProvider";

function HistorialDeVentas() {
	const { data, loading, pagination, loadData, resetData } = useDataContext();
	const { getVentas } = useFunctions();

	useEffect(() => {
		loadData(getVentas);
		return () => {
			resetData();
		};
	}, [loadData, resetData]);

	return (
		<MultiDialogProvider initialValue={emptyVenta}>
			<Typography variant="h3">Historial de ventas</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<HistorialDeVentasSearch />
				<DataTable
					headers={["Id", "Usuario", "Total de venta", "Eliminar"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content, idx) => (
						<HistorialDeVentasRow key={idx} {...content} />
					))}
				</DataTable>
			</Paper>
			<MultiDialog components={[HistorialDeVentasDetalle, null]} />
		</MultiDialogProvider>
	);
}

export default HistorialDeVentas;

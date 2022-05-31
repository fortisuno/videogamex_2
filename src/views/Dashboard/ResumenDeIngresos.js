import { Alert, AlertTitle, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import DataTable from "../../components/DataTable";
import ResumenDeIngresosRow from "../../components/ResumenDeIngresos/ResumenDeIngresosRow";
import { useFunctions } from "../../hooks/useFunctions";
import { useDataContext } from "../../providers/DataProvider";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function ResumenDeIngresos() {
	const { data, loading, pagination, loadData, resetData } = useDataContext();
	const { getIngresos } = useFunctions();

	useEffect(() => {
		loadData(getIngresos);
		return () => {
			resetData();
		};
	}, [loadData, resetData]);

	return (
		<React.Fragment>
			<Typography variant="h3">Resumen de ingresos</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<DataTable
					headers={["Fecha", "Total de venta"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content, idx) => (
						<ResumenDeIngresosRow key={idx} {...content} />
					))}
				</DataTable>
			</Paper>
		</React.Fragment>
	);
}

export default ResumenDeIngresos;

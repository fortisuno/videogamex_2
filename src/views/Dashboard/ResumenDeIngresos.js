import { Alert, AlertTitle, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import ResumenDeIngresosRow from "../../components/ResumenDeIngresos/ResumenDeIngresosRow";
import { useFetch } from "../../hooks/useFetch";
import { useFunctions } from "../../hooks/useFunctions";
import { useDataContext } from "../../providers/DataProvider";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function ResumenDeIngresos() {
	const initialRequest = { path: "/ventas-stats", params: { size: 5 } };
	const [request, setRequest] = useState(initialRequest);
	const page = useFetch(request);

	const handleSizeChange = ({ target }) => {
		setRequest({ path: request.path, params: { ...request.params, page: 0, size: target.value } });
	};

	const handlePageChange = (event, newPage) => {
		setRequest({ path: request.path, params: { ...request.params, page: newPage } });
	};

	return (
		<React.Fragment>
			<Typography variant="h3">Resumen de ingresos</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<DataTable
					headers={["Fecha", "Total de venta"]}
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
					{!!page.data && page.data.content.map((content, idx) => <ResumenDeIngresosRow key={idx} {...content} />)}
				</DataTable>
			</Paper>
		</React.Fragment>
	);
}

export default ResumenDeIngresos;

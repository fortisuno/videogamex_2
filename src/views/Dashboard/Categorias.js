import { Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/DataTable";
import MultiDialog from "../../components/MultiDialog";
import CategoriaDetalle from "../../components/Categorias/CategoriaDetalle";
import CategoriaForm from "../../components/Categorias/CategoriaForm";
import CategoriaRow from "../../components/Categorias/CategoriaRow";
import CategoriaSearch from "../../components/Categorias/CategoriaSearch";
import { useDialog } from "../../hooks/useDialog";
import { useFunctions } from "../../hooks/useFunctions";
import { useTable } from "../../hooks/useTable";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function Categorias() {
	const { data, setData, loading, setLoading, pagination } = useTable();
	const { getCategorias } = useFunctions();

	const loadData = useCallback(async () => {
		try {
			const result = await getCategorias({});
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
			<Typography variant="h3">Categorias</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<CategoriaSearch />
				<DataTable
					headers={["Id", "Titulo", "Eliminar"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content) => (
					<CategoriaRow key= {content.id} id= {content.id} {...content} />	
					))}
				</DataTable>
			</Paper>
			<MultiDialog components={[CategoriaDetalle, CategoriaForm]} />
		</MultiDialogProvider>
	);
}

export default Categorias;

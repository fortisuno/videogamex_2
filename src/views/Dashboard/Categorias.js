import { Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/DataTable";
import MultiDialog from "../../components/MultiDialog";
import CategoriaDetalle from "../../components/Categorias/CategoriaDetalle";
import CategoriaForm from "../../components/Categorias/CategoriaForm";
import CategoriaRow from "../../components/Categorias/CategoriaRow";
import CategoriaSearch from "../../components/Categorias/CategoriaSearch";
import { useFunctions } from "../../hooks/useFunctions";
import { useTable } from "../../hooks/useTable";
import MultiDialogProvider from "../../providers/MultiDialogProvider";
import { useData } from "../../hooks/useData";
import { emptyCategoria } from "../../utils/empy-entities";
import { useDataContext } from "../../providers/DataProvider";

function Categorias() {
	const { data, loading, pagination, loadData, resetData } = useDataContext();
	const { getCategorias } = useFunctions();

	useEffect(() => {
		loadData(getCategorias);
		return () => {
			resetData();
		};
	}, [loadData, resetData]);

	return (
		<MultiDialogProvider initialValue={emptyCategoria}>
			<Typography variant="h3">Categorias</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<CategoriaSearch />
				<DataTable
					headers={["Id", "Titulo", "Eliminar"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content, idx) => (
						<CategoriaRow key={idx} {...content} />
					))}
				</DataTable>
			</Paper>
			<MultiDialog components={[CategoriaDetalle, CategoriaForm]} />
		</MultiDialogProvider>
	);
}

export default Categorias;

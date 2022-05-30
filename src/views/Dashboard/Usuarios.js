import { Paper, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import DataTable from "../../components/DataTable";
import MultiDialog from "../../components/MultiDialog";
import UsuarioDetalle from "../../components/Usuarios/UsuarioDetalle";
import UsuarioForm from "../../components/Usuarios/UsuarioForm";
import UsuarioRow from "../../components/Usuarios/UsuarioRow";
import UsuarioSearch from "../../components/Usuarios/UsuarioSearch";
import { useDialog } from "../../hooks/useDialog";
import { useFunctions } from "../../hooks/useFunctions";
import { useTable } from "../../hooks/useTable";
import MultiDialogProvider from "../../providers/MultiDialogProvider";

function Usuarios() {
	const { data, setData, loading, setLoading, pagination } = useTable();
	const { getUsuarios } = useFunctions();

	const loadData = useCallback(async () => {
		try {
			const result = await getUsuarios({});
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
			<Typography variant="h3">Usuarios</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<UsuarioSearch />
				<DataTable
					headers={["Id", "Nombre_Completo", "Eliminar"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content) => (
					<UsuarioRow key= {content.id} id= {content.id} {...content} />	
					))}
				</DataTable>
			</Paper>
			<MultiDialog components={[UsuarioDetalle, UsuarioForm]} />
		</MultiDialogProvider>
	);
}

export default Usuarios;

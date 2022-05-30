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
import { useDataContext } from "../../providers/DataProvider";
import MultiDialogProvider from "../../providers/MultiDialogProvider";
import { emptyUsuario } from "../../utils/empy-entities";

function Usuarios() {
	const { data, loading, pagination, loadData, resetData } = useDataContext();
	const { getUsuarios } = useFunctions();

	useEffect(() => {
		loadData(getUsuarios);
		return () => {
			resetData();
		};
	}, [loadData, resetData]);

	return (
		<MultiDialogProvider initialValue={emptyUsuario}>
			<Typography variant="h3">Usuarios</Typography>
			<Paper sx={{ width: "100%", position: "relative", borderRadius: 3 }} elevation={4}>
				<UsuarioSearch />
				<DataTable
					headers={["Id", "Nombre completo", "Role", "Eliminar"]}
					loading={loading}
					pagination={pagination}
				>
					{data.map((content) => (
						<UsuarioRow key={content.id} {...content} />
					))}
				</DataTable>
			</Paper>
			<MultiDialog components={[UsuarioDetalle, UsuarioForm]} />
		</MultiDialogProvider>
	);
}

export default Usuarios;

import LayoutDashboard from "@components/layouts/LayoutDashboard";
import LoadingTable from "@components/LoadingTable";
import ProductoDetalle from "@components/productos/ProductoDetalle";
import ProductoSearch from "@components/productos/ProductoSearch";
import TableBodyCell from "@components/TableBodyCell";
import TableHeadCell from "@components/TableHeadCell";
import UsuarioSearch from "@components/usuarios/UsuarioSearch";
import {
	Alert,
	AlertTitle,
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Toolbar
} from "@mui/material";
import { auth } from "@utils/firebase";
import axios from "axios";
import { useDialog } from "hooks/useDialog";
import { usePageData } from "hooks/usePageData";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";

export const getServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	if (!session)
		return {
			redirect: {
				destination: "/login",
				permanent: false
			}
		};

		const usuarios = await axios.get(process.env.APIMASK + "/api/usuarios/");

	if (!usuarios.some(u => u.id === auth.currentUser.uid))
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		};

	const categorias = await axios.get(process.env.APIMASK + "/api/categorias");

	return {
		props: {
			layoutProps: {
				titulo: "Usuarios",
				query: ctx.query,
				apiPath: ctx.resolvedUrl.replace("dashboard", "api"),
				currentPage: "usuarios",
				extras: {}
			}
		}
	};
};

const Usuarios = () => {
	const pageData = usePageData();
	const dialog = useDialog();

	const {
		pagedItems,
		handleDeleteItem,
		handleSelectedItem,
		loadData,
		handleChangePage,
		handleChangeItemsPerPage,
		page,
		itemsPerPage
	} = pageData;

	useEffect(() => {
		loadData();
	}, [loadData]);

	const handleShowItemDetalle = (item) => {
		handleSelectedItem(item);
		dialog.handleOpenDialog({
			titulo: "Ver Producto",
			content: null
		});
	};

	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * itemsPerPage - pageData.data.length)
			: itemsPerPage - pageData.data.length;

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 3, position: "relative", borderRadius: 3 }} elevation={4}>
				{pageData.loading && <LoadingTable />}
				<Toolbar sx={{ py: 3 }}>
					<UsuarioSearch />
				</Toolbar>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableHeadCell titulo="Alias" />
								<TableHeadCell titulo="Nombre completo" />
								<TableHeadCell titulo="Correo" />
								<TableHeadCell titulo="Telefono" />
								<TableHeadCell titulo="Rol" />
							</TableRow>
						</TableHead>
						<TableBody>
							{pagedItems.map((row, row_idx) => (
								<TableRow key={row_idx}>
									<TableBodyCell text={row.alias} />
									<TableBodyCell
										text={`${row.nombre} ${row.apellidoPaterno} ${row.apellidoMaterno}`}
									/>
									<TableBodyCell text={row.correo} />
									<TableBodyCell text={row.telefono} />
									<TableBodyCell text={row.role} variant="badge" />
								</TableRow>
							))}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 73 * emptyRows
									}}
								>
									<TableCell colSpan={5}>
										{pageData.data.length == 0 && (
											<Alert
												sx={{ maxWidth: "50%", mx: "auto", borderRadius: 3 }}
												severity="warning"
											>
												<AlertTitle>
													<strong>Aviso</strong>
												</AlertTitle>
												No se encontraron mas usuarios
											</Alert>
										)}
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={pageData.data.length}
					rowsPerPage={itemsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeItemsPerPage}
				/>
			</Paper>
		</Box>
	);
};

Usuarios.getLayout = LayoutDashboard.getLayout;

export default Usuarios;

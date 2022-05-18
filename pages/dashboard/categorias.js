import CategoriaSearch from "@components/categorias/CategoriaSearch";
import LayoutDashboard from "@components/layouts/LayoutDashboard";
import LoadingTable from "@components/LoadingTable";
import TableBodyCell from "@components/TableBodyCell";
import TableHeadCell from "@components/TableHeadCell";
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

		const usuario = await axios.get(process.env.APIMASK + "/api/usuarios/" + auth.currentUser.uid);

	if (usuario.data.role !== "admin")
		return {
			redirect: {
				destination: "/",
				permanent: false
			}
		};

	return {
		props: {
			layoutProps: {
				titulo: "Categorias",
				query: ctx.query,
				apiPath: ctx.resolvedUrl.replace("dashboard", "api"),
				currentPage: "categorias",
				usuario: usuario.data,
				extras: {}
			}
		}
	};
};

const Categorias = () => {
	const pageData = usePageData();

	const {
		pagedItems,
		handleDeleteItem,
		loadData,
		handleChangePage,
		handleChangeItemsPerPage,
		page,
		itemsPerPage
	} = pageData;

	useEffect(() => {
		loadData();
	}, [loadData]);

	const emptyRows =
		page > 0
			? Math.max(0, (1 + page) * itemsPerPage - pageData.data.length)
			: itemsPerPage - pageData.data.length;

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 3, position: "relative", borderRadius: 3 }} elevation={4}>
				{pageData.loading && <LoadingTable />}
				<Toolbar sx={{ py: 3 }}>
					<CategoriaSearch />
				</Toolbar>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableHeadCell titulo="Id" />
								<TableHeadCell titulo="Titulo" />
								<TableHeadCell titulo="Eliminar" />
							</TableRow>
						</TableHead>
						<TableBody>
							{pagedItems.map((row, row_idx) => (
								<TableRow key={row_idx}>
									<TableBodyCell text={row.id} />
									<TableBodyCell text={row.titulo} />
									<TableBodyCell
										text={row.id}
										variant="iconButton"
										onClick={() => handleDeleteItem("categorias", row.id)}
									/>
								</TableRow>
							))}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 73 * emptyRows
									}}
								>
									<TableCell colSpan={3}>
										{pageData.data.length == 0 && (
											<Alert
												sx={{ maxWidth: "50%", mx: "auto", borderRadius: 3 }}
												severity="warning"
											>
												<AlertTitle>
													<strong>Aviso</strong>
												</AlertTitle>
												No se encontraron categorias
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

Categorias.getLayout = LayoutDashboard.getLayout;

export default Categorias;

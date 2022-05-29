import {
	Alert,
	AlertTitle,
	Box,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow
} from "@mui/material";
import React from "react";

function DataTable({ headers, loading, pagination, children }) {
	const emptyRows =
		pagination.page > 0
			? Math.max(0, (1 + pagination.page) * pagination.rowsPerPage - pagination.count)
			: pagination.rowsPerPage - pagination.count;
	return (
		<Box position="relative">
			{loading && (
				<Box
					sx={{
						position: "absolute",
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						bgcolor: "white",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						zIndex: (theme) => theme.zIndex.drawer - 1
					}}
				>
					<CircularProgress />
				</Box>
			)}
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{headers.map((column, idx) => (
								<TableCell sx={{ textAlign: "center" }} key={idx}>
									{column}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{children}
						{emptyRows > 0 && (
							<TableRow
								style={{
									height: 73 * emptyRows
								}}
							>
								<TableCell colSpan={4}>
									{(!loading && pagination.count) === 0 && (
										<Alert
											sx={{ maxWidth: "50%", mx: "auto", borderRadius: 3 }}
											severity="warning"
										>
											<AlertTitle>Aviso</AlertTitle>
											No hay datos registrados de este modulo
										</Alert>
									)}
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={pagination.rowsPerPageOptions}
				component="div"
				count={pagination.count}
				rowsPerPage={pagination.rowsPerPage}
				page={pagination.page}
				onPageChange={pagination.handleChangePage}
				onRowsPerPageChange={pagination.handleChangeRowsPerPage}
			/>
		</Box>
	);
}

export default DataTable;

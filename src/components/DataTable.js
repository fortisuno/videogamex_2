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
import LoadAnimation from "./LoadAnimation";

function DataTable({ headers, loading, pagination, children }) {
	const emptyRows =
		pagination.page > 0
			? Math.max(0, (1 + pagination.page) * pagination.size - pagination.count)
			: pagination.size - pagination.count;
	return (
		<Box position="relative">
			{loading && <LoadAnimation />}
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
									{!loading && pagination.count === 0 && (
										<Alert sx={{ maxWidth: "50%", mx: "auto", borderRadius: 3 }} severity="warning">
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
				rowsPerPageOptions={pagination.sizeOptions}
				component="div"
				count={pagination.count}
				rowsPerPage={pagination.size}
				page={pagination.page}
				onPageChange={pagination.handlePage}
				onRowsPerPageChange={pagination.handleSize}
			/>
		</Box>
	);
}

export default DataTable;

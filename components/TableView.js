import React, { useCallback, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CircularProgress, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import ProductoDialog from './ProductoDialog';

export default function TableView({
	loading,
	rows = [],
	headCells,
	handleOpen,
	page,
	rowsPerPage,
	handleChangePage,
	handleChangeRowsPerPage,
	editable = true,
	children}) {

  	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2, }}>
				<Toolbar sx={{ px: 10, py: 3 }}>
					{children}
				</Toolbar>
				{
					!loading ? (
						rows.length > 0 ? (
							<>
								<TableContainer>
									<Table>
										<TableHead>
										<TableRow>
											{
												headCells.map(hc => <TableCell align='center' key={hc.id}><b>{hc.title}</b></TableCell>)
											}
											<TableCell align='center'><b>Eliminar</b></TableCell>
										</TableRow>
										</TableHead>
										<TableBody>
										{
											rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
												.map((row, index) => (
													<TableRow hover tabIndex={-1} key={index} >
														{
															headCells.map((hc, i) => {
																return (!(i > 0) && editable)
																	? (
																		<TableCell align='center' key={i}>
																			<Button variant='text' style={{textTransform: 'lowercase'}} onClick={() => handleOpen(row)}>
																				{row[hc.id]}
																			</Button>
																		</TableCell>
																	) : <TableCell align="center" key={i}>{row[hc.id]}</TableCell>
																	
															})
														}
														<TableCell align="center">
															<Tooltip title={"Eliminar " + (row.slug || row.alias)}>
																<IconButton color="error">
																	<DeleteIcon />
																</IconButton>
															</Tooltip>
														</TableCell>
													</TableRow>
												))
											}
										{emptyRows > 0 && (
											<TableRow
												style={{
													height: (dense ? 33 : 53) * emptyRows,
												}}
											>
												<TableCell colSpan={6} />
											</TableRow>
										)}
										</TableBody>
									</Table>
								</TableContainer>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									component="div"
									count={rows.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
								/>
							</>
						) : (
							<Box width={'100%'} height="360px" display="center" alignItems="center" justifyContent="center">
							<Typography variant="h5" gutterBottom component="div">
								No se encontraron resultados
							</Typography>
							</Box>
						)
					) : (
						<Box width={'100%'} height="360px" display="center" alignItems="center" justifyContent="center">
							<CircularProgress/>
						</Box>
					)
				}
			</Paper>
		</Box>
	);
}

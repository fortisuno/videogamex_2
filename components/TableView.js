import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
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
import { DialogContext } from './DialogContainer';
import ProductoDetalle from './ProductoDetalle';
import { useTable } from '../hooks/useTable';
import { useFilteredData } from '../hooks/useFilteredData';
import { withRouter } from 'next/router';

const TableView = ({ loading, items, pagedItems, pagination, headCells, showDetails = true, children, router, detailView }) => {
	const {openDialog} = useContext(DialogContext);

	const handleOpenDialog = (producto) => {
		openDialog({
			title: 'Ver ' + router.query.module,
			data: producto,
			view: detailView
		})
	}

  	const emptyRows = pagination.page > 0 ? Math.max(0, (1 + pagination.page) * pagination.itemsPerPage - items.length) : 0;

  	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2, }}>
				<Toolbar sx={{ px: 10, py: 3 }}>
					{children}
				</Toolbar>
				{
					!loading ? (
						(!!items && items.length > 0) ? (
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
											pagedItems.map((item) => (
												<TableRow hover tabIndex={-1} key={item.slug || item.alias} >
													{
														headCells.map((hc, idx) => {
															return (idx == 0 && showDetails)
																? (
																	<TableCell align='center' key={`${item.slug || item.alias}_${hc.id}`}>
																		<Button variant='text' style={{textTransform: 'lowercase'}} onClick={() => handleOpenDialog(item)}>
																			{item[hc.id]}
																		</Button>
																	</TableCell>
																) : <TableCell align="center" key={`${item.slug}_${hc.id}`}>{item[hc.id]}</TableCell>
																
														})
													}
													<TableCell align="center">
														<Tooltip title={"Eliminar " + (item.slug || item.alias)}>
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
									count={items.length}
									rowsPerPage={pagination.itemsPerPage}
									page={pagination.page}
									onPageChange={pagination.handleChangePage}
									onRowsPerPageChange={pagination.handleChangeItemsPerPage}
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

export default withRouter(TableView)
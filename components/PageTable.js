import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Button, CircularProgress, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { height } from '@mui/system';
import { columns, forms, titles } from '../utils/config';
import { useFormik } from 'formik';
import { DialogContext } from './PageDialog';
import DetalleProductos from './DetalleProductos';
import axios from 'axios';
import { useRouter } from 'next/router';

const PageTable = ({data, loading, variant, categorias, detailed = true}) => {
	const [page, setPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [detailComponent, setDetailComponent] = useState(null);
	const dialog = useContext(DialogContext)
	const router = useRouter()

	const resetPage = useCallback(() => setPage(0), [setPage])
	const loadDetailComponent = useCallback((dc) => setDetailComponent(dc), [setDetailComponent])

	useEffect(() => {
		switch(variant) {
			case 'productos': loadDetailComponent(<DetalleProductos opciones={categorias}/>); break;
			case 'categorias': loadDetailComponent(<span>Categorias</span>); break;
			case 'usuarios': loadDetailComponent(<span>Usuarios</span>); break;
			case 'historial_de_ventas': loadDetailComponent(<span>Historial de ventas</span>); break;
		}
	}, [loadDetailComponent, variant])

	useEffect(() => {
		resetPage()
	}, [resetPage])

	const showDetails = (row) => {
		dialog.openDialog({
			title: 'Ver ' + titles[variant],
			data: row,
			edition: false,
			component: detailComponent
		})
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeItemsPerPage = ({target}) => {
		setItemsPerPage(parseInt(target.value, 10));
		setPage(0);
	};

	const filterItems = (arr) => {
		setItems(arr)
		setPage(0)
	}

	const handleDelete = (id) => {
		axios.delete(`/api/${variant}/${id}`)
		.then(() => {
			router.reload()
		})
	}

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * itemsPerPage - data.rows.length) : itemsPerPage - data.rows.length;

	return (
		<Box sx={{position: "relative"}}>
			{
				loading && (
					<Box
						sx={{ position: "absolute",
								top: 0, 
								left: 0,
								right: 0,
								bottom: 0,
								bgcolor: "#fff",
								zIndex: 10,
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
					>
						<CircularProgress/>
					</Box>
				)
			}
			<TableContainer>
				<Table>
					<TableHead>
					<TableRow>
						{
							data.headers.map((hc, idx) => <TableCell align='center' key={idx}><b>{columns[hc]}</b></TableCell>)
						}
						<TableCell align='center'><b>Eliminar</b></TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
						
						{
							data.rows.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage).map((item) => (
								<TableRow hover tabIndex={-1} key={item.id} >
									{
										data.headers.map((hc, idx) => {
											return (idx == 0 && detailed)
												? (
													<TableCell align='center' key={`${item.id}_${hc}`}>
														<Button variant='text' style={{textTransform: 'lowercase'}} onClick={() => showDetails(item)}>
															{item[hc]}
														</Button>
													</TableCell>
												) : <TableCell align="center" key={`${item.id}_${hc}`}>{item[hc]}</TableCell>
												
										})
									}
									<TableCell align="center">
										<Tooltip title={"Eliminar " + (item.id)}>
											<IconButton color="error" onClick={() => handleDelete(item.id)}>
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
									height: 73 * emptyRows,
								}}
							>
								<TableCell colSpan={data.headers.length + 1} />
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={data.rows.length}
				rowsPerPage={itemsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeItemsPerPage}
			/>
		</Box>
	)
}

export default PageTable
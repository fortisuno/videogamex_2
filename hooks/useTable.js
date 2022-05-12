import { useCallback, useEffect, useState } from "react"

export const useTable = (rows) => {
	const [filteredRows, setFilteredRows] = useState([])
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const initTable = useCallback((fr) => setFilteredRows(fr), [setFilteredRows])

	useEffect(() => {
		initTable(rows)
	}, [rows, initTable])

	const handleChangePage = useCallback((event, newPage) => {
		setPage(newPage);
	}, [setPage]);

	const handleChangeRowsPerPage = useCallback((event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}, [setPage, setRowsPerPage]);

	const filterRows = useCallback((filtered) => {
		setFilteredRows(filtered)
		setPage(0)
	}, [setFilteredRows])

	return {
		filteredRows, 
		filterRows,
		config: {
			page,
			rowsPerPage,
			handleChangePage,
			handleChangeRowsPerPage
	}}
}
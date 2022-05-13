import { useCallback, useEffect, useState } from "react"

export const useTable = (data) => {
	const [rows, setRows] = useState([])
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const initTable = useCallback((r) => setRows(r), [setRows])

	useEffect(() => {
		initTable(data)
	}, [data, initTable])

	const handleChangePage = useCallback((event, newPage) => {
		setPage(newPage);
	}, [setPage]);

	const handleChangeRowsPerPage = useCallback((event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}, [setPage, setRowsPerPage]);

	const filterRows = useCallback((filtered) => {
		setRows(filtered)
		setPage(0)
	}, [setRows])

	return {
		rows, 
		filterRows,
		pagination: {
			page,
			rowsPerPage,
			handleChangePage,
			handleChangeRowsPerPage
		}
	}
}
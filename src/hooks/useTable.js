import { useState } from "react";

export function useTable() {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [loading, setLoading] = useState(true);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = ({ target }) => {
		setRowsPerPage(parseInt(target.value, 10));
		setPage(0);
	};

	return {
		data: data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		setData,
		loading,
		setLoading,
		pagination: {
			rowsPerPageOptions: [5, 10, 25],
			count: data.length,
			rowsPerPage,
			page,
			handleChangePage,
			handleChangeRowsPerPage
		}
	};
}

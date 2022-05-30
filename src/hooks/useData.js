import { useCallback, useState } from "react";

export function useData(props = { paged: false }) {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [loading, setLoading] = useState(true);

	const loadData = useCallback(
		async (callback, props = {}) => {
			setLoading(true);
			try {
				const result = await callback(props);
				setData(result.data);
			} catch (error) {
				console.log(error);
			}
			setTimeout(() => {
				setLoading(false);
			}, 500);
		},
		[setLoading, setData]
	);

	const resetData = useCallback(() => {
		setData([]);
		setLoading(true);
		setPage(0);
		setRowsPerPage(5);
	}, [setData, setLoading, setPage, setRowsPerPage]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = ({ target }) => {
		setRowsPerPage(parseInt(target.value, 10));
		setPage(0);
	};

	return {
		data: props.paged ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : data,
		setData,
		loading,
		loadData,
		resetData,
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
import { useCallback, useEffect, useState } from "react";

export const useFilteredData = (data) => {
	const [items, setItems] = useState(data)
	const [page, setPage] = useState(0);
	const [pagedItems, setPagedItems] = useState([]);
	const [itemsPerPage, setItemsPerPage] = useState(5);

	const loadData = useCallback(arr => setItems(arr), [setItems])
	const loadPage = useCallback((arr) => setPagedItems(arr), [setPagedItems])

	useEffect(() => {
		loadData(data)
	}, [loadData, data])

	useEffect(() => {
		if(!!items) {
			loadPage(items.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage))
		}
	}, [page, items, itemsPerPage, loadPage])

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

	const resetItems = () => {
		setItems(data)
	}

	return {
		items,
		pagedItems,
		filterItems,
		pagination: { page, itemsPerPage, handleChangePage, handleChangeItemsPerPage },
		resetItems
	}
}
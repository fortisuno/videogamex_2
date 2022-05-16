import axios from "axios"
import { useRouter } from "next/router"
import { useCallback, useEffect, useRef, useState } from "react"

export const useFetch = (url) => {
	const [state, setState] = useState({data: null, loading: true, error: null})

	const fetchingData = useCallback((t) => setState(t), [setState])

	useEffect(() => {
		fetchingData(t => !t.loading ? {data: null, loading: true, error: null} : t)
		setTimeout(() => {
			axios.get(url)
				.then(({data}) => {
					setState({
						loading: false,
						error: null,
						data
					})
				})
		}, 500)
	}, [url, fetchingData])

	const filterRows = (filteredRows) => {
		setState(t => !t.loading ? {data: null, loading: true, error: null} : t)
		setTimeout(() => {
			setState({data: filteredRows, loading: false, error: null})
		}, 500)
	}

	return {table: state, filterRows}
}
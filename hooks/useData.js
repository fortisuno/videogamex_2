import { useEffect, useState } from "react"
import { data } from "../utils/appData";

export const useData = (slug) => {
	const [data, setData] = useState({});

	useEffect(() => {
		console.log(data.find((data) => data.slug === slug))
		setData(data.find((data) => data.slug === slug || {}));
	}, [slug])

	return data
}
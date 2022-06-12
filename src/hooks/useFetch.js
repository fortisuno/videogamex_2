import axios from "axios";

const { useState, useEffect, useCallback, useRef } = require("react");

export const useFetch = ({ path, params }) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		axios
			.get(process.env.REACT_APP_API_URL + path, { params })
			.then((response) => {
				setData(response.data);
			})
			.catch(({ response }) => {
				setError(response.data);
			})
			.finally(() => {
				setTimeout(() => {
					setLoading(false);
				}, 500);
			});
	}, [path, params]);

	return { data, error, loading };
};

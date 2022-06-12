import axios from "axios";

const { useState, useEffect, useRef } = require("react");

export const useData = ({ path, id, emptyData }) => {
	const [data, setData] = useState(emptyData);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setData(emptyData);
		if (!!id) {
			axios
				.get(process.env.REACT_APP_API_URL + path + "/" + id)
				.then((response) => {
					setData(response.data);
					setError(null);
				})
				.catch(({ response }) => {
					setError(response.data);
					setData(null);
				})
				.finally(() => {
					setTimeout(() => {
						setLoading(false);
					}, 500);
				});
		} else {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	}, [path, id]);

	return { data, error, loading };
};

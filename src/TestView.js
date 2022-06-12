import React, { useState } from "react";
import { useFetch } from "./hooks/useFetch";

function TestView() {
	const [request, setRequest] = useState({
		path: "/productos",
		params: { page: 0 }
	});
	const page = useFetch(request.path, request.params);
	return (
		<div>
			<h1>TestView</h1>
			<pre>{JSON.stringify(page.data, null, " ")}</pre>
		</div>
	);
}

export default TestView;

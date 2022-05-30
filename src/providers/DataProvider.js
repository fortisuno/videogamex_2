import React, { createContext } from "react";
import { useData } from "../hooks/useData";

const DataContext = createContext();

function DataProvider({ paged, children }) {
	const data = useData({ paged });
	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useDataContext() {
	return React.useContext(DataContext);
}

export default DataProvider;

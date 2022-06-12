import React, { createContext } from "react";
import { useDataLegacy } from "../hooks/useDataLegacy";

const DataContext = createContext();

function DataProvider({ paged, children }) {
	const data = useDataLegacy({ paged });
	return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useDataContext() {
	return React.useContext(DataContext);
}

export default DataProvider;

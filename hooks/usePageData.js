import { auth } from "@utils/firebase";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import { getSession } from "next-auth/react";
import { createContext, useContext, useState, useCallback, useEffect } from "react";

const PageDataContext = createContext();

export const PageDataProvider = ({ url, extras, usuario, children }) => {
	const [items, setItems] = useState({ data: [], loading: true, errors: null });
	const [selectedItem, setSelectedItem] = useState({});
	const [page, setPage] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(5);

	const confirm = useConfirm();

	const loadData = useCallback(() => {
		setItems({ data: [], loading: true, errors: null });

		setTimeout(() => {
			axios
				.get(url.apiPath)
				.then(({ data }) => {
					setItems({
						loading: false,
						errors: null,
						data: !!usuario ? data.filter((d) => d.correo !== usuario.correo) : data
					});
				})
				.catch(() => {
					setItems({ data: [], loading: false, errors: "Error al cargar la data" });
					console.log("Error al cargar data...");
				});
		}, 500);
	}, [url.apiPath, usuario]);

	const handleSelectedItem = (item) => {
		setSelectedItem(item);
	};

	const reloadPage = () => {
		loadData();
		setPage(0);
	};

	const handleDeleteItem = (modulo, id) => {
		confirm({
			title: "Advertencia",
			description: `¿Seguro que quieres eliminar ${id} para siempre?`,
			cancellationText: "Cancelar",
			confirmationText: "Aceptar",
			dialogProps: {
				maxWidth: "xs",
				sx: {
					textAlign: "center"
				}
			},
			confirmationButtonProps: { fullWidth: true },
			cancellationButtonProps: { color: "error", fullWidth: true }
		})
			.then(() => {
				axios
					.delete(`/api/${modulo}/${id}`)
					.then(() => {
						setPage(0);
						loadData();
					})
					.catch(() => {
						console.log("No se pudo eliminar el archivo");
					});
			})
			.catch(() => console.log("Se canceló la eliminación de " + id));
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeItemsPerPage = ({ target }) => {
		setItemsPerPage(parseInt(target.value, 10));
		setPage(0);
	};

	return (
		<PageDataContext.Provider
			value={{
				...items,
				selectedItem,
				pagedItems: items.data.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage),
				page,
				itemsPerPage,
				extras,
				query: url.query,
				usuario,
				handleDeleteItem,
				handleSelectedItem,
				loadData,
				reloadPage,
				handleChangePage,
				handleChangeItemsPerPage
			}}
		>
			{children}
		</PageDataContext.Provider>
	);
};

export const usePageData = () => {
	return useContext(PageDataContext);
};

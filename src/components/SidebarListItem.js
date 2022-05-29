import { ListItem, ListItemButton } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SidebarListItem({ pathname, children }) {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<ListItem disablePadding>
			<ListItemButton
				sx={{
					pl: 3,
					color: grey[700],
					[`&.Mui-selected`]: { backgroundColor: blue[700], color: "white" },
					[`&.Mui-selected:hover`]: { backgroundColor: blue[700], color: "white" }
				}}
				selected={location.pathname === pathname ? true : false}
				onClick={() => navigate(pathname, { replace: true })}
			>
				{children}
			</ListItemButton>
		</ListItem>
	);
}

export default SidebarListItem;

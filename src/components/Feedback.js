import { Alert } from "@mui/material";
import React from "react";
import { useEffect } from "react";

function Feedback({ type, message, show }) {
	return show && <Alert severity={type}>{message}</Alert>;
}

export default Feedback;

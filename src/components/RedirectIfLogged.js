import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Loading from "../views/Loading";

function RedirectIfLogged({ children }) {
	const { usuario } = useAuth();
	const { loading, data, errors } = usuario;

	if (loading) return <Loading />;

	if (!!errors) console.log(errors);

	if (!!data) return <Navigate to="/" replace />;

	return children;
}

export default RedirectIfLogged;

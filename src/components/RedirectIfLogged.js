import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Loading from "../views/Loading";

function RedirectIfLogged({ children }) {
	const { usuario, loading } = useAuth();

	if (loading) return <Loading />;

	if (!!usuario) return <Navigate to="/" replace />;

	return children;
}

export default RedirectIfLogged;

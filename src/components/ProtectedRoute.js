import PropTypes from "prop-types";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import DataProvider from "../providers/DataProvider";
import Loading from "../views/Loading";

function ProtectedRoute({ requireAdmin = false, paged = true, children }) {
	const { usuario } = useAuth();
	const { loading, isAdmin, data, errors } = usuario;

	if (loading) return <Loading />;

	if (!!errors) console.log(errors);

	if (!data) return <Navigate to="/login" replace />;

	if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;

	return children;
}

ProtectedRoute.propTypes = {
	children: PropTypes.any,
	requireAdmin: PropTypes.bool
};

export default ProtectedRoute;

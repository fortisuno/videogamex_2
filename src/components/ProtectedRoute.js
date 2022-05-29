import PropTypes from "prop-types";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import Loading from "../views/Loading";

function ProtectedRoute({ requireAdmin = false, children }) {
	const { usuario, loading, isAdmin } = useAuth();

	if (loading) return <Loading />;

	if (!usuario) return <Navigate to="/login" replace />;

	if (requireAdmin && !isAdmin) return <Navigate to="/" replace />;

	return children;
}

ProtectedRoute.propTypes = {
	children: PropTypes.any,
	requireAdmin: PropTypes.bool
};

export default ProtectedRoute;

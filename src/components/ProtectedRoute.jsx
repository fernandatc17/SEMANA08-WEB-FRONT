import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../Services/AuthService";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const user = AuthService.getCurrentUser();
  const userRoles = user?.roles || [];

  if (!user) return <Navigate to="/" />;

  // ✅ Admin siempre tiene acceso a todo
  const isAdmin = userRoles.includes("ROLE_ADMIN");
  const hasAccess = isAdmin || requiredRoles.some(role => userRoles.includes(role));

  return hasAccess ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
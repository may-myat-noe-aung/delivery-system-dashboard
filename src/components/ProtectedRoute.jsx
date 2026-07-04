import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const role = localStorage.getItem("role");

  // Not logged in
  if (!role) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role not allowed
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}
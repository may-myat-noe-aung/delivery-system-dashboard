import { Navigate } from "react-router-dom";

export default function RoleGuard({
  children,
  allowRoles,
}) {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
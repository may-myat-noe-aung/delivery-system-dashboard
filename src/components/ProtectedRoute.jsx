// import React from "react";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({
//   children,
//   allowedRoles = [],
// }) {
//   const role = localStorage.getItem("role");

//   // Not logged in
//   if (!role) {
//     return <Navigate to="/login" replace />;
//   }

//   // Logged in but role not allowed
//   if (
//     allowedRoles.length > 0 &&
//     !allowedRoles.includes(role)
//   ) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  // ================= AUTH DATA =================
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ================= NOT LOGIN =================
  // Token မရှိရင် login page ပြန်ပို့
  if (!token || !role) {
    // clean old data
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    return <Navigate to="/login" replace />;
  }

  // ================= ROLE CHECK =================
  // allowedRoles ပေးထားမှ စစ်မယ်
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // ================= ACCESS =================
  return children;
}

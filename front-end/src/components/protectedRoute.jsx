// import { useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (!user) return <Navigate to="/login" />;

//   return children;
// }

// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  // while checking token, show nothing or a loader
  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
}

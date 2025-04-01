import React from "react";
import { Navigate } from "react-router";

export const ProtectedRoutes = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // If not authenticated, redirect to the home page or login page
    return <Navigate to="/auth" />;
  }

  return children; // Render the children components if authenticated
};

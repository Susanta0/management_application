import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AuthComponents from "../components/AuthComponents";
import HomePage from "../components/HomePage";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("managment_token");

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};
export const AllRoutes = () => {
  const token = localStorage.getItem("managment_token");

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Navigate to="/home" replace /> : <AuthComponents />}
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<AuthComponents />} />
    </Routes>
  );
};

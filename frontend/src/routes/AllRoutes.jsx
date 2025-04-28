import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthComponents from "../components/AuthComponents";
import HomePage from "../pages/HomePage";
import Protect from "../protect/ProtectedRoute";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Protect>
            <HomePage />
          </Protect>
        }
      />
      <Route path="/" element={<AuthComponents />} />
    </Routes>
  );
};

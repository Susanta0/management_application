import React, { useContext } from "react";

import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const Protect = ({ children }) => {
  const { loginStatus } = useContext(AuthContext);
  if (!loginStatus.isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protect;

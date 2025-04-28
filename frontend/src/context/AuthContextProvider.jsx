import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loginStatus, setLoginStatus] = useState(() => {
    // Initialize state from localStorage
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    return {
      isLoggedIn: !!token,
      token: token,
      userId: userId,
    };
  });

  const userLogin = (token, userId) => {
    // Save to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    setLoginStatus({
      isLoggedIn: true,
      token: token,
      userId: userId,
    });
  };

  const userLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setLoginStatus({
      isLoggedIn: false,
      token: null,
      userId: null,
    });
  };

  return (
    <AuthContext.Provider value={{ loginStatus, userLogin, userLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

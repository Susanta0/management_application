import { useMemo } from "react";
import axios from "axios";

export function useApi() {
  //   const isProduction = window.location.hostname !== "localhost";
  const baseURL = "https://management-application-o77e.onrender.com";
  // : "";

  const token = localStorage.getItem("token");

  const apiInstance = useMemo(() => {
    return axios.create({
      baseURL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }, [token]); // If token changes (user logs in/logs out), api instance updates.

  return apiInstance;
}

import { useMemo } from "react";
import axios from "axios";

export function useApi() {
  const isProduction = window.location.hostname !== "localhost";
  const baseURL = isProduction
    ? "https://canva-mppp.onrender.com"
    : "http://localhost:8080";

  const token = localStorage.getItem("managment_token");

  const apiInstance = useMemo(() => {
    return axios.create({
      baseURL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
    });
  }, [token]); // If token changes (user logs in/logs out), api instance updates.

  return apiInstance;
}

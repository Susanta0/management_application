import { useMemo } from "react";
import axios from "axios";

export function useApi() {
  const baseURL = "https://management-application-o77e.onrender.com";

  const token = localStorage.getItem("token");

  const apiInstance = useMemo(() => {
    const instance = axios.create({
      baseURL,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    
    return instance;
  }, [token]);

  return apiInstance;
}

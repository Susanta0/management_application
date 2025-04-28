import { useMemo } from "react";
import axios from "axios";

export function useApi() {
  //   const isProduction = window.location.hostname !== "localhost";
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
    
    // Add request interceptor to fix field name typo and ensure correct data format
    instance.interceptors.request.use((config) => {
      // Only for task creation endpoint
      if (config.url === "/api/task/create_task" && config.method === "post") {
        // Make a copy of the data to avoid mutating the original object
        const data = JSON.parse(JSON.stringify(config.data));
        
        // Fix the typo in field name (creationDate -> creataionDate)
        if (data.creationDate) {
          data.creataionDate = data.creationDate;
          delete data.creationDate;
        }
        
        // Ensure priority has correct capitalization (Low, Medium, High)
        if (data.priority) {
          const priority = data.priority.toLowerCase();
          if (priority === "low") data.priority = "Low";
          if (priority === "medium") data.priority = "Medium";
          if (priority === "high") data.priority = "High";
        }
        
        // Ensure userId is properly set
        if (!data.userId) {
          data.userId = localStorage.getItem("userId");
        }
        
        config.data = data;
        console.log("Modified request data:", data);
      }
      return config;
    });

    return instance;
  }, [token]); // If token changes (user logs in/logs out), api instance updates.

  return apiInstance;
}

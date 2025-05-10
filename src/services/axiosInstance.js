// src/services/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/SangConnect",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  try {
    const url = new URL(config.url, config.baseURL);
    const path = url.pathname;

    // LOGS pour débogage
    console.log(">>> Interceptor path:", path);

    const isPublicRoute =
      path.startsWith("/auth/register") ||
      path.startsWith("/auth/authenticate") ||
      path.startsWith("/api/cities") ||
      path.startsWith("/api/centers");

    if (!isPublicRoute) {
      const token = localStorage.getItem("token");
      console.log(">>> Token récupéré:", token);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    console.log(">>> Headers envoyés:", config.headers);
    return config;
  } catch (error) {
    console.error("Axios interceptor error:", error);
    return config;
  }
});

export default axiosInstance;

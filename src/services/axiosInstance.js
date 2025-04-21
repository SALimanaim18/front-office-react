// src/services/api/axiosInstance.js
import axios from "axios"

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/SangConnect", // adapte à ton cas
  headers: {
    "Content-Type": "application/json"
  }
})

// Ajout automatique du token dans chaque requête
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance

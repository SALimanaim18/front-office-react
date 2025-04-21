// src/services/api/authApi.js
import axiosInstance from '../axiosInstance'

export const login = (data) => {
    return axiosInstance.post("/auth/authenticate", data)
}

export const register = (data) => {
    return axiosInstance.post("/auth/register", data)
}

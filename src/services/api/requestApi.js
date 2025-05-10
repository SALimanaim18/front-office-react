import axiosInstance from "../axiosInstance";




export const getAllRequests = () => axiosInstance.get("/api/demandes");
export const createRequest = (data) => axiosInstance.post("/api/demandes", data);
export const deleteRequest = (id) => axiosInstance.delete(`/api/demandes/${id}`);
export const getRequestById = (id) => axiosInstance.get(`/api/demandes/${id}`);
export const getAllBloodTypes = () => axiosInstance.get("/api/demandes/blood-types");

export const getAllCities = () => {
    return axiosInstance.get("/api/cities");
};



// requestApi.js
export const getCentersByCity = (cityName) => {
    return axiosInstance.get(`/api/centers/by-city?name=${encodeURIComponent(cityName)}`);
};

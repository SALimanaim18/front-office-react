// services/api/requestApi.js
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const getAllRequests = async () => {
    return axios.get(`${API_URL}/demandes`);
};

export const getAllBloodTypes = async () => {
return axios.get(`${API_URL}/bloodtypes`);
};

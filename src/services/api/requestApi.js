import axiosInstance from '../axiosInstance';

export const getAllRequests = () => axiosInstance.get('/api/demandes');
export const createRequest = (data) => axiosInstance.post('/api/demandes', data);
export const deleteRequest = (id) => axiosInstance.delete(`/api/demandes/${id}`);
export const getRequestById = (id) => axiosInstance.get(`/api/demandes/${id}`);
export const getAllBloodTypes = () => axiosInstance.get('/api/demandes/blood-types');

export const getAllCities = () => {
    return axiosInstance.get('/api/cities');
};

export const confirmRequest = (id) => {
    return axiosInstance.put(`/api/demandes/${id}/confirm`);
};

export async function getRequestsCountByCenter(centerId) {
    const response = await axiosInstance.get(`/api/demandes/center/${centerId}/count`);
    return response.data;
}

export const getUrgentRequestsCountByCenter = async (centerId) => {
    const response = await axiosInstance.get(`/api/demandes/center/${centerId}/urgent-count`);
    return response.data;
};

export const getLatestRequestsByCenter = async (centerId, token) => {
    return axiosInstance.get(`/api/demandes/center/${centerId}/latest`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getCentersByCity = (cityName) => {
    return axiosInstance.get(`/api/centers/by-city?name=${encodeURIComponent(cityName)}`);
};
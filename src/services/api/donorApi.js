import axiosInstance from "../axiosInstance";

export const getCentersByCity = async (city) => {
  const response = await axiosInstance.get(`/api/centers/by-city/${city}`);
  return response.data;
};


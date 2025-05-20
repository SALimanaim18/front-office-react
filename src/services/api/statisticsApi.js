import axiosInstance from "../axiosInstance";

export const getBloodTypeDistribution = async () => {
  const response = await axiosInstance.get("/api/statistics/blood-types");
  return response.data;
};

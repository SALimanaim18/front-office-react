import axiosInstance from "../axiosInstance";

const API_URL = "/SangConnect/api/centers";

export const getDonationCenterById = async (id) => {
  try {
    console.log(`Fetching donation center with ID: ${id}`); // Debug
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    console.log("Donation center response:", response.data); // Debug
    if (!response.data || !response.data.name) {
      throw new Error("Invalid response: Missing name field");
    }
    return response.data;
  } catch (error) {
    console.error(`Error fetching donation center with ID ${id}:`, error.message, error.response?.status, error.response?.data);
    throw error;
  }
};

export const getAllDonationCenters = async () => {
  try {
    console.log("Fetching all donation centers"); // Debug
    const response = await axiosInstance.get(API_URL);
    console.log("All donation centers response:", response.data); // Debug
    return response.data; // Returns List<DonationCenterDto>
  } catch (error) {
    console.error("Error fetching all donation centers:", error.message, error.response?.status, error.response?.data);
    throw error;
  }
};
import axiosInstance from "../axiosInstance";

export const createDonation = async (donationData) => {
    return axiosInstance.post("/api/donations", donationData);
};

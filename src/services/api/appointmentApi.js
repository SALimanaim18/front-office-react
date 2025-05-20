import axiosInstance from "../axiosInstance";

export const getAppointmentsByDate = async (centerId, date) => {
  console.log("getAppointmentsByDate - centerId:", centerId, "date:", date);
  try {
    const response = await axiosInstance.get(`/api/appointments/center/${centerId}/date/${date}`);
    console.log("getAppointmentsByDate response:", response.data);
    return response;
  } catch (error) {
    console.error("Error in getAppointmentsByDate:", error.message, error.response?.status, error.response?.data);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  console.log("createAppointment - data:", appointmentData);
  try {
    const response = await axiosInstance.post("/api/appointments", appointmentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("createAppointment response:", response.data);
    return response;
  } catch (error) {
    console.error("Error in createAppointment:", error.message, error.response?.status, error.response?.data);
    throw error;
  }
};

export const getTodaysAppointments = async () => {
  const centerId = localStorage.getItem("centerId");
  console.log("getTodaysAppointments - centerId:", centerId);
  if (!centerId) throw new Error("No centerId found in localStorage");
  try {
    const response = await axiosInstance.get("/api/appointments/today", {
      params: { centerId },
    });
    console.log("getTodaysAppointments response:", response.data);
    return response;
  } catch (error) {
    console.error("Error in getTodaysAppointments:", error.message, error.response?.status, error.response?.data);
    throw error;
  }
};
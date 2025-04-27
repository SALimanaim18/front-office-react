import axios from 'axios';

// Définir l'URL de base de ton backend
const API_URL = "http://localhost:8080/api/demandes"; // change selon ton URL backend

// Fonction pour soumettre la demande
export const submitBloodRequest = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}`, formData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la soumission :", error);
    throw error;
  }
};

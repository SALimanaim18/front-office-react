// donorApi.js
import axios from "axios";

// URL de l'API
const API_URL = "http://localhost:8080/api/donors"; // Remplace par l'URL correcte de ton backend

// Fonction pour ajouter un donneur
export const addDonor = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData); // Envoie les données avec axios
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la soumission :", error);
    throw error; // Propagation de l'erreur
  }
};

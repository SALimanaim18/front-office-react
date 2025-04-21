// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import Demandes from "../pages/Demandes";
import BecomeDonorPage from "../pages/become-donor-page";
import CreateRequestPage from "../pages/create-request-page";
import RequestList from '../RequestList'; // ou le chemin correct vers RequestList
import DonorEligibilityPage from "../pages/DonorEligibilityPage";
export default function AppRoutes() {
  const isAuthenticated = localStorage.getItem('authToken'); // Vérifie si l'utilisateur est authentifié

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        
        {/* Vérification de l'authentification pour "Devenir Donneur" */}
        <Route
          path="/devenir-donneur"
          element={ <BecomeDonorPage  />}
        />
        {/* Vérification de l'authentification pour "Créer Demande" */}
        <Route path="/creer-demande" element={<CreateRequestPage />} />
        <Route path="/eligibilite-donneur" element={<DonorEligibilityPage />} />
        <Route path="/requests" component={RequestList} />
      </Routes>
    </Router>
  );
}

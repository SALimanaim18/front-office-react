import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import RequestList from "../RequestList"; 
import FormulaireDemandeSang from "../pages/FormulaireDemandeSang";
import EligibilityQuestionnaire from "../pages/EligibilityQuestionnaire"


import BloodDonationRequests from "../pages/BloodDonationRequests"
export default function AppRoutes() {
  const isAuthenticated = localStorage.getItem('authToken'); // Vérifie si l'utilisateur est authentifié

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/demandes" element={<BloodDonationRequests/>}/>
        {/* Vérification de l'authentification pour "Devenir Donneur" */}
        {/* <Route
          path="/devenir-donneur"
          element={ <BecomeDonorPage  />}
        /> */}
        {/* Vérification de l'authentification pour "Créer Demande" */}
        {/* <Route path="/creer-demande" element={<CreateRequestPage />} /> */}
        {/* <Route path="/eligibilite-donneur" element={<DonorEligibilityPage />} /> */}
        <Route path="/requests" element={RequestList} />
        <Route path="/FormulaireDemandeSang" element={<FormulaireDemandeSang />}/>
        <Route path="/EligibilityQuestionnaire" element={<EligibilityQuestionnaire></EligibilityQuestionnaire>}/>
      </Routes>
    </Router>
  );
}

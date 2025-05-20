// frontend/src/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";
import RequestList from "../RequestList";
import FormulaireDemandeSang from "../pages/FormulaireDemandeSang";
import EligibilityQuestionnaire from "../pages/EligibilityQuestionnaire";
import RequestConfirmation from "../pages/RequestConfirmation";
import AppointmentBooking from "../pages/AppointmentBooking";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import ProfilePage from "../pages/ProfilePage";
import Index from "../Admin/pages/Index";
import BloodRequests from "../Admin/pages/BloodRequests";
import AppointmentPage from "../Admin/pages/Appointement";
import ProfilManager from "../Admin/pages/ProfilManager";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../Admin/layout/DashboardLayout ";

export default function AppRoutes() {
  console.log("Token :", localStorage.getItem("authToken"));
console.log("Role :", localStorage.getItem("userRole"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/demandes" element={<BloodDonationRequests />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/FormulaireDemandeSang" element={<FormulaireDemandeSang />} />
        <Route path="/eligibility/:id" element={<EligibilityQuestionnaire />} />
        <Route path="/request-confirmation/:id" element={<RequestConfirmation />} />
        <Route path="/appointments/create" element={<AppointmentBooking />} />
        <Route path="/Profil" element={<ProfilePage />} />

        <Route element={<ProtectedRoute allowedRole="CENTER_MANAGER" />}>
          <Route
            path="/admin/Index"
            element={
              <DashboardLayout>
                <Index />
              </DashboardLayout>
            }
          />
          
          <Route
            path="/admin/BloodRequests"
            element={
              <DashboardLayout>
                <BloodRequests />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/AppointmentPage"
            element={
              <DashboardLayout>
                <AppointmentPage />
              </DashboardLayout>
            }
          />
          <Route
            path="/admin/ProfilManager"
            element={
              <DashboardLayout>
                <ProfilManager />
              </DashboardLayout>
            }
          />
        </Route>

        <Route path="/Index" element={<Navigate to="/admin/Index" replace />} />
        <Route path="/admin/pages/Index" element={<Navigate to="/admin/Index" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
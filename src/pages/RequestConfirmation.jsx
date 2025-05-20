import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRequestById } from "../services/api/requestApi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function RequestConfirmation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem("authToken");
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Check authentication and role
    if (!authToken || !userId) {
      setError("Vous devez être connecté pour accéder à cette page.");
      navigate("/login");
      return;
    }

    if (userRole !== "USER") {
      setError("Accès refusé : seuls les utilisateurs avec le rôle USER peuvent confirmer une demande.");
      navigate("/");
      return;
    }

    const fetchRequest = async () => {
      if (!id) {
        setError("Identifiant de la demande non disponible.");
        setLoading(false);
        return;
      }

      try {
        const response = await getRequestById(id);
        setRequest(response.data);
      } catch (err) {
        const errorMessage =
          err.response?.status === 401 ? "Session expirée. Veuillez vous reconnecter." :
          err.response?.status === 403 ? "Accès refusé : vous n'êtes pas autorisé à accéder à cette demande." :
          err.response?.status === 404 ? "Demande introuvable dans notre système." :
          "Une erreur est survenue lors de la récupération des données de votre demande.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id, authToken, userId, userRole, navigate]);

  const handleConfirm = () => {
    if (request?.donationCenter?.id && id) {
      const centerId = request.donationCenter.id;
      navigate(`/appointments/create?requestId=${id}&centerId=${centerId}`);
    } else {
      setError("Impossible de continuer : informations manquantes.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="animate-pulse text-gray-600">Chargement des informations...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white shadow-lg rounded-2xl border-l-4 border-red-500">
        <p className="text-red-600 font-semibold">{error}</p>
        <button 
          onClick={() => navigate(error.includes("connecter") ? "/login" : -1)}
          className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-full transition-all duration-300 hover:bg-gray-100 text-sm"
        >
          {error.includes("connecter") ? "Se connecter" : "Retour à la page précédente"}
        </button>
      </div>
    </div>
  );

  if (!request) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white shadow-lg rounded-2xl border-l-4 border-yellow-500">
        <p className="text-yellow-600 font-semibold">Demande introuvable dans notre système.</p>
        <button 
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-full transition-all duration-300 hover:bg-gray-100 text-sm"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f8fafc] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden transition-shadow hover:shadow-2xl">
          <div className="bg-gradient-to-r from-[#d93f31] to-[#8b0000] px-6 py-5">
            <h1 className="text-2xl font-bold text-white text-center tracking-wide">
              Vérification de la demande
            </h1>
          </div>

          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Détails du don</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span className="block text-gray-500">Groupe sanguin</span>
                <span className="font-semibold">{request.bloodType || "Non spécifié"}</span>
              </div>
              <div>
                <span className="block text-gray-500">Centre de don</span>
                <span className="font-semibold">{request.donationCenter?.name || "Non spécifié"}</span>
              </div>
              <div>
                <span className="block text-gray-500">Ville</span>
                <span className="font-semibold">{request.city?.name || "Non spécifié"}</span>
              </div>
              <div>
                <span className="block text-gray-500">Adresse</span>
                <span className="font-semibold">{request.donationCenter?.address || "Non spécifiée"}</span>
              </div>
              <div>
                <span className="block text-gray-500">Niveau d'urgence</span>
                <span className="font-semibold">{request.urgencyLevel || "Non spécifié"}</span>
              </div>
              <div>
                <span className="block text-gray-500">Unités nécessaires</span>
                <span className="font-semibold">{request.requiredBloodUnits ? `${request.requiredBloodUnits} ml` : "Non spécifié"}</span>
              </div>
            </div>
          </div>

          {request.description && (
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-sm text-gray-600">{request.description}</p>
            </div>
          )}

          <div className="p-6 bg-[#f9fafb]">
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-2 border border-gray-400 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 shadow transition-all duration-300 hover:shadow-md"
              >
                Retour
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 bg-[#d93f31] text-white rounded-full text-sm font-medium hover:bg-[#5f0d06] shadow transition-all duration-300 hover:shadow-lg"
              >
                Continuer vers la prise de rendez-vous
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
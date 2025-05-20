import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTodaysAppointments } from "../../services/api/appointmentApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { AlertCircle } from "lucide-react";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const centerId = localStorage.getItem("centerId");
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole");

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching appointments - token:", token ? "[provided]" : "[missing]", "centerId:", centerId);
      const response = await getTodaysAppointments(token);
      console.log("API response:", response); // Debug: Log full response
      setAppointments(response.data || []);
    } catch (error) {
      console.error("Erreur lors du chargement des rendez-vous:", error);
      const errorMessage =
        error.response?.status === 403
          ? "Accès interdit : Vérifiez votre authentification ou vos permissions."
          : error.message || "Impossible de charger les rendez-vous. Veuillez réessayer.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userRole !== "CENTER_MANAGER") {
      setError("Accès réservé aux gestionnaires de centre.");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
    } else if (!centerId || !token) {
      setError("Informations d'authentification manquantes. Veuillez vous reconnecter.");
      setLoading(false);
      setTimeout(() => navigate("/login"), 2000);
    } else {
      fetchAppointments();
    }
  }, [centerId, token, userRole, navigate]);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Rendez-vous d'aujourd'hui</h1>
          <Button onClick={fetchAppointments} disabled={loading || !!error}>
            {loading ? "Chargement..." : "Rafraîchir"}
          </Button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Chargement...</p>
        ) : error ? (
          <div className="text-center py-8">
            <AlertCircle className="mx-auto text-red-600 h-8 w-8 mb-2" />
            <p className="text-red-600">{error}</p>
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-600">Aucun rendez-vous pour aujourd'hui.</p>
        ) : (
          <>
            <p className="mb-2 text-sm text-gray-600">
              Total rendez-vous : <strong>{appointments.length}</strong>
            </p>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Heure</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.userName || "Nom inconnu"}</TableCell>
                      <TableCell>
                        {appointment.date && appointment.time
                          ? new Date(`${appointment.date}T${appointment.time}`).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Heure inconnue"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={appointment.confirmed ? "success" : "secondary"}>
                          {appointment.confirmed ? "Confirmé" : "En attente"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Appointment;
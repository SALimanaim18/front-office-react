import React, { useEffect, useState } from 'react';
import { getLatestRequestsByCenter } from '../../../services/api/requestApi';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';

const LatestRequestTable = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("authToken");
  const centerId = localStorage.getItem("centerId");

  const fetchLatestRequests = async () => {
    if (!token) {
      setError("Vous devez être connecté pour voir les demandes.");
      console.warn("Token manquant !");
      return;
    }

    if (!centerId) {
      setError("ID du centre manquant. Assurez-vous d'être connecté en tant que gestionnaire de centre.");
      console.warn("centerId manquant !");
      return;
    }

    setIsLoading(true);
    try {
      const response = await getLatestRequestsByCenter(centerId, token);
      console.log("Réponse des dernières demandes :", response.data);
      setRequests(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (error) {
      console.error("Erreur lors du chargement des dernières demandes :", error);
      setError("Impossible de charger les dernières demandes. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestRequests();
  }, [token, centerId]);

  return (
    <div className="border rounded-md p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Dernières demandes</h2>
      {isLoading ? (
        <p className="text-gray-500">Chargement...</p>
      ) : error ? (
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <Button onClick={fetchLatestRequests} variant="outline">
            Réessayer
          </Button>
        </div>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">Aucune demande récente.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Groupe</TableHead>
              <TableHead>Urgence</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.bloodType}</TableCell>
                <TableCell>
                  <Badge variant={
                    req.urgencyLevel === "CRITIQUE" ? "destructive" :
                    req.urgencyLevel === "HAUTE" ? "warning" : "default"
                  }>
                    {req.urgencyLevel}
                  </Badge>
                </TableCell>
                <TableCell>{req.userName}</TableCell>
                <TableCell>{req.userPhone}</TableCell>
                <TableCell>
                  {new Date(req.createdAt).toLocaleDateString('fr-FR')}<br />
                  <span className="text-xs text-gray-500">
                    {new Date(req.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default LatestRequestTable;
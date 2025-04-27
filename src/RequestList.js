import axios from 'axios';
import React, { useEffect, useState } from 'react';

const RequestList = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/demandes')
      .then(response => {
        setRequests(response.data); // Mettre à jour l'état avec les données reçues
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des demandes", error);
      });
  }, []);

  return (
    <div>
      <h2>Liste des demandes</h2>
      <ul>
        {requests.map(request => (
          <li key={request.id}>{request.title}</li> // Assurez-vous que chaque "request" a un attribut "id"
        ))}
      </ul>
    </div>
  );
};

export default RequestList;

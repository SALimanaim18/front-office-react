import React from "react";
import RequestCard from "../common/RequestCard";
import Button from "../common/Button";
import { Link } from 'react-router-dom';

const RequestsWallSection = () => {
  // Données fictives pour les cartes de demande
const requests = [
    {
    name: "Mohammed Alaoui",
    bloodType: "A+",
    location: "Hôpital Ibn Sina, Rabat",
    date: "Aujourd'hui",
    urgent: true
    },
    {
    name: "Fatima Bennani",
    bloodType: "O-",
    location: "CHU Hassan II, Fès",
    date: "Aujourd'hui",
    urgent: true
    },
    {
    name: "Karim Tazi",
    bloodType: "B+",
    location: "Hôpital Cheikh Khalifa, Casablanca",
    date: "Hier",
    urgent: false
    },
    {
    name: "Souad El Mansouri",
    bloodType: "AB+",
    location: "Hôpital Mohammed VI, Marrakech",
    date: "Il y a 2 jours",
    urgent: false
    }
];

return (
    <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
        <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-sangred-DEFAULT mb-4">
            Demandes de sang
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
            Voici les demandes récentes de don de sang. Chaque don peut faire la différence pour ces personnes dans le besoin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {requests.map((request, index) => (
            <RequestCard
              key={index}
              name={request.name}
              bloodType={request.bloodType}
              location={request.location}
              date={request.date}
              urgent={request.urgent}
            />
          ))}
        </div>

        <div className="text-center mt-8">
  <Link to="/demandes">
    <Button variant="secondary" size="lg">
      Voir toutes les demandes
    </Button>
  </Link>
</div>

      </div>
    </section>
  );
};

export default RequestsWallSection;

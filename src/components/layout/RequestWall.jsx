"use client"

import { useState } from "react"
import RequestCard from "../common/RequestCard"
import { Search } from "lucide-react"
import { Link } from 'react-router-dom';


const RequestWall = () => {
  const [searchTerm, setSearchTerm] = useState("")

  // Sample data for blood requests
  const requests = [
    {
        id: 1,
        bloodType: "A+",
        city: "Casablanca",
        hospital: "CHU Ibn Rochd",
        urgency: "Haute",
        timePosted: "Il y a 2 heures",
        description: "Besoin urgent pour une opération chirurgicale programmée demain matin.",
    },
    {
        id: 2,
        bloodType: "O-",
        city: "Rabat",
        hospital: "Hôpital Militaire Mohammed V",
        urgency: "Critique",
        timePosted: "Il y a 30 minutes",
        description: "Accident de la route, patient en soins intensifs nécessitant une transfusion immédiate.",
    },
    {
        id: 3,
        bloodType: "B+",
        city: "Marrakech",
        hospital: "CHU Mohammed VI",
        urgency: "Moyenne",
        timePosted: "Il y a 5 heures",
        description: "Patient atteint de leucémie nécessitant des transfusions régulières.",
    },
    {
        id: 4,
        bloodType: "AB-",
        city: "Tanger",
        hospital: "Hôpital Al Kortobi",
        urgency: "Haute",
        timePosted: "Il y a 1 heure",
        description: "Femme enceinte avec complications nécessitant une transfusion d'urgence.",
    },
]

  // Filter requests based on search term
  const filteredRequests = requests.filter(
    (request) =>
        request.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.bloodType.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <section className="py-16 bg-white" id="requests">
    <div className="container mx-auto px-4">
        <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[#460904] mb-4 relative inline-block">
            Demandes actuelles
            <div className="absolute h-1 w-12 bg-[#b2d3e1] bottom-0 left-1/2 transform -translate-x-1/2"></div>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
            Voici les demandes de sang les plus récentes. Chaque carte représente une personne qui a besoin de votre
            aide.
        </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-10 relative">
        <div className="relative">
            <input
                type="text"
                placeholder="Rechercher par ville, hôpital ou groupe sanguin..."
                className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2d3e1] focus:border-transparent transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        </div>
        </div>

        {/* Request cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredRequests.map((request, index) => (
            <RequestCard key={request.id} request={request} delay={index * 100} />
          ))}
        </div>

        {/* View all button */}
        <div className="mt-10 text-center">
  <Link
    to="/demandes"
    className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-[#b2d3e1] text-gray-700 font-medium hover:bg-[#b2d3e1]/10 transition-all transform hover:scale-105 group"
  >
    Voir toutes les demandes
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </Link>
</div>

      </div>
    </section>
  )
}

export default RequestWall




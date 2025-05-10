"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Filter,
  X,
  Clock,
  Heart,
  AlertCircle,
  Droplet,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { getAllRequests, getAllBloodTypes } from "../services/api/requestApi";
import { Link } from "react-router-dom"

const RequestCard = ({ request, delay = 0 }) => {
  const cityName = typeof request.city === "object" ? request.city?.name : request.city;

  const getUrgencyStyle = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case "critique":
        return "bg-red-100 text-red-800";
      case "haute":
        return "bg-orange-100 text-orange-800";
      case "moyenne":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getBloodTypeStyle = (bloodType) => {
    if (bloodType?.includes("O")) return "bg-[#460904] text-white";
    if (bloodType?.includes("A")) return "bg-[#b2d3e1] text-[#460904]";
    if (bloodType?.includes("B")) return "bg-[#8fb9cc] text-white";
    return "bg-[#6c9fb8] text-white";
  };

  const getElapsedTime = (createdAt) => {
    if (!createdAt) return "Temps inconnu";
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 60) return `Il y a ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Il y a ${hours} h`;
    const days = Math.floor(hours / 24);
    return `Il y a ${days} j`;
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-2 overflow-hidden border border-gray-100"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className={`${getBloodTypeStyle(request.bloodType)} text-lg font-bold h-12 w-12 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform`}>
            {request.bloodType}
          </div>
          <span className={`${getUrgencyStyle(request.urgencyLevel)} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
            {request.urgencyLevel}
          </span>
        </div>

        <h3 className="font-semibold text-gray-800 mb-1">
          {request.donationCenter?.name || "Centre inconnu"}
        </h3>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          {cityName}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {request.description || "Aucune description."}
        </p>

        <div className="flex items-center mb-4 text-sm text-gray-700">
          <Droplet className="h-4 w-4 mr-1 text-[#e74c3c]" />
          <span>Besoin de {request.requiredUnits || "?"} unités</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center text-gray-500 text-xs">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{getElapsedTime(request.createdAt)}</span>
          </div>
         <Link to="/EligibilityQuestionnaire">
                    <button
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e74c3c] text-white text-sm font-semibold rounded-full shadow-md hover:bg-[#c0392b] transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e74c3c]"
          >
            <Heart className="h-4 w-4" />
            Je veux aider
          </button>

         </Link>

        </div>
      </div>
    </div>
  );
};

export default function BloodDonationRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodTypes, setBloodTypes] = useState([]);
  const [selectedBloodTypes, setSelectedBloodTypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [bloodRequests, setBloodRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const requestsResponse = await getAllRequests();
        setBloodRequests(requestsResponse.data);
        setFilteredRequests(requestsResponse.data);
        const bloodTypesResponse = await getAllBloodTypes();
        setBloodTypes(bloodTypesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Impossible de récupérer les données.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setFilteredRequests((prev) => [...prev]);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const cities = useMemo(() => {
    return Array.from(new Set(bloodRequests.map((r) => (typeof r.city === "object" ? r.city?.name : r.city)))).filter(Boolean);
  }, [bloodRequests]);

  useEffect(() => {
    if (bloodRequests.length === 0) return;
    const filtered = bloodRequests.filter((request) => {
      const cityName = typeof request.city === "object" ? request.city?.name : request.city;
      const hospitalName = request.donationCenter?.name || "";
      const description = request.description || "";
      const bloodType = request.bloodType || "";
      const matchesSearch =
        searchTerm === "" ||
        hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cityName && cityName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bloodType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBloodType = selectedBloodTypes.length === 0 || selectedBloodTypes.includes(request.bloodType);
      const matchesCity = selectedCity === "" || cityName === selectedCity;
      return matchesSearch && matchesBloodType && matchesCity;
    });
    setFilteredRequests(filtered);
  }, [searchTerm, selectedBloodTypes, selectedCity, bloodRequests]);

  const toggleBloodType = (type) => {
    if (selectedBloodTypes.includes(type)) {
      setSelectedBloodTypes(selectedBloodTypes.filter((t) => t !== type));
    } else {
      setSelectedBloodTypes([...selectedBloodTypes, type]);
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBloodTypes([]);
    setSelectedCity("");
  };

  return (
    <>
      <Navbar />
      <section className="py-16 bg-white min-h-screen" id="requests">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#460904] mb-4 relative inline-block">
              Demandes actuelles
              <div className="absolute h-1 w-12 bg-[#b2d3e1] bottom-0 left-1/2 transform -translate-x-1/2"></div>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Voici les demandes de sang les plus récentes. Chaque carte représente une personne qui a besoin de votre aide.
            </p>
          </div>

          {/* 🔎 Filtres */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="max-w-md mx-auto w-full relative">
                <input
                  type="text"
                  placeholder="Rechercher par ville, centre ou groupe sanguin..."
                  className="w-full px-4 py-3 pl-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2d3e1] transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>

              <div className="w-full md:w-64">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="block w-full py-2.5 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b2d3e1] transition-all"
                >
                  <option value="">Toutes les villes</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
              >
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">Filtrer par groupe sanguin</span>
                {selectedBloodTypes.length > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                    {selectedBloodTypes.length}
                  </span>
                )}
              </button>

              {(searchTerm || selectedBloodTypes.length > 0 || selectedCity) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition"
                >
                  <X className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">Réinitialiser</span>
                </button>
              )}
            </div>

            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {bloodTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleBloodType(type)}
                      className={`h-10 rounded-lg flex items-center justify-center transition-all ${
                        selectedBloodTypes.includes(type)
                          ? "bg-red-100 text-red-800 border border-red-500 font-medium"
                          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 🩸 Résultats */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#e74c3c] border-r-transparent mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900">Chargement des demandes...</h3>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <AlertCircle className="mx-auto text-red-600 h-8 w-8 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Erreur</h3>
              <p className="text-gray-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Réessayer
              </button>
            </div>
          ) : filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredRequests.map((request, index) => (
                <RequestCard key={request.id} request={request} delay={index * 100} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <AlertCircle className="mx-auto text-gray-400 h-8 w-8 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune demande trouvée</h3>
              <p className="text-gray-500">Essayez de modifier vos filtres ou critères de recherche.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

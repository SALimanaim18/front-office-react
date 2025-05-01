"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Filter, X, Clock, Heart, AlertCircle, Droplet } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import { getAllRequests, getAllBloodTypes } from "../services/api/requestApi";

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

  // Get unique cities from blood requests
  const cities = Array.from(new Set(bloodRequests.map((request) => request.city)));

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch blood requests
        const requestsResponse = await getAllRequests();
        setBloodRequests(requestsResponse.data);
        setFilteredRequests(requestsResponse.data);

        // Fetch blood types
        const bloodTypesResponse = await getAllBloodTypes();
        setBloodTypes(bloodTypesResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Impossible de récupérer les données. Veuillez réessayer plus tard.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter requests based on search term, blood types, and city
  useEffect(() => {
    if (bloodRequests.length === 0) return;

    const filtered = bloodRequests.filter((request) => {
      const matchesSearch =
        searchTerm === "" ||
        request.hospital.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBloodType = selectedBloodTypes.length === 0 || selectedBloodTypes.includes(request.bloodType);
      const matchesCity = selectedCity === "" || request.city === selectedCity;

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

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case "Critique":
        return "bg-red-100 text-red-800 border border-red-200";
      case "Haute":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Moyenne":
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
      case "Basse":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "";
    }
  };

  const getBloodTypeStyle = (bloodType) => {
    if (bloodType.includes("O")) {
      return "bg-red-600 text-white";
    } else if (bloodType.includes("A")) {
      return "bg-blue-600 text-white";
    } else if (bloodType.includes("B")) {
      return "bg-purple-600 text-white";
    } else {
      return "bg-indigo-600 text-white";
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-3">Demandes de Don de Sang</h1>
            <p className="max-w-2xl mx-auto text-gray-600">
              Trouvez les demandes de don de sang près de chez vous et aidez à sauver des vies. Chaque don peut faire la
              différence pour quelqu'un dans le besoin.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search Bar */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Rechercher par hôpital, ville ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* City Filter */}
              <div className="w-full md:w-64">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                >
                  <option value="">Toutes les villes</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggle Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700">Filtrer par groupe sanguin</span>
                {selectedBloodTypes.length > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center">
                    {selectedBloodTypes.length}
                  </span>
                )}
              </button>

              {/* Reset Filters Button */}
              {(searchTerm || selectedBloodTypes.length > 0 || selectedCity) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-700">Réinitialiser</span>
                </button>
              )}
            </div>

            {/* Blood Type Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fadeIn">
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {bloodTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => toggleBloodType(type)}
                      className={`flex items-center justify-center h-10 rounded-lg transition-all ${
                        selectedBloodTypes.includes(type)
                          ? "bg-red-100 text-red-800 font-medium border-2 border-red-500"
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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900">Chargement des demandes...</h3>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Erreur</h3>
              <p className="text-gray-500">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          )}

          {/* Results Count */}
          {!loading && !error && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                {filteredRequests.length} {filteredRequests.length === 1 ? "demande trouvée" : "demandes trouvées"}
              </p>

              {/* Active Filters Display */}
              <div className="flex flex-wrap gap-2">
                {selectedCity && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {selectedCity}
                    <button onClick={() => setSelectedCity("")} className="ml-1 text-gray-500 hover:text-gray-700">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}

                {selectedBloodTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    {type}
                    <button onClick={() => toggleBloodType(type)} className="ml-1 text-red-600 hover:text-red-800">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Blood Requests Cards */}
          {!loading && !error && filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 transform hover:-translate-y-1"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div
                        className={`h-14 w-14 rounded-full ${getBloodTypeStyle(request.bloodType)} flex items-center justify-center transform hover:scale-110 transition-transform shadow-sm`}
                      >
                        <span className="text-xl font-bold">{request.bloodType}</span>
                      </div>
                      <span
                        className={`${getPriorityBadgeColor(
                          request.priority,
                        )} text-xs font-medium px-2.5 py-1 rounded-full`}
                      >
                        {request.priority}
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-800 text-lg mb-1">{request.hospital}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{request.city}</span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">{request.description}</p>

                    <div className="flex items-center mb-4 text-sm text-gray-600">
                      <Droplet className="h-4 w-4 mr-1 text-red-500" />
                      <span>Besoin de {request.requiredUnits} unités</span>
                      <span className="mx-2">•</span>
                      <span>{request.patientType}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-xs">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{request.postedTime}</span>
                      </div>
                      <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors shadow-sm hover:shadow-md transform hover:scale-105 group">
                        <Heart className="h-4 w-4 mr-1.5 group-hover:animate-pulse" />
                        Je veux aider
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && !error && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <AlertCircle className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune demande trouvée</h3>
                <p className="text-gray-500">Essayez de modifier vos critères de recherche ou de filtrage.</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
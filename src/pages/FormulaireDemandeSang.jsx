
import React, { useState, useEffect } from "react";
import { createRequest, getCentersByCity, getAllCities } from "../services/api/requestApi";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer"
const bloodTypes = ["A+", "A−", "B+", "B−", "AB+", "AB−", "O+", "O−"];
const urgencyLevels = [
  { value: "CRITIQUE", label: "Critique" },
  { value: "HAUTE", label: "Haute" },
  { value: "MOYENNE", label: "Moyenne" },
  { value: "FAIBLE", label: "Faible" },
];

export default function FormulaireDemandeSang() {
  const [cities, setCities] = useState([]);
  const [donationCenters, setDonationCenters] = useState([]);
  const [isLoadingCenters, setIsLoadingCenters] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [formValues, setFormValues] = useState({
    bloodType: "",
    urgencyLevel: "",
    city: "",
    donationCenter: "",
    requiredBloodUnits: 1,
    description: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await getAllCities();
        setCities(response.data || response);
      } catch (error) {
        console.error("Erreur chargement villes :", error);
        setToastMessage({
          title: "Erreur",
          description: "Échec du chargement des villes.",
          type: "error",
        });
      }
    };
    fetchCities();
  }, []);

  const onCityChange = async (cityName) => {
    if (!cityName) {
      setDonationCenters([]);
      return;
    }

    try {
      setIsLoadingCenters(true);
      const response = await getCentersByCity(cityName);
      setDonationCenters(response.data || response);
      setFormValues(prev => ({ ...prev, donationCenter: "" }));
    } catch (error) {
      console.error("Erreur chargement centres :", error);
      setToastMessage({
        title: "Erreur",
        description: "Échec du chargement des centres.",
        type: "error",
      });
      setDonationCenters([]);
    } finally {
      setIsLoadingCenters(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formValues.bloodType) newErrors.bloodType = "Champ requis";
    if (!formValues.urgencyLevel) newErrors.urgencyLevel = "Champ requis";
    if (!formValues.city) newErrors.city = "Champ requis";
    if (!formValues.donationCenter) newErrors.donationCenter = "Champ requis";
    
    if (!formValues.requiredBloodUnits) {
      newErrors.requiredBloodUnits = "Champ requis";
    } else if (formValues.requiredBloodUnits < 1) {
      newErrors.requiredBloodUnits = "Minimum 1 unité";
    } else if (formValues.requiredBloodUnits > 10000) {
      newErrors.requiredBloodUnits = "Maximum 10000 ml";
    }
    
    if (formValues.description && formValues.description.length > 1000) {
      newErrors.description = "Maximum 1000 caractères";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    
    if (name === "city") {
      onCityChange(value);
    }
    
    if (errors[name] && value) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const selectedCity = cities.find(c => c.name === formValues.city);
      if (!selectedCity) {
        setToastMessage({
          title: "Erreur",
          description: "Ville sélectionnée invalide.",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }

      const payload = {
        bloodType: formValues.bloodType,
        cityId: selectedCity.id,
        urgencyLevel: formValues.urgencyLevel,
        description: formValues.description,
        donationCenter: parseInt(formValues.donationCenter),
        requiredBloodUnits: parseInt(formValues.requiredBloodUnits),
      };




      console.log(payload)
      await createRequest(payload);

      setToastMessage({
        title: "Succès",
        description: "Votre demande a été envoyée avec succès.",
        type: "success",
      });
      resetForm();
    } catch (error) {
      console.error("Erreur soumission :", error);
      setToastMessage({
        title: "Erreur",
        description: "Échec de l'envoi. Veuillez réessayer.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormValues({
      bloodType: "",
      urgencyLevel: "",
      city: "",
      donationCenter: "",
      requiredBloodUnits: 1,
      description: ""
    });
    setErrors({});
    setDonationCenters([]);
  };

  const characterCount = formValues.description.length;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-red-100 text-red-800 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Demande de Don de Sang
            </h1>
            <p className="mt-2 text-gray-600">
              Complétez ce formulaire pour soumettre une demande de don de sang. Les champs marqués d'un astérisque (*) sont obligatoires.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Toast notification */}
            {toastMessage && (
              <div className={`p-4 ${
                toastMessage.type === "error" ? "bg-red-50" : "bg-green-50"
              }`}>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {toastMessage.type === "error" ? (
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3 w-full">
                    <h3 className={`text-sm font-medium ${
                      toastMessage.type === "error" ? "text-red-800" : "text-green-800"
                    }`}>
                      {toastMessage.title}
                    </h3>
                    <div className={`mt-1 text-sm ${
                      toastMessage.type === "error" ? "text-red-700" : "text-green-700"
                    }`}>
                      {toastMessage.description}
                    </div>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => setToastMessage(null)}
                        className={`rounded-md text-sm font-medium ${
                          toastMessage.type === "error"
                            ? "text-red-600 hover:text-red-500"
                            : "text-green-600 hover:text-green-500"
                        }`}
                      >
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-5">
                {/* Blood type and urgency level */}
                <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="bloodType">
                      Groupe sanguin *
                    </label>
                    <div className="relative rounded-md">
                      <select
                        id="bloodType"
                        name="bloodType"
                        value={formValues.bloodType}
                        onChange={handleChange}
                        className={`block w-full py-2 pl-3 pr-10 text-base border ${
                          errors.bloodType ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-red-500 focus:border-red-500"
                        } rounded-md shadow-sm appearance-none`}
                      >
                        <option value="">Choisir un groupe</option>
                        {bloodTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.bloodType && (
                      <p className="mt-1 text-sm text-red-600">{errors.bloodType}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="urgencyLevel">
                      Niveau d'urgence *
                    </label>
                    <div className="relative rounded-md">
                      <select
                        id="urgencyLevel"
                        name="urgencyLevel"
                        value={formValues.urgencyLevel}
                        onChange={handleChange}
                        className={`block w-full py-2 pl-3 pr-10 text-base border ${
                          errors.urgencyLevel ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-red-500 focus:border-red-500"
                        } rounded-md shadow-sm appearance-none`}
                      >
                        <option value="">Choisir un niveau</option>
                        {urgencyLevels.map((u) => (
                          <option key={u.value} value={u.value}>
                            {u.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.urgencyLevel && (
                      <p className="mt-1 text-sm text-red-600">{errors.urgencyLevel}</p>
                    )}
                  </div>
                </div>

                {/* Required blood units */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="requiredBloodUnits">
                    Unités de sang requises *
                  </label>
                  <input
                    type="number"
                    id="requiredBloodUnits"
                    name="requiredBloodUnits"
                    min="1"
                    max="10000"
                    value={formValues.requiredBloodUnits}
                    onChange={handleChange}
                    className={`block w-full py-2 px-3 border ${
                      errors.requiredBloodUnits ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-red-500 focus:border-red-500"
                    } rounded-md shadow-sm`}
                  />
                  {errors.requiredBloodUnits && (
                    <p className="mt-1 text-sm text-red-600">{errors.requiredBloodUnits}</p>
                  )}
                </div>

                {/* City and donation center */}
                <div className="grid grid-cols-1 gap-y-5 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
                      Ville *
                    </label>
                    <div className="relative rounded-md">
                      <select
                        id="city"
                        name="city"
                        value={formValues.city}
                        onChange={handleChange}
                        className={`block w-full py-2 pl-3 pr-10 text-base border ${
                          errors.city ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-red-500 focus:border-red-500"
                        } rounded-md shadow-sm appearance-none`}
                      >
                        <option value="">Choisir une ville</option>
                        {cities.map((city) => (
                          <option key={city.id} value={city.name}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="donationCenter">
                      Centre de don *
                    </label>
                    <div className="relative rounded-md">
                      <select
                        id="donationCenter"
                        name="donationCenter"
                        value={formValues.donationCenter}
                        onChange={handleChange}
                        disabled={donationCenters.length === 0 || isLoadingCenters}
                        className={`block w-full py-2 pl-3 pr-10 text-base border ${
                          errors.donationCenter ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-red-500 focus:border-red-500"
                        } rounded-md shadow-sm appearance-none ${
                          (donationCenters.length === 0 || isLoadingCenters) ? "bg-gray-100 cursor-not-allowed" : ""
                        }`}
                      >
                        {isLoadingCenters ? (
                          <option>Chargement...</option>
                        ) : (
                          <>
                            <option value="">
                              {formValues.city ? "Choisir un centre" : "Sélectionner une ville d'abord"}
                            </option>
                            {donationCenters.map((center) => (
                              <option key={center.id} value={center.id}>
                                {center.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.donationCenter && (
                      <p className="mt-1 text-sm text-red-600">{errors.donationCenter}</p>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                    Description (optionnel)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    rows={3}
                    className={`block w-full py-2 px-3 border ${
                      errors.description ? "border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-red-500 focus:border-red-500"
                    } rounded-md shadow-sm`}
                    placeholder="Précisez la situation si nécessaire..."
                  />
                  <div className="mt-1 flex justify-end">
                    <span className={`text-sm ${
                      characterCount > 900 ? (characterCount > 1000 ? "text-red-600" : "text-amber-600") : "text-gray-500"
                    }`}>
                      {characterCount}/1000
                    </span>
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>
              </div>

              {/* Form actions */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Réinitialiser
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </span>
                  ) : (
                    "Soumettre la demande"
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Info card */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-l-4 border-blue-500">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-blue-800">
                    Information importante
                  </h3>
                  <div className="mt-1 text-sm text-blue-700">
                    <p>
                      Votre demande sera traitée en priorité selon le niveau d'urgence sélectionné. 
                      Vous serez contacté par le centre de don dès qu'un donneur compatible sera disponible.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
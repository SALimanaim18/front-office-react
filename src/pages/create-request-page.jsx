"use client";
import { useState } from "react";
import { submitBloodRequest } from "../api";

export default function TestForm() {
  const [formData, setFormData] = useState({
    patientName: "",
    bloodType: "",
    city: "",
    transfusionCenter: "",
    contactPhone: "",
    urgencyLevel: "",
    additionalMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitBloodRequest(formData);
      alert("Demande envoyée avec succès !");
    } catch (err) {
      alert("Échec de l'envoi !");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl relative overflow-hidden">
        
        {/* Goutte de sang décorative */}
        <div className="absolute top-[-40px] right-[-40px] w-40 h-40 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-60px] left-[-30px] w-28 h-28 bg-[#b91c1c] rounded-full opacity-10 blur-2xl animate-ping"></div>

        {/* Titre principal */}
        <h2 className="text-4xl font-extrabold text-center text-[#b91c1c] drop-shadow mb-2">
          Demande de Don de Sang
        </h2>

        {/* Phrase touchante */}
        <p className="text-center text-gray-600 text-lg italic mb-10">
          Une seule poche de sang peut sauver trois vies. Soyez le héros de quelqu’un aujourd’hui.
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom du patient */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Nom du Patient</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-red-400 focus:border-red-500 outline-none"
              placeholder="Nom complet"
              required
            />
          </div>

          {/* Groupe sanguin */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Groupe Sanguin</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-red-400 focus:border-red-500 outline-none"
              required
            >
              <option value="">Sélectionner</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Ville */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Ville</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-red-400 focus:border-red-500 outline-none"
              placeholder="Casablanca, Rabat..."
              required
            />
          </div>

          {/* Centre de transfusion */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Centre de Transfusion</label>
            <select
              name="transfusionCenter"
              value={formData.transfusionCenter}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-red-400 focus:border-red-500 outline-none"
              required
            >
              <option value="">Choisir un centre</option>
              <option value="Centre de Rabat">Centre de Rabat</option>
              <option value="Centre de Casablanca">Centre de Casablanca</option>
              <option value="Centre de Marrakech">Centre de Marrakech</option>
              <option value="Autre">Autre</option>
            </select>
          </div>

          {/* Téléphone */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-red-400 focus:border-red-500 outline-none"
              placeholder="06XXXXXXXX"
              required
            />
          </div>

          {/* Niveau d’urgence */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">Niveau d'Urgence</label>
            <div className="flex gap-4 mt-1">
              {["faible", "moyenne", "haute"].map((level) => (
                <label key={level} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="urgencyLevel"
                    value={level}
                    checked={formData.urgencyLevel === level}
                    onChange={handleChange}
                    className="text-red-600 focus:ring-red-500"
                  />
                  <span className="capitalize">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message complémentaire */}
          <div className="md:col-span-2">
            <label className="block font-medium text-gray-700 mb-1">Message Complémentaire</label>
            <textarea
              name="additionalMessage"
              value={formData.additionalMessage}
              onChange={handleChange}
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-red-400 focus:border-red-500 outline-none"
              placeholder="Ajoutez toute information pertinente"
            />
          </div>

          {/* Bouton de soumission */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-300"
            >
              🚑 Soumettre la Demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";
import { addDonor } from "../services/api/donorApi";

export default function BecomeDonorPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    bloodType: "",
    city: "",
    contactPhone: "",
    availability: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await addDonor(formData); // Utiliser la fonction API
      console.log("Donneur ajouté avec succès:", response);
      alert("Merci pour votre engagement !");
      setFormData({
        fullName: "",
        bloodType: "",
        city: "",
        contactPhone: "",
        availability: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur API:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };
  


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl w-full relative overflow-hidden">

        {/* Élément de design : Goutte stylisée */}
        <div className="absolute top-[-60px] right-[-60px] w-48 h-48 bg-red-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        {/* Titre principal */}
        <h1 className="text-4xl font-extrabold text-center text-red-600 mb-2 drop-shadow">
          Devenez Donneur de Sang
        </h1>

        {/* Sous-titre inspirant */}
        <p className="text-center text-gray-600 text-lg italic mb-10">
          Donner son sang, c’est offrir une seconde chance à la vie.
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom complet */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Nom Complet</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-red-400 focus:border-red-500 outline-none"
              placeholder="Ex : Youssef El Amrani"
            />
          </div>

          {/* Groupe sanguin */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Groupe Sanguin</label>
            <select
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-red-400 focus:border-red-500 outline-none"
            >
              <option value="">Choisir</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Ville */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Ville</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-red-400 focus:border-red-500 outline-none"
              placeholder="Ex : Agadir, Fès..."
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-red-400 focus:border-red-500 outline-none"
              placeholder="06XXXXXXXX"
            />
          </div>

          {/* Disponibilité */}
          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Disponibilité</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-red-400 focus:border-red-500 outline-none"
            >
              <option value="">Sélectionnez un créneau</option>
              <option value="Lundi au Vendredi">Lundi au Vendredi</option>
              <option value="Week-ends">Week-ends</option>
              <option value="Tout moment">Tout moment</option>
            </select>
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label className="block font-semibold text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-red-400 focus:border-red-500 outline-none"
              placeholder="Un message pour l’équipe médicale (facultatif)"
            />
          </div>

          {/* Bouton */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-10 py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              ❤️ Je deviens donneur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

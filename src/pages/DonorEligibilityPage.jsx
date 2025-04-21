"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
export default function DonorEligibilityPage() {
  const [responses, setResponses] = useState({
    age: "",
    weight: "",
    recentDonation: "",
    illness: "",
    medication: "",
  });

  const [result, setResult] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEligible =
      responses.age === "yes" &&
      responses.weight === "yes" &&
      responses.recentDonation === "no" &&
      responses.illness === "no" &&
      responses.medication === "no";

      if (isEligible) {
        // ✅ Redirection si éligible
        navigate("/devenir-donneur");
      } else {
        setResult("Désolé, vous n'êtes pas éligible pour donner votre sang pour le moment.");
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">Test d'Éligibilité au Don de Sang</h1>
        <p className="text-center text-gray-600 mb-6 italic">Répondez à ces quelques questions pour savoir si vous pouvez sauver une vie aujourd’hui.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question 1 */}
          <div>
            <p className="font-semibold">Avez-vous entre 18 et 65 ans ?</p>
            <div className="flex gap-4 mt-2">
              <label><input type="radio" name="age" value="yes" onChange={handleChange} /> Oui</label>
              <label><input type="radio" name="age" value="no" onChange={handleChange} /> Non</label>
            </div>
          </div>

          {/* Question 2 */}
          <div>
            <p className="font-semibold">Pesez-vous plus de 50 kg ?</p>
            <div className="flex gap-4 mt-2">
              <label><input type="radio" name="weight" value="yes" onChange={handleChange} /> Oui</label>
              <label><input type="radio" name="weight" value="no" onChange={handleChange} /> Non</label>
            </div>
          </div>

          {/* Question 3 */}
          <div>
            <p className="font-semibold">Avez-vous donné du sang au cours des 3 derniers mois ?</p>
            <div className="flex gap-4 mt-2">
              <label><input type="radio" name="recentDonation" value="yes" onChange={handleChange} /> Oui</label>
              <label><input type="radio" name="recentDonation" value="no" onChange={handleChange} /> Non</label>
            </div>
          </div>

          {/* Question 4 */}
          <div>
            <p className="font-semibold">Souffrez-vous actuellement d’une maladie infectieuse ?</p>
            <div className="flex gap-4 mt-2">
              <label><input type="radio" name="illness" value="yes" onChange={handleChange} /> Oui</label>
              <label><input type="radio" name="illness" value="no" onChange={handleChange} /> Non</label>
            </div>
          </div>

          {/* Question 5 */}
          <div>
            <p className="font-semibold">Prenez-vous actuellement des médicaments ?</p>
            <div className="flex gap-4 mt-2">
              <label><input type="radio" name="medication" value="yes" onChange={handleChange} /> Oui</label>
              <label><input type="radio" name="medication" value="no" onChange={handleChange} /> Non</label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl shadow mt-4 transition duration-300"
          >
            Vérifier mon éligibilité
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 border-l-4 border-red-500 text-gray-800 rounded">
            <strong>Résultat :</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
}

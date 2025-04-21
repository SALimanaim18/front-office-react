import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function DonorEligibilityPage() {
  const [responses, setResponses] = useState({
    age: "",
    weight: "",
    recentDonation: "",
    illness: "",
    medication: "",
    bloodPressure: "",
    pregnancy: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isEligible, setIsEligible] = useState(false);
  const [result, setResult] = useState(null);
  const [showNext, setShowNext] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérification d'éligibilité
    const eligible =
      responses.age === "yes" &&
      responses.weight === "yes" &&
      responses.recentDonation === "no" &&
      responses.illness === "no" &&
      responses.medication === "no" &&
      responses.bloodPressure === "yes" &&
      responses.pregnancy === "no";

    setIsEligible(eligible);

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Rapport d'éligibilité au don de sang", 20, 20);
    pdf.setFontSize(12);

    Object.entries(responses).forEach(([key, value], index) => {
      pdf.text(`${key} : ${value}`, 20, 40 + index * 10);
    });

    pdf.text(
      `Résultat : ${eligible ? "Éligible" : "Non éligible"} pour le don de sang.`,
      20,
      100
    );

    pdf.save("rapport_eligibilite.pdf");

    if (eligible) {
      setResult("✅ Vous êtes éligible ! Rapport téléchargé.");
      setShowNext(true);
    } else {
      setResult("❌ Désolé, vous n'êtes pas éligible. Rapport téléchargé.");
    }
  };

  const handleRedirect = () => {
    navigate("/devenir-donneur");
  };

  // Questions par étape
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <p className="text-lg font-semibold text-red-600">Votre âge</p>
            <p className="text-md text-gray-700">Avez-vous plus de 18 ans ?</p>
            <label>
              <input
                type="radio"
                name="age"
                value="yes"
                checked={responses.age === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="age"
                value="no"
                checked={responses.age === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        );
      case 2:
        return (
          <div>
            <p className="text-lg font-semibold text-red-600">Votre poids</p>
            <p className="text-md text-gray-700">Pesez-vous plus de 50 kg ?</p>
            <label>
              <input
                type="radio"
                name="weight"
                value="yes"
                checked={responses.weight === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="weight"
                value="no"
                checked={responses.weight === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        );
      case 3:
        return (
          <div>
            <p className="text-lg font-semibold text-red-600">Dernier don</p>
            <p className="text-md text-gray-700">Avez-vous donné du sang dans les 3 derniers mois ?</p>
            <label>
              <input
                type="radio"
                name="recentDonation"
                value="yes"
                checked={responses.recentDonation === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="recentDonation"
                value="no"
                checked={responses.recentDonation === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        );
      case 4:
        return (
          <div>
            <p className="text-lg font-semibold text-red-600">Maladies</p>
            <p className="text-md text-gray-700">Souffrez-vous d'une maladie chronique ?</p>
            <label>
              <input
                type="radio"
                name="illness"
                value="yes"
                checked={responses.illness === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="illness"
                value="no"
                checked={responses.illness === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        );
      case 5:
        return (
          <div>
            <p className="text-lg font-semibold text-red-600">Médicaments</p>
            <p className="text-md text-gray-700">Prenez-vous des médicaments régulièrement ?</p>
            <label>
              <input
                type="radio"
                name="medication"
                value="yes"
                checked={responses.medication === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="medication"
                value="no"
                checked={responses.medication === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        );
      case 6:
        return (
          <div>
            <p className="text-lg font-semibold text-red-600">Pression artérielle</p>
            <p className="text-md text-gray-700">Avez-vous une pression artérielle normale ?</p>
            <label>
              <input
                type="radio"
                name="bloodPressure"
                value="yes"
                checked={responses.bloodPressure === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="bloodPressure"
                value="no"
                checked={responses.bloodPressure === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        );
      case 7:
        return (
          <div>
            <p className="text-lg font-semibold text-red-600">Grossesse</p>
            <p className="text-md text-gray-700">Êtes-vous enceinte ou avez-vous accouché récemment ?</p>
            <label>
              <input
                type="radio"
                name="pregnancy"
                value="yes"
                checked={responses.pregnancy === "yes"}
                onChange={handleChange}
                className="mr-2"
              />
              Oui
            </label>
            <label>
              <input
                type="radio"
                name="pregnancy"
                value="no"
                checked={responses.pregnancy === "no"}
                onChange={handleChange}
                className="mr-2"
              />
              Non
            </label>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-center text-white mb-6">Évaluation de l'éligibilité au don de sang</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-6">
        {renderStep()}
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleNext}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Suivant
          </button>
        </div>
      </form>

      {result && <p className="mt-4 text-center font-semibold text-white">{result}</p>}

      {showNext && (
        <div className="mt-6 text-center">
          <button
            onClick={handleRedirect}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700"
          >
            Devenir Donneur
          </button>
        </div>
      )}
    </div>
  );
}

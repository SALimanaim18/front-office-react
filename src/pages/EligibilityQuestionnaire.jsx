// src/pages/EligibilityQuestionnaire.jsx

"use client";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function EligibilityQuestionnaire() {
  const { id: requestId } = useParams(); 
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  const questionSections = [
    {
      id: "ageWeight",
      title: "Âge et poids",
      questions: [
        { id: "isOver18", text: "Avez-vous 18 ans ou plus ?", eligibleAnswer: "oui" },
        { id: "isOver50kg", text: "Pesez-vous 50 kg ou plus ?", eligibleAnswer: "oui" }
      ]
    },
    {
      id: "generalHealth",
      title: "Santé générale",
      questions: [
        { id: "isHealthy", text: "Êtes-vous en bonne santé aujourd'hui ?", eligibleAnswer: "oui" },
        { id: "hadRecentInfection", text: "Avez-vous eu une infection ou de la fièvre récemment ?", eligibleAnswer: "non" }
      ]
    },
    {
      id: "medicalHistory",
      title: "Antécédents médicaux",
      questions: [
        { id: "hasMedicalCondition", text: "Avez-vous déjà eu l'hépatite, le VIH, le paludisme ou un cancer ?", eligibleAnswer: "non" }
      ]
    },
    {
      id: "riskBehaviors",
      title: "Comportements à risque",
      questions: [
        { id: "hasRiskyBehavior", text: "Avez-vous eu des relations sexuelles à risque récemment ?", eligibleAnswer: "non" }
      ]
    },
    {
      id: "recentTravel",
      title: "Voyages récents",
      questions: [
        { id: "traveledToRiskZone", text: "Avez-vous voyagé dans une zone à risque récemment ?", eligibleAnswer: "non" }
      ]
    },
    {
      id: "recentTattoo",
      title: "Tatouage/Piercing récent",
      questions: [
        { id: "hasRecentTattoo", text: "Avez-vous eu un tatouage ou un piercing au cours des 4 derniers mois ?", eligibleAnswer: "non" }
      ]
    },
    {
      id: "recentDonation",
      title: "Don récent",
      questions: [
        { id: "donatedRecently", text: "Avez-vous donné du sang au cours des 8 dernières semaines ?", eligibleAnswer: "non" }
      ]
    }
  ];

  const totalQuestions = questionSections.reduce((total, section) => total + section.questions.length, 0);

  const handleAnswerChange = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    setAllQuestionsAnswered(Object.keys(newAnswers).length === totalQuestions);
  };

  const checkEligibility = () => {
    return questionSections.every(section =>
      section.questions.every(question => answers[question.id] === question.eligibleAnswer)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
    if (checkEligibility()) {
      navigate(`/request-confirmation/${requestId}`);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setShowResult(false);
    setAllQuestionsAnswered(false);
  };

  const colors = {
    primary: "#d93f31",
    secondary: "#b2d3e1",
    red: "#dc2626",
    green: "#10b981"
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
          <div style={{ backgroundColor: colors.primary }} className="px-6 py-5">
            <h1 className="text-2xl font-bold text-white text-center">Questionnaire d'Éligibilité</h1>
          </div>

          {!showResult ? (
            <div className="px-6 py-8 space-y-8">
              {questionSections.map((section) => (
                <div key={section.id}>
                  <h2 className="text-lg font-semibold mb-3 text-[#d93f31]">{section.title}</h2>
                  <div className="space-y-4">
                    {section.questions.map((question) => (
                      <div key={question.id} className="bg-[#b2d3e11a] p-4 rounded-md border border-[#b2d3e1]">
                        <p className="font-medium mb-2">{question.text}</p>
                        <div className="flex gap-6">
                          {["oui", "non"].map((val) => (
                            <label key={val} className="flex items-center cursor-pointer text-sm">
                              <input
                                type="radio"
                                name={question.id}
                                value={val}
                                checked={answers[question.id] === val}
                                onChange={() => handleAnswerChange(question.id, val)}
                                className="mr-2 h-4 w-4 text-[#d93f31]"
                                style={{ accentColor: colors.primary }}
                              />
                              {val.charAt(0).toUpperCase() + val.slice(1)}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition duration-300 ${
                  allQuestionsAnswered ? "bg-[#dc2626] hover:bg-red-700" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Vérifier l'éligibilité
              </button>
            </div>
          ) : (
            <div className="px-6 py-8">
              {checkEligibility() ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                  <h2 className="text-lg font-bold text-green-800">Vous êtes probablement éligible</h2>
                  <p className="mt-2 text-sm text-green-700">
                    Vos réponses indiquent que vous pourriez être apte à donner votre sang.
                  </p>
                </div>
              ) : (
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                  <h2 className="text-lg font-bold text-red-800">Vous n’êtes pas éligible pour le moment</h2>
                  <p className="mt-2 text-sm text-red-700">
                    Selon vos réponses, vous ne remplissez pas les critères actuels.
                  </p>
                </div>
              )}
              <button
                onClick={handleReset}
                className="mt-6 w-full py-3 px-4 rounded-lg text-white font-semibold bg-[#d93f31] hover:bg-[#320302] transition duration-300"
              >
                Recommencer le questionnaire
              </button>
            </div>
          )}

          <div className="px-6 py-4 bg-[#d93f31]">
            <p className="text-white text-sm text-center">
              Ce questionnaire est informatif. L'éligibilité réelle est déterminée par un professionnel de santé.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

import React from "react";
import { FileEdit, Bell, Building, Heart } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FileEdit className="w-12 h-12 text-white" />,
      title: "Publier une demande",
      description: "Créez une demande de don de sang en spécifiant le groupe sanguin et l'hôpital."
    },
    {
      icon: <Bell className="w-12 h-12 text-white" />,
      title: "Être alerté",
      description: "Les donneurs compatibles reçoivent une notification et peuvent répondre rapidement."
    },
    {
      icon: <Building className="w-12 h-12 text-white" />,
      title: "Se présenter au centre",
      description: "Le donneur se rend au centre de transfusion indiqué pour effectuer son don."
    },
    {
      icon: <Heart className="w-12 h-12 text-white" />,
      title: "Sauver une vie",
      description: "Le sang est transfusé au patient, contribuant à lui sauver la vie."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-sangblue-light/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sangred-DEFAULT mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SangConnect simplifie le processus de don de sang en connectant directement les demandeurs et les donneurs.
          </p>
        </div>

        <div className="relative">
          {/* Ligne de connexion entre les étapes */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-sangblue-light transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 bg-sangred-DEFAULT rounded-full flex items-center justify-center mb-6 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

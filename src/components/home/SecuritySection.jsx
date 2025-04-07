import React from "react";
import { Shield, Lock, CheckCircle } from "lucide-react";

const SecuritySection = () => {
const securityFeatures = [
    {
    icon: <Shield className="w-8 h-8 text-sangred-DEFAULT" />,
    title: "Validation médicale",
    description: "Toutes les demandes sont vérifiées par des professionnels de santé partenaires."
    },
    {
    icon: <Lock className="w-8 h-8 text-sangred-DEFAULT" />,
    title: "Données sécurisées",
    description: "Vos informations personnelles et médicales sont protégées et cryptées."
    },
    {
    icon: <CheckCircle className="w-8 h-8 text-sangred-DEFAULT" />,
    title: "Modération active",
    description: "Notre équipe veille à ce que la plateforme soit utilisée de manière éthique."
    }
];

return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-sangred-DEFAULT mb-4">
              Sécurité & Modération
            </h2>
            <p className="text-gray-600">
              Nous prenons très au sérieux la sécurité de nos utilisateurs et l'intégrité de notre plateforme.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-3">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;

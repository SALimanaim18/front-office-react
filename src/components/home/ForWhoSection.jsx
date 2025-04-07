import React from "react";
import { User, Heart, Hospital, Building } from "lucide-react";

const ForWhoSection = () => {
  const audiences = [
    {
      icon: <User className="w-12 h-12 text-sangred-DEFAULT" />,
      title: "Donneurs",
      description: "Pour tous les volontaires qui souhaitent donner leur sang et sauver des vies."
    },
    {
      icon: <Heart className="w-12 h-12 text-sangred-DEFAULT" />,
      title: "Familles",
      description: "Pour les proches des patients nécessitant une transfusion urgente."
    },
    {
      icon: <Hospital className="w-12 h-12 text-sangred-DEFAULT" />,
      title: "Hôpitaux",
      description: "Pour les établissements de santé ayant besoin de mobiliser rapidement des donneurs."
    },
    {
      icon: <Building className="w-12 h-12 text-sangred-DEFAULT" />,
      title: "Centres agréés",
      description: "Pour les centres de transfusion qui peuvent diffuser leurs besoins spécifiques."
    }
  ];

  return (
    <section className="py-16 bg-sangblue-light/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sangred-DEFAULT mb-4">
            Pour qui ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SangConnect est conçu pour tous les acteurs impliqués dans le processus du don de sang.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {audience.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {audience.title}
              </h3>
              <p className="text-gray-600">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;

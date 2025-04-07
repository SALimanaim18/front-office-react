import React from "react";
import { Heart, Users, Clock, Shield } from "lucide-react";

const WhyDonateSection = () => {
  const reasons = [
    {
      icon: <Heart className="w-12 h-12 text-sangred-DEFAULT" />,
      title: "Sauver des vies",
      description: "Un seul don peut sauver jusqu'à trois vies et aider des patients en situation critique."
    },
    {
      icon: <Users className="w-12 h-12 text-sangred-DEFAULT" />,
      title: "Aider votre communauté",
      description: "Votre don peut aider un voisin, un ami ou un membre de votre famille en cas d'urgence."
    },
    {
      icon: <Clock className="w-12 h-12 text-sangred-DEFAULT" />,
      title: "15 minutes suffisent",
      description: "Le processus de don ne prend que 15 minutes, mais son impact dure bien plus longtemps."
    },
    {
      icon: <Shield className="w-12 h-12 text-sangred-DEFAULT" />,
      title: "C'est sans danger",
      description: "Le processus est sécurisé, supervisé par des professionnels de la santé qualifiés."
    }
  ];

  const testimonials = [
    {
      quote: "Grâce à SangConnect, j'ai trouvé un donneur compatible en moins de 2 heures pour mon père.",
      author: "Amina K., Casablanca"
    },
    {
      quote: "Donner mon sang régulièrement est devenu facile avec les alertes de la plateforme.",
      author: "Youssef M., Rabat"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-sangred-DEFAULT mb-4">
            Pourquoi donner son sang ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Le don de sang est un acte simple mais puissant qui peut avoir un impact immense 
            sur la vie des personnes dans le besoin.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-center">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-sangblue-light/20 rounded-2xl p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-white shadow-md rounded-full flex items-center justify-center">
              <div className="text-3xl font-bold text-sangred-DEFAULT">1=3</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-center mb-8">
            Un seul don peut sauver jusqu'à trois vies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-md relative"
              >
                <div className="text-sangred-DEFAULT text-5xl font-serif absolute -top-4 left-4 opacity-20">"</div>
                <p className="text-gray-700 italic mb-4 relative z-10">
                  {testimonial.quote}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDonateSection;

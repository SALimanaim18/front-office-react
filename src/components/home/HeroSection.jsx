import React from "react";
import { useNavigate } from "react-router-dom"; // 🔁 Pour la navigation
import Button from "../common/Button";

const HeroSection = () => {
  const navigate = useNavigate(); // 🔁 Hook de navigation

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-sangblue-light/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-sangred-DEFAULT mb-6 leading-tight animate-fade-in">
              Connecter des vies,<br />
              <span className="text-sangblue-dark">une goutte à la fois.</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
              SangConnect est la première plateforme sociale marocaine qui connecte directement les donneurs, les demandeurs et les centres de transfusion sanguine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/creer-demande")}
              >
                Créer une demande
              </Button>
              <Button variant="outline" size="lg">
                Je veux donner
              </Button>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="w-full h-72 md:h-96 bg-gradient-to-br from-sangred-light/20 to-sangblue-light/30 rounded-2xl overflow-hidden shadow-lg relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000')] bg-cover bg-center opacity-80 mix-blend-overlay"></div>
              
              {/* Blood Drop Overlay */}
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-sangred-DEFAULT rounded-full opacity-20 transform translate-x-1/4 translate-y-1/4"></div>
              
              {/* Statistics overlay */}
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-sangred-DEFAULT">1 don = 3 vies</div>
                <div className="text-sm text-gray-600">sauvées</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute top-1/4 left-0 w-24 h-24 bg-sangblue-light rounded-full opacity-20 -translate-x-1/2"></div>
      <div className="hidden md:block absolute bottom-1/4 right-0 w-32 h-32 bg-sangred-DEFAULT rounded-full opacity-10 translate-x-1/2"></div>
    </section>
  );
};

export default HeroSection;

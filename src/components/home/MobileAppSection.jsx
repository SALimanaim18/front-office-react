import React, { useState } from "react";
import Button from "../common/Button";
import { Smartphone, Send } from "lucide-react";

const MobileAppSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Email submitted:", email);
    // Reset form
    setEmail("");
    // Show success message or toast
  };

  return (
    <section className="py-16 bg-sangblue-light/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Mobile illustration */}
            <div className="md:w-1/3 bg-sangred-DEFAULT p-8 flex items-center justify-center">
              <div className="relative">
                <Smartphone className="w-24 h-24 text-white" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full animate-pulse-slow"></div>
              </div>
            </div>
            
            {/* Content */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-sangred-DEFAULT mb-4">
                Application mobile bientôt disponible
              </h2>
              <p className="text-gray-600 mb-6">
                Soyez alerté en temps réel des demandes de sang compatibles avec votre groupe sanguin. 
                Recevez une notification dès qu'une demande urgente est publiée près de chez vous.
              </p>
              
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Votre adresse email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sangred-light"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    variant="primary"
                    className="flex items-center justify-center gap-2"
                  >
                    <span>M'alerter</span>
                    <Send size={16} />
                  </Button>
                </div>
              </form>
              
              <p className="text-xs text-gray-500">
                En vous inscrivant, vous acceptez de recevoir des emails concernant le lancement de notre application.
                Vous pourrez vous désinscrire à tout moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;

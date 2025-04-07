import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et slogan */}
          <div>
            <div className="text-2xl font-bold text-sangred-DEFAULT mb-3">
              Sang<span className="text-sangblue-DEFAULT">Connect</span>
            </div>
            <p className="text-gray-600 mb-6">
              Connecter des vies, une goutte à la fois.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-sangred-DEFAULT">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sangred-DEFAULT">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-sangred-DEFAULT">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">SangConnect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">À propos</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Équipe</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Nos valeurs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Partenaires</a></li>
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Centres de don</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Guide du donneur</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Compatibilité sanguine</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Nous contacter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Mentions légales</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Confidentialité</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sangred-DEFAULT">Politique des cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>© 2025 SangConnect – Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

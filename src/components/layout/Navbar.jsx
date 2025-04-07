import React, { useState } from "react";
import Button from "../common/Button";
import { Bell, Menu, X } from "lucide-react";
import { cn } from '../../lib/utils';

const Navbar = () => {
const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
};

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-sangred-DEFAULT">
              Sang<span className="text-sangblue-DEFAULT">Connect</span>
            </span>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-sangred-DEFAULT">
              Accueil
            </a>
            <a href="#" className="text-gray-700 hover:text-sangred-DEFAULT">
              Voir les demandes
            </a>
            <a href="#" className="text-gray-700 hover:text-sangred-DEFAULT">
              Créer une demande
            </a>
            <a href="#" className="text-gray-700 hover:text-sangred-DEFAULT">
              Devenir donneur
            </a>
          </nav>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <Bell size={20} className="text-sangred-DEFAULT" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-sangred-DEFAULT rounded-full"></span>
            </button>
            <Button variant="outline" size="sm">Se connecter</Button>
            <Button variant="primary" size="sm">S'inscrire</Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 focus:outline-none"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 pt-16 px-4 md:hidden transform transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-4 mt-8">
          {["Accueil", "Voir les demandes", "Créer une demande", "Devenir donneur"].map((item, index) => (
            <a
              key={index}
              href="#"
              className="py-2 px-4 text-lg border-b border-gray-100 text-gray-700"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-3 px-4">
          <Button variant="outline" fullWidth>
            Se connecter
          </Button>
          <Button variant="primary" fullWidth>
            S'inscrire
          </Button>
          <div className="flex items-center mt-4 py-2 px-4 bg-gray-50 rounded-lg">
            <Bell size={20} className="text-sangred-DEFAULT mr-3" />
            <span className="text-gray-700">Notifications</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

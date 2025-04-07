"use client"

import { useState, useEffect } from "react"
import { Menu, X, Bell, LogIn, User } from "lucide-react"
import Button from "../common/Button"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center group">
            <div className="h-10 w-10 rounded-full bg-[#460904] flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="ml-2 text-xl font-bold">
              <span className="text-[#460904] group-hover:text-[#5a0b06] transition-colors">Sang</span>
              <span className="text-[#b2d3e1] group-hover:text-[#8fb9cc] transition-colors">Connect</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#"
              className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all"
            >
              Accueil
            </a>
            <a
              href="#requests"
              className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all"
            >
              Voir les demandes
            </a>
            <a
              href="#create"
              className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all"
            >
              Créer une demande
            </a>
            <a
              href="#donor"
              className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all"
            >
              Devenir donneur
            </a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors group">
              <Bell size={20} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#460904] group-hover:animate-ping"></span>
            </button>
            <Button variant="outline" className="flex items-center">
              <LogIn size={16} className="mr-1" />
              Se connecter
            </Button>
            <Button>
              <User size={16} className="mr-1" />
              S'inscrire
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t mt-3 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-gray-800 hover:text-[#460904] font-medium transition-colors">
                Accueil
              </a>
              <a href="#requests" className="text-gray-800 hover:text-[#460904] font-medium transition-colors">
                Voir les demandes
              </a>
              <a href="#create" className="text-gray-800 hover:text-[#460904] font-medium transition-colors">
                Créer une demande
              </a>
              <a href="#donor" className="text-gray-800 hover:text-[#460904] font-medium transition-colors">
                Devenir donneur
              </a>
              <div className="flex items-center space-x-4 pt-2">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell size={20} className="text-gray-700" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#460904]"></span>
                </button>
                <Button variant="outline" className="flex items-center">
                  <LogIn size={16} className="mr-1" />
                  Se connecter
                </Button>
                <Button>
                  <User size={16} className="mr-1" />
                  S'inscrire
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar


"use client"

import { useState, useEffect } from "react"
import { Menu, X, Bell, KeyRound, UserRoundPlus } from 'lucide-react'
import { Link } from "react-router-dom"
import Button from "../common/Button2"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-3"}`}>
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

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all">
              Accueil
            </Link>
            <Link to="/demandes" className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all">
              Voir les demandes
            </Link>
            <Link to="/creer-demande" className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all">
              Créer une demande
            </Link>
            <Link to="/devenir-donneur" className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all">
              Devenir donneur
            </Link>
          </nav>

          {/* Actions utilisateur */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors group-hover:bg-gray-100">
                <Bell size={28} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#460904] group-hover:animate-ping"></span>
              </button>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Notifications
              </div>
            </div>

            <div className="relative group">
              <Link to="/login">
                <Button variant="outline" className="p-2.5 rounded-full h-12 w-12 flex items-center justify-center" aria-label="Se connecter">
                  <KeyRound size={32} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
                </Button>
              </Link>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Se connecter
              </div>
            </div>

            <div className="relative group">
              <Link to="/register">
                <Button className="p-2.5 rounded-full h-12 w-12 flex items-center justify-center bg-[#460904] hover:bg-[#5a0b06]">
                <UserRoundPlus size={32} className="text-white" />
                </Button>
              </Link>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                S'inscrire
              </div>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t mt-3 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-800 hover:text-[#460904] font-medium transition-colors">
                Accueil
              </Link>
              <Link to="/demandes" className="text-gray-800 hover:text-[#460904] font-medium transition-colors">
                Voir les demandes
              </Link>
              <Link to="/creer-demande" className="text-gray-800 hover:text-[#460904] font-medium transition-colors">
                Créer une demande
              </Link>
              <Link to="/devenir-donneur" className="text-gray-800 hover:text-[#460904] font-medium transition-colors">
                Devenir donneur
              </Link>
              <div className="flex items-center space-x-4 pt-3">
                <Link to="/login">
                  <Button variant="outline" className="p-2.5 rounded-full h-12 w-12 flex items-center justify-center">
                    <KeyRound size={32} className="text-gray-700" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="p-2.5 rounded-full h-12 w-12 flex items-center justify-center bg-[#460904] hover:bg-[#5a0b06]">
                    <UserRoundPlus size={32} className="text-white" />
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

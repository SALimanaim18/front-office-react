"use client"

import { useState, useEffect } from "react"
import { Menu, X, Bell, KeyRound, UserRoundPlus, User, LogOut } from 'lucide-react'
import { Link } from "react-router-dom"
import Button from "../common/Button"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-3"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center group">
            <div className="h-10 w-10 rounded-full bg-[#460904] flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="ml-2 text-xl font-bold">
              <span className="text-[#460904] group-hover:text-[#5a0b06] transition-colors">Sang</span>
              <span className="text-[#b2d3e1] group-hover:text-[#8fb9cc] transition-colors">Connect</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all">Accueil</a>
            <a href="#requests" className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all">Voir les demandes</a>
            {isLoggedIn && (
              <>
                <a href="#create" className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all">Créer une demande</a>
                <a href="#donor" className="text-gray-800 hover:text-[#460904] font-medium transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#460904] after:transition-all">Devenir donneur</a>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative group">
              <button className="p-2.5 rounded-full hover:bg-gray-100 transition-colors group-hover:bg-gray-100">
                <Bell size={28} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#460904] group-hover:animate-ping"></span>
              </button>
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Notifications</div>
            </div>

            {!isLoggedIn ? (
              <>
                <div className="relative group">
                  <Link to="/login">
                    <Button variant="outline" className="p-2.5 rounded-full h-12 w-12 flex items-center justify-center" aria-label="Se connecter">
                      <KeyRound size={32} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
                    </Button>
                  </Link>
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Se connecter</div>
                </div>
                <div className="relative group">
                  <Link to="/register">
                    <Button className="p-2.5 rounded-full h-12 w-12 flex items-center justify-center bg-[#460904] hover:bg-[#5a0b06]" aria-label="S'inscrire">
                      <UserRoundPlus size={32} className="text-white" />
                    </Button>
                  </Link>
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">S'inscrire</div>
                </div>
              </>
            ) : (
              <>
                <div className="relative group">
                  <Link to="/profile">
                    <Button variant="outline" className="p-2.5 rounded-full h-12 w-12 flex items-center justify-center" aria-label="Profil">
                      <User size={32} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
                    </Button>
                  </Link>
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Profil</div>
                </div>
                <div className="relative group">
                  <Button onClick={handleLogout} className="p-2.5 rounded-full h-12 w-12 flex items-center justify-center bg-red-600 hover:bg-red-700" aria-label="Déconnexion">
                    <LogOut size={32} className="text-white" />
                  </Button>
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Déconnexion</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

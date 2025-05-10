"use client"

import { useState, useEffect } from "react"
import { 
  Menu, 
  X, 
  BellRing, 
  KeySquare, 
  UserPlus, 
  UserCircle, 
  LogOut,
  Home,
  FileText,
  PlusSquare
} from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../common/Button2"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)

    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)

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
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center group">
              <div className="h-10 w-10 rounded-full bg-[#460904] flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-2 text-xl font-bold">
                <span className="text-[#460904] group-hover:text-[#5a0b06] transition-colors">Sang</span>
                <span className="text-[#b2d3e1] group-hover:text-[#8fb9cc] transition-colors">Connect</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="flex items-center text-gray-700 hover:text-[#460904] font-medium transition-colors group">
                <Home size={18} className="mr-1.5 group-hover:text-[#460904]" />
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-[#460904] after:transition-all">
                  Accueil
                </span>
              </Link>
              
              {isLoggedIn && (
                <>
                  <Link to="/demandes" className="flex items-center text-gray-700 hover:text-[#460904] font-medium transition-colors group">
                    <FileText size={18} className="mr-1.5 group-hover:text-[#460904]" />
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-[#460904] after:transition-all">
                      Demandes
                    </span>
                  </Link>
                  
                  <Link to="/FormulaireDemandeSang" className="flex items-center text-gray-700 hover:text-[#460904] font-medium transition-colors group">
                    <PlusSquare size={18} className="mr-1.5 group-hover:text-[#460904]" />
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-[#460904] after:transition-all">
                      Créer une demande
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <div className="relative group">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors group-hover:bg-gray-100 flex items-center justify-center">
                      <BellRing size={22} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
                      <span className="absolute top-0 right-0.5 h-2 w-2 rounded-full bg-[#460904]"></span>
                    </button>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Notifications
                    </div>
                  </div>

                  {/* Profil */}
                  <div className="relative group">
                    <Link to="/profile">
                      <div className="flex items-center space-x-1 hover:bg-gray-50 transition-colors px-3 py-2 rounded-md">
                        <UserCircle size={22} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
                        <span className="text-gray-700 group-hover:text-[#460904] font-medium text-sm">Mon compte</span>
                        <span className="h-4 w-4 bg-[#460904] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">1</span>
                        </span>
                      </div>
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="relative group">
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center space-x-1.5 text-gray-600 hover:text-[#460904] transition-colors px-3 py-2 hover:bg-gray-50 rounded-md" 
                      aria-label="Déconnexion"
                    >
                      <LogOut size={20} strokeWidth={2} />
                      <span className="font-medium text-sm">Quitter</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Login */}
                  <div className="relative group">
                    <Link to="/login">
                      <Button variant="outline" className="p-2 rounded-lg flex items-center justify-center border border-gray-300 hover:border-[#460904] h-10">
                        <KeySquare size={22} className="text-gray-700 group-hover:text-[#460904] transition-colors" />
                        <span className="ml-2 font-medium">Se connecter</span>
                      </Button>
                    </Link>
                  </div>

                  {/* Register */}
                  <div className="relative group">
                    <Link to="/register">
                      <Button className="p-2 rounded-lg flex items-center justify-center bg-[#460904] hover:bg-[#5a0b06] h-10">
                        <UserPlus size={22} className="text-white" />
                        <span className="ml-2 text-white font-medium">S'inscrire</span>
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-2 bg-white border-t mt-2">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="flex items-center text-gray-700 hover:text-[#460904] font-medium p-2 hover:bg-gray-50 rounded-md">
                <Home size={20} className="mr-3" />
                Accueil
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link to="/demandes" className="flex items-center text-gray-700 hover:text-[#460904] font-medium p-2 hover:bg-gray-50 rounded-md">
                    <FileText size={20} className="mr-3" />
                    Voir les demandes
                  </Link>
                  
                  <Link to="/FormulaireDemandeSang" className="flex items-center text-gray-700 hover:text-[#460904] font-medium p-2 hover:bg-gray-50 rounded-md">
                    <PlusSquare size={20} className="mr-3" />
                    Créer une demande
                  </Link>
                  
                  <Link to="/profile" className="flex items-center text-gray-700 hover:text-[#460904] font-medium p-2 hover:bg-gray-50 rounded-md">
                    <UserCircle size={20} className="mr-3" />
                    Mon compte
                    <span className="ml-2 h-4 w-4 bg-[#460904] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </span>
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-[#460904] font-medium p-2 hover:bg-gray-50 rounded-md"
                  >
                    <LogOut size={20} className="mr-3" />
                    Quitter
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center text-gray-700 hover:text-[#460904] font-medium p-2 hover:bg-gray-50 rounded-md">
                    <KeySquare size={20} className="mr-3" />
                    Se connecter
                  </Link>
                  
                  <Link to="/register" className="flex items-center text-[#460904] hover:text-[#5a0b06] font-medium p-2 hover:bg-gray-50 rounded-md">
                    <UserPlus size={20} className="mr-3" />
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
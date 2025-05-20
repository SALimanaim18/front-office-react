"use client";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  DocumentTextIcon,
  PlusIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  KeyIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { NotificationIcon } from "./NotificationIcon"; // Adjust path as needed

// Custom Button component
const Button = ({ children, variant = "default", className = "", ...props }) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50";
  const variants = {
    default: "bg-primary text-white hover:bg-primaryHover px-2 py-2",
    outline: "border border-gray-300 text-gray-800 hover:border-primary hover:text-primary px-2 py-2",
  };
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken"); // Changed from "token" to "authToken"
      const storedUserId = localStorage.getItem("userId");
      const storedUserRole = localStorage.getItem("userRole");

      setIsLoggedIn(!!token);
      if (storedUserId) setUserId(storedUserId);
      if (storedUserRole) setUserRole(storedUserRole);
    };

    checkLoginStatus(); // Run on mount
    window.addEventListener("storage", checkLoginStatus); // Sync with other tabs
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    // Dispatch a custom event to update state immediately after login in the same tab
    const handleLoginEvent = () => checkLoginStatus();
    window.addEventListener("loginEvent", handleLoginEvent);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("loginEvent", handleLoginEvent);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const token = localStorage.getItem("authToken"); // Changed from "token" to "authToken"
      setIsLoggedIn(!!token);
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("centerId");
    setIsLoggedIn(false);
    setUserId(null);
    setUserRole(null);
    navigate("/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg py-2" : "bg-white/95 py-3"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center group">
              <div className="h-10 w-10 rounded-full bg-[#d93f31] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-3 text-xl font-semibold tracking-tight">
                <span className="text-primary group-hover:text-primaryHover transition-colors">
                  Sang
                </span>
                <span className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  Connect
                </span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <div className="flex items-center space-x-8">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-primary font-medium transition-colors duration-200 group"
              >
                <HomeIcon className="w-5 h-5 mr-2 group-hover:text-primary" />
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-primary after:transition-all duration-200">
                  Accueil
                </span>
              </Link>
              {isLoggedIn && (
                <>
                  <Link
                    to="/demandes"
                    className="flex items-center text-gray-600 hover:text-primary font-medium transition-colors duration-200 group"
                  >
                    <DocumentTextIcon className="w-5 h-5 mr-2 group-hover:text-primary" />
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-primary after:transition-all duration-200">
                      Demandes
                    </span>
                  </Link>
                  <Link
                    to="/FormulaireDemandeSang"
                    className="flex items-center text-gray-600 hover:text-primary font-medium transition-colors duration-200 group"
                  >
                    <PlusIcon className="w-5 h-5 mr-2 group-hover:text-primary" />
                    <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-primary after:transition-all duration-200">
                      Créer une demande
                    </span>
                  </Link>
                  {userRole === "CENTER_MANAGER" && (
                    <Link
                      to="/admin/Index"
                      className="flex items-center text-gray-600 hover:text-primary font-medium transition-colors duration-200 group"
                    >
                      <DocumentTextIcon className="w-5 h-5 mr-2 group-hover:text-primary" />
                      <span className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 group-hover:after:w-full after:bg-primary after:transition-all duration-200">
                        Admin
                      </span>
                    </Link>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {userId && <NotificationIcon userId={userId} />}
                  <Link to="/Profil" className="group">
                    <div className="flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-200 px-3 py-2 rounded-lg">
                      <UserIcon className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors" />
                      <span className="text-gray-600 group-hover:text-primary font-medium text-sm">
                        Mon compte
                      </span>
                      <span className="h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">1</span>
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200 px-3 py-2 hover:bg-gray-100 rounded-lg"
                    aria-label="Déconnexion"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                    <span className="font-medium text-sm">Quitter</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="h-10 w-10 flex items-center justify-center"
                      title="Se connecter"
                      aria-label="Se connecter"
                    >
                      <KeyIcon className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button
                      className="h-10 w-10 flex items-center justify-center"
                      title="S'inscrire"
                      aria-label="S'inscrire"
                    >
                      <UserPlusIcon className="w-5 h-5" />
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              ) : (
                <Bars3Icon className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white border-t border-gray-100 animate-slide-in">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <HomeIcon className="w-5 h-5 mr-3" />
                Accueil
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/demandes"
                    className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <DocumentTextIcon className="w-5 h-5 mr-3" />
                    Demandes
                  </Link>
                  <Link
                    to="/FormulaireDemandeSang"
                    className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PlusIcon className="w-5 h-5 mr-3" />
                    Créer une demande
                  </Link>
                  {userRole === "CENTER_MANAGER" && (
                    <Link
                      to="/admin/Index"
                      className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <DocumentTextIcon className="w-5 h-5 mr-3" />
                      Admin
                    </Link>
                  )}
                  <Link
                    to="/Profil"
                    className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="w-5 h-5 mr-3" />
                    Mon compte
                    <span className="ml-2 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">1</span>
                    </span>
                  </Link>
                  {userId && (
                    <div className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg">
                      <NotificationIcon userId={userId} />
                      <span className="ml-3">Notifications</span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                    Quitter
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <KeyIcon className="w-5 h-5 mr-3" />
                    Se connecter
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center text-gray-600 hover:text-primary font-medium py-2 px-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserPlusIcon className="w-5 h-5 mr-3" />
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
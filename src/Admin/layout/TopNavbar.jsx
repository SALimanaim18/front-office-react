import React, { useState, useEffect, useRef } from 'react';
import {
  Bell, Search, User, LogOut, Settings, ChevronDown, Menu, X
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/api/userApi';

const TopNavbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Fermer le menu utilisateur si on clique dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Charger le vrai profil utilisateur via l'API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile)); // pour les autres composants
      } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const fullName = user?.firstName && user?.lastName
    ? `${user.firstName} ${user.lastName}`
    : 'Utilisateur';

  const userRole = user?.role || 'Utilisateur';

  const getInitials = () => {
    if (!user?.firstName || !user?.lastName) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="flex items-center">
        <button className="mr-4 md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="font-semibold text-xl text-[#d93f31] mr-4">Dashboard SangConnect</h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-[#d93f31] rounded-full"></span>
        </Button>

        <div className="relative" ref={userMenuRef}>
          <div
            className="flex items-center space-x-3 rounded-lg p-1.5 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">{fullName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-[#d93f31] flex items-center justify-center text-white font-medium">
              {getInitials()}
            </div>
            <ChevronDown className={`h-4 w-4 text-gray-500 hidden md:block transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
          </div>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div className="p-2 text-center border-b md:hidden">
                <p className="font-medium">{fullName}</p>
                <p className="text-xs text-gray-500">{userRole}</p>
              </div>
              <div className="py-1">
                <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => { setIsUserMenuOpen(false); navigate('/ProfilManager'); }}>
                  <User className="h-4 w-4 mr-2" />
                  Mon profil
                </button>
            
                <div className="border-t my-1"></div>
                <button className="flex items-center px-4 py-2 text-sm text-[#d93f31] hover:bg-gray-100 w-full text-left"
                  onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Quitter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;

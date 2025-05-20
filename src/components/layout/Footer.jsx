import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4 group">
              <div className="h-10 w-10 rounded-full bg-[#d93f31] flex items-center justify-center transform group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="ml-2 text-xl font-bold">
                <span className="text-[#d93f31] group-hover:text-[#5a0b06] transition-colors">Sang</span>
                <span className="text-[#b2d3e1] group-hover:text-[#8fb9cc] transition-colors">Connect</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">Connecter des vies, une goutte à la fois.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-[#d93f31] transition-colors transform hover:scale-110">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#d93f31] transition-colors transform hover:scale-110">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-[#d93f31] transition-colors transform hover:scale-110">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Voir les demandes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Créer une demande
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Devenir donneur
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Centres de don
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">À propos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Notre mission
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  L'équipe
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Partenaires
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Mentions légales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 hover:text-[#d93f31] transition-colors text-sm relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#d93f31] after:transition-all"
                >
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <Mail
                  size={18}
                  className="text-[#d93f31] mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transform transition-transform"
                />
                <span className="text-gray-600 text-sm group-hover:text-[#d93f31] transition-colors">
                  contact@sangconnect.ma
                </span>
              </li>
              <li className="flex items-start group">
                <Phone
                  size={18}
                  className="text-[#d93f31] mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transform transition-transform"
                />
                <span className="text-gray-600 text-sm group-hover:text-[#d93f31] transition-colors">
                  +212 5XX-XXXXXX
                </span>
              </li>
              <li className="flex items-start group">
                <MapPin
                  size={18}
                  className="text-[#d93f31] mr-3 flex-shrink-0 mt-0.5 group-hover:scale-110 transform transition-transform"
                />
                <span className="text-gray-600 text-sm group-hover:text-[#d93f31] transition-colors">
                  Casablanca, Maroc
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 SangConnect – Tous droits réservés.</p>
          <div className="flex items-center text-sm text-gray-500 group">
            <span>Fait avec</span>
            <Heart size={14} className="text-[#d93f31] mx-1 group-hover:animate-heartbeat" />
            <span>au Maroc</span>
            <span className="ml-1 group-hover:animate-bounce">🇲🇦</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


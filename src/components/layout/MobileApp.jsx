"use client"

import { useState } from "react"
import { Smartphone, Check } from "lucide-react"

const MobileApp = () => {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Here you would normally send the email to your backend
      setEmail("")
    }
  }

  return (
    <section className="py-16 bg-white" id="mobile-app">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="relative mx-auto w-64 h-[500px] transform hover:rotate-2 transition-transform">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-xl"></div>

              {/* Screen */}
              <div className="absolute inset-[3px] top-[14px] bottom-[14px] left-[3px] right-[3px] bg-gradient-to-b from-[#b2d3e1] to-white rounded-[2.8rem] overflow-hidden">
                {/* App content mockup */}
                <div className="p-4 h-full flex flex-col">
                  {/* Status bar */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-xs font-bold">9:41</div>
                    <div className="flex space-x-1">
                      <div className="w-4 h-4 rounded-full bg-[#460904]"></div>
                      <div className="w-4 h-4 rounded-full bg-[#460904] opacity-80"></div>
                      <div className="w-4 h-4 rounded-full bg-[#460904] opacity-60"></div>
                    </div>
                  </div>

                  {/* App header */}
                  <div className="flex items-center mb-6">
                    <div className="h-8 w-8 rounded-full bg-[#460904] flex items-center justify-center">
                      <span className="text-white font-bold text-xs">S</span>
                    </div>
                    <span className="ml-2 text-lg font-bold">
                      <span className="text-[#460904]">Sang</span>
                      <span className="text-[#b2d3e1]">Connect</span>
                    </span>
                  </div>

                  {/* App content */}
                  <div className="bg-white rounded-xl shadow-md p-3 mb-3 animate-fadeIn">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs font-bold text-[#460904]">Demande urgente</div>
                      <div className="text-xs text-gray-500">Il y a 5 min</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#460904] flex items-center justify-center text-white font-bold text-sm">
                        O+
                      </div>
                      <div className="ml-2">
                        <div className="text-xs font-semibold">CHU Ibn Rochd</div>
                        <div className="text-xs text-gray-500">Casablanca</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-md p-3 mb-3 animate-fadeIn animation-delay-200">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-xs font-bold text-gray-700">Demande</div>
                      <div className="text-xs text-gray-500">Il y a 30 min</div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#b2d3e1] flex items-center justify-center text-[#460904] font-bold text-sm">
                        A-
                      </div>
                      <div className="ml-2">
                        <div className="text-xs font-semibold">Hôpital Militaire</div>
                        <div className="text-xs text-gray-500">Rabat</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="bg-[#460904] text-white text-xs font-medium py-2 px-4 rounded-full text-center animate-pulse">
                      Je veux donner
                    </div>
                  </div>
                </div>
              </div>

              {/* Notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl"></div>
            </div>
          </div>

          <div className="md:w-1/2 order-1 md:order-2">
            <div className="mb-6 inline-block p-3 bg-[#b2d3e1]/20 rounded-full transform transition-transform hover:scale-110">
              <Smartphone className="h-10 w-10 text-[#460904]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#460904] mb-4">
              Application mobile bientôt disponible
            </h2>
            <p className="text-gray-600 mb-8">
              Restez connecté où que vous soyez. Notre application mobile vous permettra de recevoir des alertes en
              temps réel, de localiser les centres de don les plus proches et de suivre votre historique de dons.
            </p>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start animate-fadeIn">
                <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800">Merci pour votre inscription !</h3>
                  <p className="text-green-700 text-sm">
                    Vous serez parmi les premiers à être informés du lancement de notre application mobile.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gray-50 rounded-lg p-6 shadow-inner transform hover:scale-[1.01] transition-transform"
              >
                <h3 className="font-semibold text-gray-800 mb-3">Soyez informé du lancement</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="flex-grow px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#b2d3e1] focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#460904] text-white font-medium rounded-lg hover:bg-[#5a0b06] transition-all transform hover:scale-105"
                  >
                    M'inscrire
                  </button>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Nous respectons votre vie privée et ne partagerons jamais votre email.
                </p>
              </form>
            )}

            <div className="mt-8">
              <h3 className="font-semibold text-gray-800 mb-3">Fonctionnalités à venir</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center group">
                  <div className="h-8 w-8 rounded-full bg-[#b2d3e1]/30 flex items-center justify-center mr-3 group-hover:bg-[#b2d3e1]/50 transition-colors">
                    <Check className="h-4 w-4 text-[#460904]" />
                  </div>
                  <span className="text-gray-700 group-hover:text-[#460904] transition-colors">
                    Alertes en temps réel
                  </span>
                </div>
                <div className="flex items-center group">
                  <div className="h-8 w-8 rounded-full bg-[#b2d3e1]/30 flex items-center justify-center mr-3 group-hover:bg-[#b2d3e1]/50 transition-colors">
                    <Check className="h-4 w-4 text-[#460904]" />
                  </div>
                  <span className="text-gray-700 group-hover:text-[#460904] transition-colors">
                    Géolocalisation des centres
                  </span>
                </div>
                <div className="flex items-center group">
                  <div className="h-8 w-8 rounded-full bg-[#b2d3e1]/30 flex items-center justify-center mr-3 group-hover:bg-[#b2d3e1]/50 transition-colors">
                    <Check className="h-4 w-4 text-[#460904]" />
                  </div>
                  <span className="text-gray-700 group-hover:text-[#460904] transition-colors">Suivi de vos dons</span>
                </div>
                <div className="flex items-center group">
                  <div className="h-8 w-8 rounded-full bg-[#b2d3e1]/30 flex items-center justify-center mr-3 group-hover:bg-[#b2d3e1]/50 transition-colors">
                    <Check className="h-4 w-4 text-[#460904]" />
                  </div>
                  <span className="text-gray-700 group-hover:text-[#460904] transition-colors">
                    Rappels personnalisés
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MobileApp


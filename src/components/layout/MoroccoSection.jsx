const MoroccoSection = () => {
    return (
      <section className="py-16 bg-gradient-to-r from-[#b2d3e1]/30 to-white" id="morocco">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white p-4 rounded-full shadow-md transform hover:rotate-12 transition-transform">
                <span className="text-4xl">🇲🇦</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#460904] ml-4">La transfusion sanguine au Maroc</h2>
            </div>
  
            <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-[#460904] transform hover:scale-[1.01] transition-transform">
              <p className="text-gray-700 leading-relaxed mb-4">
                Au Maroc, le don de sang repose principalement sur des campagnes ponctuelles organisées dans les hôpitaux,
                les universités et les places publiques. Le{" "}
                <span className="font-semibold">Centre National de Transfusion Sanguine (CNTSH)</span>, en collaboration
                avec ses centres régionaux, gère l'ensemble du processus de collecte et distribution.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Pourtant, le pays fait face à une <span className="text-[#460904] font-semibold">pénurie chronique</span>,
                notamment pour les groupes sanguins rares. Il est urgent de{" "}
                <span className="text-[#460904] font-semibold">sensibiliser les jeunes</span>, de créer une culture du don
                régulier et d'utiliser des outils modernes pour mieux alerter et mobiliser.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                <span className="text-[#460904] font-bold">SangConnect</span> s'inscrit dans cette dynamique citoyenne en
                proposant une plateforme numérique, communautaire et éthique.
              </p>
  
              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-[#b2d3e1]/10 transition-colors group">
                  <div className="text-2xl font-bold text-[#460904] group-hover:scale-110 transform transition-transform">
                    750,000
                  </div>
                  <p className="text-sm text-gray-600">Poches de sang nécessaires par an</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-[#b2d3e1]/10 transition-colors group">
                  <div className="text-2xl font-bold text-[#460904] group-hover:scale-110 transform transition-transform">
                    1%
                  </div>
                  <p className="text-sm text-gray-600">De la population donne son sang</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center hover:bg-[#b2d3e1]/10 transition-colors group">
                  <div className="text-2xl font-bold text-[#460904] group-hover:scale-110 transform transition-transform">
                    16
                  </div>
                  <p className="text-sm text-gray-600">Centres régionaux de transfusion</p>
                </div>
              </div>
            </div>
  
            {/* Call to action */}
            <div className="mt-8 text-center">
              <button className="inline-flex items-center px-6 py-3 rounded-lg bg-[#460904] text-white font-medium hover:bg-[#5a0b06] transition-all shadow-md hover:shadow-lg transform hover:scale-105">
                Découvrir les centres près de chez vous
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default MoroccoSection
  
  
import React from "react";

const MoroccoInfoSection = () => {
return (
    <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-sangred-DEFAULT inline-flex items-center">
            <span className="text-2xl mr-2">🇲🇦</span> La transfusion sanguine au Maroc
            </h2>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
            <p>
            Au Maroc, le don de sang repose principalement sur des campagnes ponctuelles organisées dans les hôpitaux, 
            les universités et les places publiques. Le Centre National de Transfusion Sanguine (CNTSH), en collaboration 
            avec ses centres régionaux, gère l'ensemble du processus de collecte et distribution.
            </p>
            <p>
            Pourtant, le pays fait face à une pénurie chronique, notamment pour les groupes sanguins rares. 
            Il est urgent de sensibiliser les jeunes, de créer une culture du don régulier et d'utiliser des 
            outils modernes pour mieux alerter et mobiliser.
            </p>
            <p>
            SangConnect s'inscrit dans cette dynamique citoyenne en proposant une plateforme numérique, 
            communautaire et éthique.
            </p>
        </div>

        <div className="mt-10 p-6 bg-sangblue-light/20 rounded-xl">
            <h3 className="text-xl font-semibold text-sangred-DEFAULT mb-3">
              Quelques chiffres clés
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-sangred-DEFAULT">300 000</div>
                <div className="text-sm text-gray-600">Poches de sang collectées par an</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-sangred-DEFAULT">1%</div>
                <div className="text-sm text-gray-600">De la population donne son sang</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-3xl font-bold text-sangred-DEFAULT">16</div>
                <div className="text-sm text-gray-600">Centres régionaux de transfusion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoroccoInfoSection;

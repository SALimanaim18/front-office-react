import { Shield, Lock, CheckCircle, AlertCircle } from "lucide-react"

const Security = () => {
  return (
    <section className="py-16 bg-white" id="security">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="mb-6 inline-block p-3 bg-[#b2d3e1]/20 rounded-full transform transition-transform hover:scale-110">
              <Shield className="h-12 w-12 text-[#460904]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#460904] mb-4">Sécurité & modération</h2>
            <p className="text-gray-600 mb-6">
              Chez SangConnect, nous prenons très au sérieux la sécurité et l'éthique. Toutes les demandes sont
              vérifiées et validées par notre équipe avant d'être publiées.
            </p>

            <div className="space-y-4">
              <div className="flex items-start group">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5 group-hover:text-green-500 transition-colors" />
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#460904] transition-colors">
                    Validation médicale
                  </h3>
                  <p className="text-gray-600">
                    Toutes les demandes sont vérifiées par des professionnels de santé pour garantir leur légitimité.
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5 group-hover:text-green-500 transition-colors" />
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#460904] transition-colors">
                    Confidentialité des données
                  </h3>
                  <p className="text-gray-600">
                    Vos informations personnelles sont protégées et ne sont jamais partagées sans votre consentement.
                  </p>
                </div>
              </div>

              <div className="flex items-start group">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 flex-shrink-0 mt-0.5 group-hover:text-green-500 transition-colors" />
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#460904] transition-colors">
                    Éthique et transparence
                  </h3>
                  <p className="text-gray-600">
                    Nous respectons les normes éthiques les plus strictes en matière de don de sang et de transfusion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 bg-gray-50 rounded-2xl p-8 shadow-inner transform hover:scale-[1.02] transition-transform">
            <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#460904] hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-[#460904] mr-3" />
                <h3 className="font-semibold text-gray-800">Important à savoir</h3>
              </div>
              <p className="text-gray-600 mb-4">
                SangConnect facilite la mise en relation, mais le don de sang doit toujours être effectué dans un centre
                agréé. Nous ne permettons jamais les dons directs entre particuliers.
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <Lock className="h-4 w-4 mr-2" />
                <span>Toutes les communications sont cryptées</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#b2d3e1]/20 rounded-lg hover:bg-[#b2d3e1]/30 transition-colors">
              <h4 className="font-medium text-gray-800 mb-2">Notre engagement</h4>
              <p className="text-gray-600 text-sm">
                Nous travaillons en étroite collaboration avec le Centre National de Transfusion Sanguine du Maroc pour
                assurer que toutes les pratiques respectent les protocoles sanitaires en vigueur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Security


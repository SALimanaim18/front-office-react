import { Users, UserPlus, Building, Hospital } from "lucide-react"

const ForWhom = () => {
  const userTypes = [
    {
      icon: <UserPlus className="h-12 w-12 text-[#460904]" />,
      title: "Donneurs",
      description:
        "Trouvez facilement où et quand votre don est nécessaire. Recevez des alertes pour les groupes sanguins compatibles.",
    },
    {
      icon: <Users className="h-12 w-12 text-[#460904]" />,
      title: "Familles",
      description: "Publiez des demandes pour vos proches et connectez-vous rapidement avec des donneurs potentiels.",
    },
    {
      icon: <Hospital className="h-12 w-12 text-[#460904]" />,
      title: "Hôpitaux",
      description: "Gérez vos besoins en sang et communiquez directement avec la communauté des donneurs.",
    },
    {
      icon: <Building className="h-12 w-12 text-[#460904]" />,
      title: "Centres agréés",
      description: "Organisez des campagnes de don et augmentez votre visibilité auprès des donneurs potentiels.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50" id="for-whom">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#460904] mb-4 relative inline-block">
            Pour qui ?
            <div className="absolute h-1 w-12 bg-[#b2d3e1] bottom-0 left-1/2 transform -translate-x-1/2"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SangConnect est conçu pour réunir tous les acteurs du don de sang dans un écosystème collaboratif.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {userTypes.map((type, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all hover:transform hover:-translate-y-2 border-t-4 border-[#b2d3e1] hover:border-[#460904]"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4 text-center transform transition-transform group-hover:scale-110">{type.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-center text-gray-800">{type.title}</h3>
              <p className="text-gray-600 text-center">{type.description}</p>
            </div>
          ))}
        </div>

        {/* Community stats */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 transform hover:scale-[1.02] transition-transform">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 group">
              <div className="text-4xl font-bold text-[#460904] mb-2 group-hover:animate-pulse">5,000+</div>
              <p className="text-gray-600">Donneurs inscrits</p>
            </div>
            <div className="p-4 border-t md:border-t-0 md:border-l md:border-r border-gray-200 group">
              <div className="text-4xl font-bold text-[#460904] mb-2 group-hover:animate-pulse">1,200+</div>
              <p className="text-gray-600">Dons réalisés</p>
            </div>
            <div className="p-4 border-t md:border-t-0 group">
              <div className="text-4xl font-bold text-[#460904] mb-2 group-hover:animate-pulse">30+</div>
              <p className="text-gray-600">Centres partenaires</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForWhom


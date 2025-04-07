import { FileText, Bell, Building, Heart } from "lucide-react"

const HowItWorks = () => {
  const steps = [
    {
      icon: <FileText className="h-10 w-10 text-white" />,
      title: "Publier une demande",
      description: "Créez une demande en précisant le groupe sanguin, l'hôpital et l'urgence.",
      color: "#b2d3e1",
    },
    {
      icon: <Bell className="h-10 w-10 text-white" />,
      title: "Être alerté",
      description: "Les donneurs compatibles sont notifiés et peuvent répondre à votre demande.",
      color: "#8fb9cc",
    },
    {
      icon: <Building className="h-10 w-10 text-white" />,
      title: "Se présenter au centre",
      description: "Le donneur se rend au centre de transfusion indiqué pour effectuer son don.",
      color: "#6c9fb8",
    },
    {
      icon: <Heart className="h-10 w-10 text-white" />,
      title: "Sauver une vie",
      description: "Le don est effectué et contribue à sauver la vie d'une personne dans le besoin.",
      color: "#460904",
    },
  ]

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden" id="how-it-works">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#b2d3e1]/10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#460904]/5 rounded-full -ml-32 -mb-32"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#460904] mb-4 relative inline-block">
            Comment ça marche ?
            <div className="absolute h-1 w-12 bg-[#b2d3e1] bottom-0 left-1/2 transform -translate-x-1/2"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            SangConnect simplifie le processus de don de sang en connectant directement les donneurs aux besoins réels.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#b2d3e1] to-[#460904] transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg transform transition-all hover:scale-110 hover:rotate-3 hover:shadow-xl"
                  style={{ backgroundColor: step.color }}
                >
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-lg font-bold text-gray-700">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Le processus est simple, sécurisé et peut faire toute la différence pour quelqu'un dans le besoin.
          </p>
          <button className="inline-flex items-center px-6 py-3 rounded-full bg-[#460904] text-white font-medium hover:bg-[#5a0b06] transition-all shadow-md hover:shadow-lg transform hover:scale-105">
            <Heart className="mr-2 h-5 w-5 animate-heartbeat" />
            Commencer maintenant
          </button>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks


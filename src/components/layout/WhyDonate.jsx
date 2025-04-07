import { Heart, Clock, Award, Users } from "lucide-react"
import TestimonialCard from "../common/TestimonialCard"

const WhyDonate = () => {
  const reasons = [
    {
      icon: <Heart className="h-8 w-8 text-[#460904]" />,
      title: "Sauver des vies",
      description: "Un seul don peut sauver jusqu'à trois vies différentes.",
    },
    {
      icon: <Clock className="h-8 w-8 text-[#460904]" />,
      title: "Rapide et simple",
      description: "Le processus ne prend que 30 à 45 minutes de votre temps.",
    },
    {
      icon: <Award className="h-8 w-8 text-[#460904]" />,
      title: "Bénéfique pour vous",
      description: "Bilan de santé gratuit et réduction des risques cardiaques.",
    },
    {
      icon: <Users className="h-8 w-8 text-[#460904]" />,
      title: "Rejoindre une communauté",
      description: "Faites partie d'un réseau solidaire qui sauve des vies.",
    },
  ]

  const testimonials = [
    {
      quote:
        "Grâce à SangConnect, j'ai pu trouver rapidement des donneurs pour ma mère. Je serai éternellement reconnaissante.",
      author: "Fatima K.",
      role: "Famille de patient",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      quote:
        "Donner mon sang régulièrement me donne un sentiment de fierté indescriptible. C'est si simple de faire la différence.",
      author: "Karim M.",
      role: "Donneur régulier",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      quote: "Cette plateforme a révolutionné notre façon de gérer les demandes urgentes. Un outil indispensable.",
      author: "Dr. Benani",
      role: "Centre de transfusion",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ]

  return (
    <section className="py-16 bg-white" id="why-donate">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#460904] mb-4 relative inline-block">
            Pourquoi donner son sang ?
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-[#b2d3e1] transform scale-x-50 group-hover:scale-x-100 transition-transform"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Le don de sang est un acte simple qui a un impact extraordinaire. Découvrez pourquoi votre contribution est
            si précieuse.
          </p>
        </div>

        {/* Key reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border-l-4 border-[#b2d3e1] hover:border-[#460904] group hover:-translate-y-1 transform"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform">{reason.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-[#460904] transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Big stat */}
        <div className="bg-gradient-to-r from-[#b2d3e1]/30 to-[#b2d3e1]/10 rounded-2xl p-8 md:p-12 mb-16 text-center transform hover:scale-[1.02] transition-transform">
          <div className="inline-block bg-white rounded-full p-6 shadow-lg mb-6 relative overflow-hidden group">
            <div className="text-5xl md:text-6xl font-bold text-[#460904] relative z-10 group-hover:animate-pulse">
              1 = 3
            </div>
            <div className="absolute inset-0 bg-[#b2d3e1]/0 group-hover:bg-[#b2d3e1]/10 transition-colors rounded-full"></div>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Un don peut sauver jusqu'à trois vies</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Votre don est séparé en trois composants vitaux : globules rouges, plaquettes et plasma, permettant d'aider
            jusqu'à trois patients différents.
          </p>
        </div>

        {/* Testimonials */}
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Ils témoignent</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyDonate


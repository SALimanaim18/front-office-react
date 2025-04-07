import Button from "../common/Button"
import { Heart, Droplet } from "lucide-react"

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white to-[#b2d3e1]/30 py-16 md:py-24">
      {/* Animated blood cells in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-20 w-20 rounded-full bg-[#460904]/5 -top-10 left-1/4 animate-float"></div>
        <div className="absolute h-16 w-16 rounded-full bg-[#b2d3e1]/20 top-1/3 right-1/5 animate-float-slow"></div>
        <div className="absolute h-12 w-12 rounded-full bg-[#460904]/10 bottom-1/4 left-1/5 animate-float-slower"></div>
        <div className="absolute h-24 w-24 rounded-full bg-[#b2d3e1]/10 -bottom-12 right-1/3 animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#460904] leading-tight mb-4 animate-fadeInUp">
              Connecter des vies, <br />
              <span className="text-[#b2d3e1] drop-shadow-sm">une goutte à la fois.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg animate-fadeInUp animation-delay-200">
              SangConnect relie les donneurs, les patients et les centres de transfusion au Maroc pour sauver des vies
              ensemble.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-300">
              <Button size="lg" className="group transform transition-transform hover:scale-105">
                <Droplet className="mr-2 h-5 w-5 group-hover:animate-heartbeat" />
                Créer une demande
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#460904] text-[#460904] hover:bg-[#460904] hover:text-white transition-all transform hover:scale-105 group"
              >
                <Heart className="mr-2 h-5 w-5 group-hover:text-red-200 group-hover:animate-heartbeat" />
                Je veux donner
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative animate-fadeInRight">
            <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/placeholder.svg?height=500&width=600')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#460904]/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-xl font-semibold">Chaque don compte</p>
                <p className="text-sm opacity-90">Rejoignez notre communauté de donneurs</p>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-[#b2d3e1] opacity-70 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/4 h-8 w-8 rounded-full bg-[#460904] opacity-50 animate-pulse"></div>
            </div>

            {/* Stats badge */}
            <div className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 bg-white rounded-lg shadow-xl p-4 transform rotate-6 hover:rotate-0 transition-transform duration-300 hover:scale-110">
              <p className="text-[#460904] font-bold text-xl">1 don = 3 vies</p>
              <p className="text-gray-600 text-sm">Sauvées en moyenne</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection


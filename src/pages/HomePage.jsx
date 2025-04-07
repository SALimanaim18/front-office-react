import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import HeroSection from "../components/layout/HeroSection"
import WhyDonate from "../components/layout/WhyDonate"
import HowItWorks from "../components/layout/HowItWorks"
import RequestWall from "../components/layout/RequestWall"
import ForWhom from "../components/layout/ForWhom"
import Security from "../components/layout/Security"
import MobileApp from "../components/layout/MobileApp"
import MoroccoSection from "../components/layout/MoroccoSection"

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <WhyDonate />
        <HowItWorks />
        <RequestWall />
        <ForWhom />
        <Security />
        <MoroccoSection />
        <MobileApp />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage


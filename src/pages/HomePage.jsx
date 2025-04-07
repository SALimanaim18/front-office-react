import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import WhyDonateSection from "../components/home/WhyDonateSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import RequestsWallSection from "../components/home/RequestsWallSection";
import ForWhoSection from "../components/home/ForWhoSection";
import SecuritySection from "../components/home/SecuritySection";
import MobileAppSection from "../components/home/MobileAppSection";
import MoroccoInfoSection from "../components/home/MoroccoInfoSection";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <WhyDonateSection />
        <HowItWorksSection />
        <RequestsWallSection />
        <ForWhoSection />
        <SecuritySection />
        <MobileAppSection />
        <MoroccoInfoSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

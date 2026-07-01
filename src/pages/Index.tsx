import { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import { motion } from "framer-motion";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // When navigating from another page with a hash (e.g. /#services), scroll to that section after content is visible
  useEffect(() => {
    if (loading) return;
    const hash = location.hash.slice(1);
    if (!hash) return;
    const validIds = ["home", "services", "about", "contact"];
    if (!validIds.includes(hash)) return;
    const el = document.getElementById(hash);
    if (el) {
      const timer = setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading, location.pathname, location.hash]);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <CursorGlow />
          <div className="relative z-10">
            <Navbar />
            <div id="home">
              <h1 className="sr-only">AIM - Web Development, AI Automation & Mobile App Solutions</h1>
              <HeroSection />
            </div>
            <div id="services">
              <ServicesSection />
            </div>
            <div id="about">
              <AboutSection />
            </div>
            <div id="contact">
              <ContactSection />
            </div>
            <Footer />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Index;
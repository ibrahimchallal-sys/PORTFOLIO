import Introduction from "../components/sections/Introduction";
import Profile from "../components/sections/Profile";
import WorkProcess from "../components/sections/WorkProcess";
import Portfolio from "../components/sections/Portfolio";
import Profession from "../components/sections/Profession";
import Contact from "../components/sections/Contact";
import SkillsCarousel from "../components/sections/SkillsCarousel";
import ParticleBackground from "../components/ui/ParticleBackground";
import "../../index.css";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const gradientRef = useRef(null);
  const radialRef = useRef(null);

  // Parallax effect for background elements
  useEffect(() => {
    if (heroRef.current && gradientRef.current && radialRef.current) {
      // Create parallax effect
      gsap.to([gradientRef.current, radialRef.current], {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      });
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Subtle background animation
  useEffect(() => {
    if (radialRef.current) {
      // Create a subtle pulsing effect
      gsap.to(radialRef.current, {
        scale: 1.05,
        opacity: 0.8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }
  }, []);

  return (
    <div className="relative">
      {/* Hero Section with Gradient Background - increased spacing */}
      <div 
        ref={heroRef}
        className="relative overflow-hidden min-h-screen flex items-center"
      >
        <ParticleBackground />
        <div 
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-indigo-50"
        ></div>
        <div 
          ref={radialRef}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(153,41,251,0.05)_0%,_transparent_70%)]"
        ></div>
        <div className="content relative z-10 py-12 w-full">
          <Introduction />
          <SkillsCarousel />
          <Profile />
        </div>
      </div>
      
      {/* Work Process Section - balanced spacing */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <WorkProcess />
      </div>
      
      {/* Portfolio Section - balanced spacing */}
      <div className="py-16">
        <Portfolio />
      </div>
      

      
      {/* Services/Profession Section - balanced spacing */}
      <div className="py-16 bg-gradient-to-b from-white to-gray-50">
        <Profession />
      </div>
      
      {/* Contact Section - balanced spacing */}
      <div className="py-16">
        <Contact />
      </div>
    </div>
  );
};

export default Home;
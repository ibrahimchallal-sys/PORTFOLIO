import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import SocialMedia from "../ui/socialMedia/SocialMedia";
import { useTranslation } from 'react-i18next';
import person from "../../assets/images/moi2.jpg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const { t } = useTranslation();
  const [cvUrl, setCvUrl] = useState("");
  const profileRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Check if CV file exists in public folder
    setCvUrl("/CV_CHALLAL(1).pdf");
  }, []);

  useEffect(() => {
    if (profileRef.current && imageRef.current && contentRef.current && buttonsRef.current) {
      // Set initial states
      gsap.set([imageRef.current, contentRef.current, buttonsRef.current], { opacity: 0, y: 30 });
      
      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: profileRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate elements in sequence
      tl.to(imageRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      })
      .to(contentRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.5")
      .to(buttonsRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.3");
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleDownload = (e) => {
    if (!cvUrl) {
      e.preventDefault();
      alert("CV file not found. Please check the file path.");
    }
  };

  return (
    <div
      ref={profileRef}
      className={`relative mx-6 xxl:mx-2 -bottom-6 lg:-bottom-8 z-10 rounded-2xl bg-white drop-shadow-2xl max-xl:mb-4 shadow-white xl:p-10 lg:p-8 md:p-6 sm:p-5 p-4 w-full border border-gray-100 min-h-[60vh]`}
      id="profile"
    >
      <div className="flex max-md:flex-col justify-between items-center gap-6 w-full h-full">
        {/* Profile image */}
        <div 
          ref={imageRef}
          className="xxl:max-w-80 w-auto h-auto xxl:max-h-96 mobile-w-full"
        >
          <div className="max-w-80 h-96 object-fill overflow-hidden rounded-xl shadow-lg">
            <img
              className="w-full h-full object-cover rounded-xl"
              src={person}
              alt="Ibrahim Challal"
            />
          </div>
          {/* Social media section */}
          <div className="relative bottom-6">
            <div className="flex justify-center">
              <div className="px-4 max-w-66 py-3 z-50 text-center bg-white rounded-[4px] center shadow-2xl drop-shadow-2xl shadow-white mobile-w-full border border-gray-100">
                <SocialMedia />
              </div>
            </div>
          </div>
        </div>

        <div 
          ref={contentRef}
          className="max-sm:w-full w-[33rem] mobile-w-full flex flex-col justify-center h-full"
        >
          <h2
            className={`text-2xl xxs:text-3xl sm:text-4xl lg:text-[38px] text-[min(24px,38px)] max-md:text-center font-semibold mb-6 gradient-text`}
          >
            {t('profile.title')}
          </h2>
          <div
            className={`text-sm xs:text-[16px] lg:text-xl font-normal max-md:text-center text-gray-600 mb-6`}
          >
            <p className={``}>
              {t('profile.description')}
            </p>
          </div>
          <div 
            ref={buttonsRef}
            className="mt-6 flex max-md:justify-center flex-wrap gap-4"
          >
            <a
              className="btn btn-responsive btn-primary text-white"
              href="#portfolio"
            >
              {t('profile.projects')}
            </a>
            <a
              className={`btn btn-responsive hover:border-picto-primary bg-white duration-300 transition-all hover:text-picto-primary text-sm xxs:text-[14px] sm:text-[16px] border border-gray-200`}
              href={cvUrl}
              download="Ibrahim_Challal_CV.pdf"
              onClick={handleDownload}
            >
              <FontAwesomeIcon icon={faDownload} /> {t('profile.downloadCV')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
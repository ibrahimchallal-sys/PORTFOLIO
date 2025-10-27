import { useState, useRef, useEffect } from "react";
import gsap from 'gsap';

const WorkSteps = ({ data, customStyle }) => {
  const [hover, setHover] = useState(false);
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  // Add entrance animation with stagger effect
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6, 
          ease: "back.out(1.7)",
          delay: Math.random() * 0.3 // Stagger effect
        }
      );
    }
  }, []);

  // Add hover animations for the card and icon
  const handleHover = (isEnter) => {
    setHover(isEnter);
    
    if (cardRef.current) {
      if (isEnter) {
        gsap.to(cardRef.current, {
          y: -10,
          scale: 1.03,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(cardRef.current, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
    
    // Icon animation
    if (iconRef.current) {
      if (isEnter) {
        gsap.to(iconRef.current, {
          rotation: 15,
          scale: 1.2,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(iconRef.current, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  // Simple icon component based on icon type
  const renderIcon = () => {
    const baseClasses = "w-6 h-6";
    const colorClasses = hover ? "text-white" : "text-[#A53DFF]";
    
    switch (data?.icon) {
      case "research":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={baseClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className={colorClasses} />
            <path d="M10 20l4-16m-4 4l4 4-4 4M16 20l-4-4 4-4-4-4" className={colorClasses} />
          </svg>
        );
      case "analyze":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={baseClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" className={colorClasses} />
          </svg>
        );
      case "design":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={baseClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" className={colorClasses} />
          </svg>
        );
      case "launch":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={baseClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" className={colorClasses} />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={baseClasses} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" className={colorClasses} />
          </svg>
        );
    }
  };

  return (
    <div
      ref={cardRef}
      className={`rounded-xl border-2 border-purple-100 hover:border-purple-300 bg-gradient-to-br from-white to-purple-50 hover:from-purple-50 hover:to-purple-100 shadow-lg hover:shadow-xl ease-out duration-300 flex flex-col items-center justify-center text-center p-6 w-full ${customStyle}`}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div
        ref={iconRef}
        className={`w-12 h-12 ${
          hover ? "bg-picto-primary" : "bg-[#EDD8FF80]"
        } text-center center rounded-md flex items-center justify-center mx-auto transition-all duration-300`}
      >
        {renderIcon()}
      </div>
      <div className="mt-3 text-center flex flex-col items-center">
        <p className="font-semibold text-lg text-gray-800">{data?.title}</p>
        <p className="mt-1 text-[13px] text-gray-600">
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default WorkSteps;
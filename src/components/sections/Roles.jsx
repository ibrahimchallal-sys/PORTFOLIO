import { useEffect, useState, useRef } from "react";
import gsap from 'gsap';

const Roles = ({ role }) => {
  const [mouseHover, setMouseHover] = useState(false);
  const cardRef = useRef(null);

  // Add entrance animation
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => {
        setMouseHover(true);
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            y: -5,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }}
      onMouseLeave={() => {
        setMouseHover(false);
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }}
      className="p-6 bg-white hover:shadow-xl shadow-gray-200 ease-out duration-300 rounded-xl w-full border border-gray-200 hover:border-picto-primary transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 h-full w-1 bg-picto-primary transform scale-y-0 transition-transform duration-300 origin-top hover:scale-y-100"></div>
      <div className="w-full">
        <p className="text-xl sm:text-2xl font-semibold text-gray-900 pb-3 gradient-text">
          {role?.title}
        </p>
        <p className="text-[13px] sm:text-[16px] font-normal text-gray-600">
          {role?.description}
        </p>
      </div>
    </div>
  );
};

export default Roles;
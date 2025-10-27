import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import gsap from 'gsap';

const Address = ({ item }) => {
  const [hover, setHover] = useState(false);
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
      className="flex items-start p-4 rounded-lg bg-white hover:shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300 w-full"
      onMouseEnter={() => {
        setHover(true);
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            y: -3,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }}
      onMouseLeave={() => {
        setHover(false);
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }}
    >
      <div
        className={`h-12 w-12 flex items-center justify-center ${
          hover ? "bg-picto-primary" : "bg-purple-100"
        } rounded-lg transition-all duration-300 flex-shrink-0`}
      >
        <FontAwesomeIcon
          icon={item?.icon}
          className={`text-lg ${
            hover ? "text-white" : "text-picto-primary"
          } transition-colors duration-300`}
        />
      </div>
      <div className="ms-4">
        <p className="text-sm text-gray-500 font-medium">
          {item?.title}
        </p>
        <p className="text-base text-gray-800 font-semibold">
          {item?.description}
        </p>
      </div>
    </div>
  );
};

export default Address;
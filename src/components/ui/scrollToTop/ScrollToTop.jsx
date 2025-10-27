import { useEffect, useState, useCallback, useRef } from "react";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { animateScroll } from "react-scroll";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import gsap from 'gsap';

const options = {
  duration: 0,
  smooth: false,
};

const scrollToTop = () => {
  animateScroll.scrollToTop(options);
};

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const buttonRef = useRef(null);

  const handleScroll = useCallback(() => {
    // Don't show the button on the home page
    if (location.pathname === '/home') {
      if (showButton) {
        setShowButton(false);
      }
    } else {
      const shouldShow = window.scrollY > 100;
      if (shouldShow !== showButton) {
        setShowButton(shouldShow);
      }
    }
  }, [location.pathname, showButton]);

  useEffect(() => {
    // Initialize on location change
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Animate button appearance
  useEffect(() => {
    if (buttonRef.current) {
      if (showButton) {
        gsap.to(buttonRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(buttonRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in"
        });
      }
    }
  }, [showButton]);

  return (
    <div className="flex justify-end relative sm:me-10 z-10 transition-all w-full">
      <button
        ref={buttonRef}
        onClick={scrollToTop}
        className="fixed bottom-10 me-5 w-10 h-10 sm:w-12.5 sm:h-12.5 lg:w-15 lg:h-15 flex justify-center items-center rounded-full transition delay-150 duration-300 ease-in-out hover:scale-110 hover:cursor-pointer bg-picto-primary hover:bg-picto-primary-dark text-white shadow-lg"
        aria-label="Scroll to top"
        style={{ scale: 0, opacity: 0 }}
      >
        <FontAwesomeIcon icon={faAngleUp} size="2xl" />
      </button>
    </div>
  );
};

export default ScrollToTop;
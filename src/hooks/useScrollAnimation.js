import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for scroll-triggered animations
 * @param {React.RefObject} elementRef - Reference to the element to animate
 * @param {Object} animationProps - GSAP animation properties
 * @param {Object} scrollTriggerProps - ScrollTrigger properties
 */
const useScrollAnimation = (
  elementRef,
  animationProps,
  scrollTriggerProps = {}
) => {
  useEffect(() => {
    if (elementRef.current) {
      // Set initial state
      gsap.set(elementRef.current, {
        opacity: 0,
        ...animationProps.initial,
      });

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          ...scrollTriggerProps,
        },
      });

      // Animate to final state
      tl.to(elementRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        ...animationProps.animate,
      });
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [elementRef, animationProps, scrollTriggerProps]);
};

export default useScrollAnimation;

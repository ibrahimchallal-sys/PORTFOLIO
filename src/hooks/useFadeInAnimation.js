import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook for fade-in animation on scroll (optimized for performance)
 * @param {Object} options - Animation options
 * @param {string} options.direction - Animation direction: 'up', 'down', 'left', 'right', 'fade'
 * @param {number} options.delay - Delay before animation starts (in seconds)
 * @param {number} options.duration - Animation duration (in seconds)
 * @param {string} options.ease - GSAP easing function
 */
const useFadeInAnimation = ({
  direction = 'up',
  delay = 0,
  duration = 0.8,
  ease = 'power2.out'
} = {}) => {
  const elementRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on direction
    const initialStates = {
      up: { y: 40, opacity: 0 },
      down: { y: -40, opacity: 0 },
      left: { x: 40, opacity: 0 },
      right: { x: -40, opacity: 0 },
      fade: { opacity: 0 }
    };

    const initialState = initialStates[direction] || initialStates.up;

    // Add will-change for better performance
    element.style.willChange = 'transform, opacity';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';

    // Set initial styles using transform for better performance
    gsap.set(element, {
      ...initialState,
      force3D: true
    });

    // Create animation with optimized ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: element,
      start: 'top 90%',
      once: true, // Only animate once for better performance
      onEnter: () => {
        gsap.to(element, {
          ...(direction !== 'fade' && { x: 0, y: 0 }),
          opacity: 1,
          duration,
          delay,
          ease,
          force3D: true,
          onComplete: () => {
            // Remove will-change after animation for better performance
            element.style.willChange = 'auto';
          }
        });
      }
    });

    // Cleanup
    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      element.style.willChange = 'auto';
    };
  }, [direction, delay, duration, ease]);

  return elementRef;
};

export default useFadeInAnimation;

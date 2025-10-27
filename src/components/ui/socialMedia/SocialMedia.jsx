import {
  faBehance,
  faDribbble,
  faFacebookF,
  faInstagram,
  faLinkedin,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const socialIcons = [
  { icon: faDribbble, link: "https://dribbble.com/ibrahim-challal", labelKey: "socialMedia.dribbble" },
  { icon: faInstagram, link: "https://www.instagram.com/heey_ibrahim/", labelKey: "socialMedia.instagram" },
  { icon: faLinkedin, link: "https://www.linkedin.com/in/ibrahim-challal-a32402323/", labelKey: "socialMedia.linkedin" },
  { icon: faGithub, link: "https://github.com/ibrahimchallal-sys", labelKey: "socialMedia.github" },
];

const SocialMedia = () => {
  const { t } = useTranslation();
  const socialRef = useRef(null);
  const iconRefs = useRef([]);

  // Add entrance animation
  useEffect(() => {
    if (socialRef.current) {
      gsap.fromTo(socialRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  // Add hover animations for each icon
  const handleIconHover = (index, isEnter) => {
    const iconElement = iconRefs.current[index];
    if (iconElement) {
      if (isEnter) {
        gsap.to(iconElement, {
          rotation: 360,
          scale: 1.2,
          duration: 0.4,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(iconElement, {
          rotation: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }
  };

  return (
    <div 
      ref={socialRef}
      className="flex flex-wrap justify-start gap-3"
    >
      {socialIcons.map((item, index) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="h-10 w-10 flex items-center justify-center text-picto-primary hover:bg-picto-primary hover:text-white rounded-lg border border-purple-200 hover:border-picto-primary transition-all duration-300 hover:-translate-y-1"
          key={index}
          aria-label={t(item.labelKey)}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              y: -5,
              duration: 0.3,
              ease: "power2.out"
            });
            handleIconHover(index, true);
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              y: 0,
              duration: 0.3,
              ease: "power2.out"
            });
            handleIconHover(index, false);
          }}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className="text-lg"
            ref={el => iconRefs.current[index] = el}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;
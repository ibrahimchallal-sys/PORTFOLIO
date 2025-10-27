import { Link } from "react-scroll";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/* Footer navLinks */
const navItems = [
  { id: 1, nameKey: "navbar.home", url: "introduction" },
  { id: 2, nameKey: "navbar.about", url: "profile" },
  { id: 3, nameKey: "navbar.process", url: "work-process" },
  { id: 4, nameKey: "navbar.portfolio", url: "portfolio" },
  { id: 5, nameKey: "navbar.services", url: "services" },
  { id: 6, nameKey: "navbar.contact", url: "contact" },
];

const copyrightYear = new Date().getFullYear();

const Footer = () => {
  const { t } = useTranslation();
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef(null);
  const contactRef = useRef(null);
  const copyrightRef = useRef(null);

  // Add scroll-triggered animations
  useEffect(() => {
    if (footerRef.current && brandRef.current && linksRef.current && 
        contactRef.current && copyrightRef.current) {
      // Set initial states
      gsap.set([brandRef.current, linksRef.current, contactRef.current], { opacity: 0, y: 30 });
      gsap.set(copyrightRef.current, { opacity: 0, y: 20 });
      
      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate elements in sequence
      tl.to(brandRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      })
      .to(linksRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4")
      .to(contactRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4")
      .to(copyrightRef.current, { 
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

  return (
    <footer 
      ref={footerRef}
      className="bg-gradient-to-r from-[#2A374A] to-[#1a2535] text-white pt-16 pb-8"
    >
      <div className="content">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand Section */}
          <div ref={brandRef} className="md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-picto-primary flex items-center justify-center mr-3">
                <span className="text-white font-bold text-xl">IC</span>
              </div>
              <h3 className="text-2xl font-bold">Ibrahim Challal</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.brandDescription')}
            </p>
          </div>

          {/* Navigation Links */}
          <div ref={linksRef} className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-6">{t('footer.quickLinks')}</h4>
            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.url}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer py-2"
                >
                  {t(item.nameKey)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div ref={contactRef} className="md:col-span-1">
            <h4 className="text-xl font-semibold mb-6">{t('footer.contactInfo')}</h4>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 text-picto-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <span className="block font-medium text-white">{t('contact.address.address')}</span>
                  <span>{t('contact.address.location')}</span>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 text-picto-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <span className="block font-medium text-white">{t('contact.address.email')}</span>
                  <span>{t('contact.address.emailAddress')}</span>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-3 mt-1 text-picto-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <span className="block font-medium text-white">{t('contact.address.phone')}</span>
                  <span>{t('contact.address.phoneNumber')}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div ref={copyrightRef} className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {copyrightYear} {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
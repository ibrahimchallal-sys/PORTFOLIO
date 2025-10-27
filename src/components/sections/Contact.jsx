import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
import Form from "./Form";
import SocialMedia from "../ui/socialMedia/SocialMedia";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const contactRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const infoRef = useRef(null);
  const formRef = useRef(null);

  const addressData = [
    {
      icon: faLocationDot,
      titleKey: "contact.address.address",
      descriptionKey: "contact.address.location",
    },
    {
      icon: faEnvelope,
      titleKey: "contact.address.email",
      descriptionKey: "contact.address.emailAddress",
    },
    {
      icon: faPhone,
      titleKey: "contact.address.phone",
      descriptionKey: "contact.address.phoneNumber",
    },
  ];

  useEffect(() => {
    if (contactRef.current && titleRef.current && descriptionRef.current && 
        infoRef.current && formRef.current) {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current], { opacity: 0, y: 20 });
      gsap.set(infoRef.current, { opacity: 0, x: -30 });
      gsap.set(formRef.current, { opacity: 0, x: 30 });
      
      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Animate elements in sequence
      tl.to(titleRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      })
      .to(descriptionRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4")
      .to(infoRef.current, { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.3")
      .to(formRef.current, { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.6");
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={contactRef}
      className="relative -bottom-15 -mt-15 z-10 px-2 w-full"
    >
      <div
        className="content p-6 md:p-8 lg:p-12 bg-white rounded-2xl shadow-xl w-full border border-gray-100"
        id="contact"
      >
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 gradient-text">
            {t('contact.title')}
          </h2>
          <p ref={descriptionRef} className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.description')}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Contact Information */}
          <div ref={infoRef} className="w-full lg:w-2/5">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 h-full">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{t('contact.infoTitle')}</h3>
              
              <div className="space-y-5 mb-8">
                {addressData.map((item, index) => (
                  <Address 
                    item={{
                      ...item,
                      title: t(item.titleKey),
                      description: t(item.descriptionKey)
                    }} 
                    key={index} 
                  />
                ))}
              </div>
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-700 mb-3">{t('contact.follow')}</h4>
                <SocialMedia />
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{t('contact.responseTime')}</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div ref={formRef} className="w-full lg:w-3/5">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">{t('contact.formTitle')}</h3>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
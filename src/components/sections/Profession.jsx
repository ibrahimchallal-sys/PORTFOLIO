import Roles from "./Roles";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const rolesData = [
  {
    id: 1,
    titleKey: "profession.roles.uiUxDesign.title",
    descriptionKey: "profession.roles.uiUxDesign.description",
  },
  {
    id: 2,
    titleKey: "profession.roles.fullStack.title",
    descriptionKey: "profession.roles.fullStack.description",
  },
];

const childRolesData = [
  {
    id: 11,
    parentId: 1,
    titleKey: "profession.roles.uiDesign.title",
    descriptionKey: "profession.roles.uiDesign.description",
  },
  {
    id: 12,
    parentId: 1,
    titleKey: "profession.roles.uxResearch.title",
    descriptionKey: "profession.roles.uxResearch.description",
  },
  {
    id: 21,
    parentId: 2,
    titleKey: "profession.roles.frontend.title",
    descriptionKey: "profession.roles.frontend.description",
  },
  {
    id: 22,
    parentId: 2,
    titleKey: "profession.roles.backend.title",
    descriptionKey: "profession.roles.backend.description",
  },
];

const Profession = () => {
  const { t } = useTranslation();
  const professionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const parentCardsRef = useRef(null);
  const childCardsRef = useRef(null);
  const buttonRef = useRef(null);
  const treeConnectorRefs = useRef([]);

  useEffect(() => {
    if (professionRef.current && titleRef.current && descriptionRef.current && 
        parentCardsRef.current && childCardsRef.current && buttonRef.current) {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current], { opacity: 0, y: 20 });
      gsap.set(parentCardsRef.current, { opacity: 0, y: 30 });
      gsap.set(childCardsRef.current, { opacity: 0, y: 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: 20 });
      
      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: professionRef.current,
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
      .to(parentCardsRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.3")
      .to(childCardsRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.6")
      .to(buttonRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4");
    }
    
    // Add animations to tree connectors
    if (treeConnectorRefs.current.length > 0) {
      treeConnectorRefs.current.forEach((connector, index) => {
        if (connector) {
          gsap.fromTo(connector,
            { height: 0, opacity: 0 },
            {
              height: 24, // Match the mb-6 class (1.5rem = 24px)
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: connector,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={professionRef}
      className="content flex flex-col items-center px-2 py-10 md:py-15 lg:py-20 w-full"
      id="services"
    >
      <div className="text-center max-w-3xl mb-16">
        <p ref={titleRef} className="section-title gradient-text mb-6">{t('profession.title')}</p>
        <div ref={descriptionRef} className="text-[14px] space-y-4">
          <p className="text-xs sm:text-lg font-normal text-gray-600">
            {t('profession.description1')}
          </p>
          <p className="text-xs sm:text-lg font-normal text-gray-600">
            {t('profession.description2')}
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-6xl">
        {/* Parent cards in a row */}
        <div ref={parentCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {rolesData.map((role) => (
            <div key={role.id} className="parent-card relative">
              <Roles role={{
                ...role,
                title: t(role.titleKey),
                description: t(role.descriptionKey)
              }} />
            </div>
          ))}
        </div>
        
        {/* Child cards in a tree structure */}
        <div ref={childCardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UI/UX children */}
          <div className="flex flex-col items-center">
            <div 
              ref={el => treeConnectorRefs.current[0] = el}
              className="tree-connector-vertical mb-6"
            ></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {childRolesData
                .filter(child => child.parentId === 1)
                .map((child) => (
                  <div key={child.id} className="child-card">
                    <Roles role={{
                      ...child,
                      title: t(child.titleKey),
                      description: t(child.descriptionKey)
                    }} />
                  </div>
                ))}
            </div>
          </div>
          
          {/* Full Stack children */}
          <div className="flex flex-col items-center">
            <div 
              ref={el => treeConnectorRefs.current[1] = el}
              className="tree-connector-vertical mb-6"
            ></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {childRolesData
                .filter(child => child.parentId === 2)
                .map((child) => (
                  <div key={child.id} className="child-card">
                    <Roles role={{
                      ...child,
                      title: t(child.titleKey),
                      description: t(child.descriptionKey)
                    }} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      
      <a
        ref={buttonRef}
        href="#!"
        className="mt-12 btn btn-primary text-white w-fit md:py-3 md:px-6 text-[12px] sm:text-[16px] font-semibold btn-responsive"
      >
        {t('profession.sayHello')}
      </a>
    </div>
  );
};

export default Profession;
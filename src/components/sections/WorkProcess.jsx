import WorkSteps from "./WorkSteps";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const workStepData = [
  {
    titleKey: "workProcess.steps.research.title",
    descriptionKey: "workProcess.steps.research.description",
    icon: "research",
  },
  {
    titleKey: "workProcess.steps.analyze.title",
    descriptionKey: "workProcess.steps.analyze.description",
    icon: "analyze",
  },
  {
    titleKey: "workProcess.steps.design.title",
    descriptionKey: "workProcess.steps.design.description",
    icon: "design",
  },
  {
    titleKey: "workProcess.steps.launch.title",
    descriptionKey: "workProcess.steps.launch.description",
    icon: "launch",
  },
];

const WorkProcess = () => {
  const { t } = useTranslation();
  const workProcessRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    if (workProcessRef.current && titleRef.current && descriptionRef.current && stepsRef.current) {
      // Set initial states
      gsap.set([titleRef.current, descriptionRef.current], { opacity: 0, y: 20 });
      gsap.set(stepsRef.current, { opacity: 0, y: 30 });
      
      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: workProcessRef.current,
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
      .to(stepsRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }, "-=0.3");
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={workProcessRef}
      className="content grid xl:grid-cols-2 xl:items-center px-2 py-5 md:py-10 lg:py-16 xl:py-20 max-xxl:px-4 w-full"
      id="work-process"
    >
      <div ref={titleRef} className="lg:pe-10 xl:pe-20 max-xs:mb-3 max-xl:mb-8 text-center xl:text-left">
        <p className="section-title max-xl:text-center gradient-text mx-auto xl:mx-0">{t('workProcess.title')}</p>
        <p ref={descriptionRef} className="mt-4 mb-4 md:text-[16px] text-sm font-normal max-xl:text-center text-gray-500">
          {t('workProcess.description1')}
        </p>
        <p className="mt-4 md:text-[16px] text-sm font-normal max-xl:text-center text-gray-500">
          {t('workProcess.description2')}
        </p>
      </div>

      <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
        {workStepData.map((data, index) => {
          return (
            <WorkSteps
              data={{
                ...data,
                title: t(data.titleKey),
                description: t(data.descriptionKey)
              }}
              customStyle=""
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WorkProcess;
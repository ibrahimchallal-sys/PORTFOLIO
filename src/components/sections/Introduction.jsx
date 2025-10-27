import person from "../../assets/images/moi.jpg";
import "./introduction.css";
import InformationSummary from "./InformationSummary";
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useScrollAnimation from '../../hooks/useScrollAnimation';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Information summary data (removed age item)
const informationSummaryData = [];

const Introduction = () => {
  const { t } = useTranslation();
  const introRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonsRef = useRef(null);

  // Use custom hook for scroll animations
  useScrollAnimation(
    textRef,
    {
      initial: { y: 30 },
      animate: { y: 0, duration: 0.8 }
    }
  );

  useScrollAnimation(
    imageRef,
    {
      initial: { y: 30 },
      animate: { y: 0, duration: 0.8 }
    },
    { start: "top 80%" }
  );

  useScrollAnimation(
    buttonsRef,
    {
      initial: { y: 30 },
      animate: { y: 0, duration: 0.6 }
    },
    { start: "top 80%" }
  );

  return (
    <div
      ref={introRef}
      className="flex max-lg:flex-col-reverse sm:justify-between pt-8 lg:pt-12 lg:mb-8 max-xl:gap-8 p-4 max-xxl:px-6 w-full min-h-[50vh]"
      id="introduction"
    >
      <div ref={textRef} className="w-full flex flex-col justify-between max-lg:text-center lg:text-left">
        <div className="pt-6 me-6 w-full transition-all duration-500">
          <p className="text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full mb-2">
            {t('introduction.hello')} <span className="text-picto-primary">{t('introduction.name')}</span>
          </p>
          <p className="text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full mb-3">
            <span className="text-picto-primary">{t('introduction.name')}</span>, <span className="text-2xl">{t('introduction.age')}</span>
          </p>
          <p className="text-sm xxs:text-lg lg:text-xl my-4 text-gray-600 lg:pr-12">
            {t('introduction.description')}
          </p>
          <div ref={buttonsRef} className="flex flex-wrap gap-4 max-lg:justify-center lg:justify-start mt-6">
            <a
              className="btn-primary btn btn-responsive text-white"
              href="mailto:i.challal9970@gmail.com"
            >
              {t('introduction.sayHello')}
            </a>
            <a
              className="btn btn-responsive btn-outline border-2 border-picto-primary text-picto-primary hover:bg-picto-primary hover:text-white"
              href="#portfolio"
            >
              {t('introduction.viewWork')}
            </a>
          </div>
        </div>
        <div className="mx-auto lg:mx-0 lg:mt-auto relative w-full mt-8">
          <div className="grid max-xxs:grid-flow-col grid-cols-3 w-fit gap-2">
            {informationSummaryData.map((item) => (
              <InformationSummary key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div 
        ref={imageRef}
        className="max-w-80 w-full h-full max-lg:mx-auto lg:ml-0 aspect-[536/636] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-picto-primary to-picto-primary-dark rounded-3xl transform rotate-6 animate-float"></div>
        <img
          className="shadow-2xl shadow-gray-200 w-full h-full absolute bottom-0 object-cover bg-white rounded-3xl"
          src={person}
          alt="Ibrahim Challal"
        />
      </div>
    </div>
  );
};

export default Introduction;
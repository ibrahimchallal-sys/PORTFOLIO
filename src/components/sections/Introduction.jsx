import "./introduction.css";
import InformationSummary from "./InformationSummary";
import { useTranslation } from 'react-i18next';
import AnimationLottie from "../../helper/animation-lottie";
import codingAnimation from "../../assets/lottie/Coding Develio.json";

const informationSummaryData = [];

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <div
      className="flex max-lg:flex-col-reverse sm:justify-between pt-8 lg:pt-12 lg:mb-8 max-xl:gap-8 p-4 max-xxl:px-6 w-full min-h-[50vh]"
      id="introduction"
    >
      <div className="w-full flex flex-col justify-between max-lg:text-center lg:text-left">
        <div className="pt-6 me-6 w-full">
          <p className="text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full mb-2">
            {t('introduction.hello')} <span className="text-picto-primary">{t('introduction.name')}</span>
          </p>

          <p className="text-sm xxs:text-lg lg:text-xl my-4 text-gray-600 lg:pr-12">
            {t('introduction.description')}
          </p>
          <div className="flex flex-wrap gap-4 max-lg:justify-center lg:justify-start mt-6">
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
        className="max-w-80 w-full h-full max-lg:mx-auto lg:ml-0 aspect-[536/636] relative flex items-center justify-center"
      >
        <div className="w-full h-full flex items-center justify-center">
          <AnimationLottie animationPath={codingAnimation} />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
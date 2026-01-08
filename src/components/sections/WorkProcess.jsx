import WorkSteps from "./WorkSteps";
import { useTranslation } from 'react-i18next';
import AnimationLottie from "../../helper/animation-lottie";
import developerAnimation from "../../assets/lottie/Developer.json";

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

  return (
    <div
      className="content grid xl:grid-cols-2 xl:items-center px-2 py-5 md:py-10 lg:py-16 xl:py-20 max-xxl:px-4 w-full"
      id="work-process"
    >
      <div className="lg:pe-10 xl:pe-20 max-xs:mb-3 max-xl:mb-8 text-center xl:text-left">
        <p className="section-title max-xl:text-center gradient-text mx-auto xl:mx-0">{t('workProcess.title')}</p>
        <p className="mt-4 mb-4 md:text-[16px] text-sm font-normal max-xl:text-center text-gray-500">
          {t('workProcess.description1')}
        </p>
        <p className="mt-4 mb-6 md:text-[16px] text-sm font-normal max-xl:text-center text-gray-500">
          {t('workProcess.description2')}
        </p>
        <div className="max-w-md mx-auto xl:mx-0 mt-6">
          <AnimationLottie animationPath={developerAnimation} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
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
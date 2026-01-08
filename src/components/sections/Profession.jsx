import Roles from "./Roles";
import { useTranslation } from 'react-i18next';

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

  return (
    <div
      className="content flex flex-col items-center px-2 py-10 md:py-15 lg:py-20 w-full"
      id="services"
    >
      <div className="text-center max-w-3xl mb-16">
        <p className="section-title gradient-text mb-6">{t('profession.title')}</p>
        <div className="text-[14px] space-y-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* UI/UX children */}
          <div className="flex flex-col items-center">
            <div 
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
        href="#!"
        className="mt-12 btn btn-primary text-white w-fit md:py-3 md:px-6 text-[12px] sm:text-[16px] font-semibold btn-responsive"
      >
        {t('profession.sayHello')}
      </a>
    </div>
  );
};

export default Profession;
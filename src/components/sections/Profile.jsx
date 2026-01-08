import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import ExperienceAnimation from '../ui/ExperienceAnimation';

const Profile = memo(() => {
  const { t } = useTranslation();

  return (
    <div
      className={`relative mx-6 xxl:mx-2 -bottom-6 lg:-bottom-8 z-10 rounded-2xl bg-white drop-shadow-2xl max-xl:mb-4 shadow-white xl:p-10 lg:p-8 md:p-6 sm:p-5 p-4 w-full border border-gray-100 min-h-[60vh]`}
      id="profile"
    >
      <div className="flex max-md:flex-col justify-between items-center gap-8 w-full h-full">
        {/* Left Section - Lottie Animation */}
        <div className="w-full lg:w-1/2 h-full min-h-[400px] max-md:order-2">
          <ExperienceAnimation />
        </div>

        {/* Right Section - Title and Text */}
        <div 
          className="w-full lg:w-1/2 flex flex-col justify-center h-full max-md:order-1"
        >
          <h2
            className={`text-2xl xxs:text-3xl sm:text-4xl lg:text-[38px] text-[min(24px,38px)] max-md:text-center font-semibold mb-6 gradient-text`}
          >
            {t('profile.title')}
          </h2>
          <div
            className={`text-sm xs:text-[16px] lg:text-xl font-normal max-md:text-center text-gray-600 mb-6`}
          >
            <p className={``}>
              {t('profile.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Profile;
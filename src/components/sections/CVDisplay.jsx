import { useTranslation } from 'react-i18next';
import AnimationLottie from "../../helper/animation-lottie";
import jobCVAnimation from "../../assets/lottie/job cv.json";



const CVDisplay = () => {
  const { t } = useTranslation();
  // Function to handle CV download
  const handleDownloadCV = () => {
    try {
      const cvUrl = '/CV_CHALLAL.pdf';
      const link = document.createElement('a');
      link.href = cvUrl;
      link.download = 'CV_CHALLAL.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Failed to download CV. Please try again later.');
    }
  };

  return (
    <div 
      className="content py-16 bg-gradient-to-b from-gray-50 to-white w-full"
      id="cv-display"
    >
      <div className="grid xl:grid-cols-2 xl:items-center px-2 md:px-4 lg:px-8 max-xxl:px-4 w-full">
        <div className="lg:pe-10 xl:pe-20 max-xs:mb-3 max-xl:mb-8 text-center xl:text-left">
          <p className="section-title max-xl:text-center gradient-text mx-auto xl:mx-0">
            {t('profile.downloadCV')}
          </p>
          <p className="mt-4 mb-4 md:text-[16px] text-sm font-normal max-xl:text-center text-gray-500">
            {t('profile.description')}
          </p>
          <div className="max-w-md mx-auto xl:mx-0 mt-6">
            <AnimationLottie animationPath={jobCVAnimation} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {t('profile.downloadCV')}
            </h3>
            
            <div className="mb-6">
              <svg 
                className="w-16 h-16 text-picto-primary mx-auto mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <p className="text-gray-600 mb-2">
                {t('profile.downloadCV')} PDF
              </p>
              <p className="text-sm text-gray-500">
                Click the button below to download
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleDownloadCV}
                className="btn-primary btn btn-responsive text-white hover:bg-purple-700 transition-colors duration-300"
              >
                {t('profile.downloadCV')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVDisplay;
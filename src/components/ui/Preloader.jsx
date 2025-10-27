import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PacmanLoader } from 'react-spinners';

const Preloader = ({ isLoading, setIsLoading }) => {
  const { t } = useTranslation();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="mb-6">
        <PacmanLoader color="#9929fb" size={30} />
      </div>
      <p className="text-gray-600 font-medium">
        {t('preloader.loading')}
      </p>
    </div>
  );
};

export default Preloader;
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const getCurrentLanguage = () => {
    if (i18n.language === 'fr') return 'FR';
    if (i18n.language === 'ar') return 'AR';
    return 'EN';
  };

  const getLanguageName = (lang) => {
    if (lang === 'fr') return 'Français';
    if (lang === 'ar') return 'العربية';
    return 'English';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-white border border-gray-300 hover:border-picto-primary text-gray-700 hover:text-picto-primary transition-all duration-200"
        aria-label="Switch language"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{getCurrentLanguage()}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            <button
              onClick={() => changeLanguage('en')}
              className={`block w-full text-left px-4 py-2 text-sm ${
                i18n.language === 'en' 
                  ? 'bg-picto-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              English
            </button>
            <button
              onClick={() => changeLanguage('fr')}
              className={`block w-full text-left px-4 py-2 text-sm ${
                i18n.language === 'fr' 
                  ? 'bg-picto-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Français
            </button>
            <button
              onClick={() => changeLanguage('ar')}
              className={`block w-full text-left px-4 py-2 text-sm ${
                i18n.language === 'ar' 
                  ? 'bg-picto-primary text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      )}
      
      {/* Close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;
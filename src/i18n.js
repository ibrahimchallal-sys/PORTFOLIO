import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";
import translationAR from "./locales/ar/translation.json";

// The translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },
  ar: {
    translation: translationAR,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // order and from where user language should be detected
      order: ["localStorage", "navigator"],

      // keys or params to lookup language from
      lookupLocalStorage: "i18nextLng",

      // cache user language on
      caches: ["localStorage"],

      // optional htmlTag with lang attribute, the default is:
      htmlTag: document.documentElement,
    },
  });

export default i18n;

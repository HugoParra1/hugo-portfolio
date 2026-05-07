import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import es from './es.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    /* Default to Spanish; browser detector overrides if it finds a match */
    lng: 'es',
    fallbackLng: 'es',
    supportedLngs: ['es', 'en'],
    /* LanguageDetector options */
    detection: {
      order: ['navigator', 'htmlTag'],
      caches: [],
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    returnNull: false,
  });

export default i18n;

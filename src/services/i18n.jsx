import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome to React and i18next',
    },
  },
  es: {
    translation: {
      welcome: 'Bienvenido a React y i18next',
    },
  },
};

i18n
  .use(Backend) 
  .use(initReactI18next) 
  .init({
    backend: {
      loadPath: '/locales/{{lng}}.json', 
    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
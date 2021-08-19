import i18n from 'i18next';
import Cookies from 'js-cookie';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/common.json';
import msTranslation from './locales/ms/common.json';
import taTranslation from './locales/ta/common.json';
import zhTranslation from './locales/zh/common.json';

const resources = {
  en: {
    common: enTranslation,
  },
  ms: {
    common: msTranslation,
  },
  zh: {
    common: zhTranslation,
  },
  ta: {
    common: taTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Cookies.get('lang') ? Cookies.get('lang') : 'en',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  debug: process.env.REACT_APP_I18N_DEBUG === "true" ? true : false,
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en/common.json";
import msTranslation from "./locales/ms/common.json";

const resources = {
  en: {
    common: enTranslation,
  },
  ms: {
    common: msTranslation,
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ms",
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    debug:true
  });

  export default i18n;
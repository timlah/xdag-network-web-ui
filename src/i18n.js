import i18n from 'i18next';
import Locize from 'i18next-locize-backend';

i18n.use(Locize).init({
  lng: document.documentElement.lang,
  backend: {
    projectId: '712fc2d9-055b-4d2e-8524-f74d5c30b65c',
    // apiKey:
    referencelng: 'en'
  },
  load: 'languageOnly',
  fallbackLng: 'en',
  // saveMissing: true,

  // Namespaces that we want to load from Locize
  ns: ['network', 'common'],
  defaultNS: 'network',

  interpolation: {
    escapeValue: false, // not needed for react
    formatSeparator: ','
  },

  react: {
    wait: false
  }
});

export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Импорт переводов
import en from "./locales/en.json";
import ru from "./locales/ru.json";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
};

const getDeviceLanguage = () => {
  const locale = Localization.getLocales()[0];
  return locale?.languageCode || "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
  debug: __DEV__,
  saveMissing: false,
  defaultNS: "translation",
  ns: ["translation"],
});

export default i18n;

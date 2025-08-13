import { useTranslation } from "react-i18next";
import * as Localization from "expo-localization";

export const useI18n = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (language: string) => {
    try {
      await i18n.changeLanguage(language);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const getCurrentLanguage = () => i18n.language;

  const getDeviceLanguage = () => {
    const locale = Localization.getLocales()[0];
    return locale?.languageCode || "en";
  };

  const getSupportedLanguages = () => ["en", "ru"];

  const isRTL = () => {
    const locale = Localization.getLocales()[0];
    return locale?.textDirection === "rtl";
  };

  return {
    t,
    i18n,
    changeLanguage,
    getCurrentLanguage,
    getDeviceLanguage,
    getSupportedLanguages,
    isRTL,
    currentLanguage: getCurrentLanguage(),
    supportedLanguages: getSupportedLanguages(),
  };
};

export default useI18n;

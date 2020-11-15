import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales";

i18n.use(initReactI18next).init({
  resources: resources,
  lng: "es",
  fallbackLng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (country) => {
  let lng = "es";
  switch (country) {
    case "AR":
      lng = "es";
      break;
    case "US":
      lng = "en";
      break;
    default:
      lng = "es";
      break;
  }
  return i18n.changeLanguage(lng);
};

export default i18n;

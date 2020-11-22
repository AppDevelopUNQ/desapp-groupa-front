import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./locales";
import { enUS, es } from "date-fns/locale";

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

export const getLenguageDatePicker = () => {
  switch (i18n.languages[0]) {
    case "es":
      return es;
    case "en":
      return enUS;
    default:
      return es;
  }
};

export const getLanguageI18n = () => {
  switch (i18n.languages[0]) {
    case "es":
      return "es-AR";
    case "en":
      return "en-US";
    default:
      return "es-AR";
  }
};

export const getCurrencySymbol = () => {
  return (0)
    .toLocaleString(getLanguageI18n(), {
      style: "currency",
      currency: i18n.t("currency"),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, "")
    .trim();
};

export const numberFormat = (number) => {
  return new Intl.NumberFormat(getLanguageI18n(), {
    style: "currency",
    currency: i18n.t("currency"),
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(number);
};

export default i18n;

"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en";
import es from "./es";
import ptbr from "./ptbr";

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      translation: { ...ptbr },
    },
    en: {
      translation: { ...en },
    },
    es: {
      translation: { ...es },
    },
  },
  lng: "pt",
  defaultNS: "translation",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

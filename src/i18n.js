import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

import translationEng from "./locales/en/en.json";
import translationRus from "./locales/ru/ru.json";


i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    // we init with resources
    resources: {
        ru: {
            translations: translationRus
        },
        en: {
            translations: translationEng
        }
    },
    fallbackLng: "ru",
    debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",
    lng: "ru",

    //keySeparator: true, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true,
        useSuspense: false
    }
});

export default i18n;
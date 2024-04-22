import { useTranslation } from "react-i18next";
import { LanguageDirection } from "./lang";

export function useDirection() {
    const { i18n } = useTranslation();
    const isRTL = i18n.dir() === LanguageDirection.RTL ? true : false;
    return isRTL;
}
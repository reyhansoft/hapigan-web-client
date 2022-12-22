import { get } from "@/modules/apiClient/baseApiClient";
import { Language, TextTranslations } from "../types";

export const getLanguages = () => get<Array<Language>>('/i18n/languages')
export const getTranslations = (code: string) => get<TextTranslations>(`/i18n/texts/${code}`)

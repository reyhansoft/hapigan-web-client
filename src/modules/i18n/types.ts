
export type TextTranslations = {
  [key: string]: string
}

export type I18nState = {
  messages: TextTranslations,
  current: string,
  languages: Array<Language>
}

export type Language = {
  name: string,
  isRtl: boolean,
  id: number,
  code: string,
  isDefault: boolean
}

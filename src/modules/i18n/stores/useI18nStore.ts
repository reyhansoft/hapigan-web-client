import { defineStore } from 'pinia'
import { I18nState, Language, TextTranslations } from '../types'

const useI18nStore = defineStore('i18n', {
  state: () => ({
    messages: {},
    current: 'en-US'
  }) as I18nState,
  getters: {
    translate: (state) =>
      (message: string) => state.messages[message] || message
  },
  actions: {
    setLanguages(languages: Array<Language>) {
      this.languages = languages
    },
    setTranslatons(translations: TextTranslations) {
      this.messages = translations
    }
  }
})

export default useI18nStore

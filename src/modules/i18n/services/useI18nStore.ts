import { defineStore } from 'pinia'
import { I18nState } from '../types'

const useI18nStore = defineStore('i18n', {
  state: () => ({
    messages: {},
    current: 'en-US'
  }) as I18nState,
  getters: {
    translate: (state) =>
      (message: string) => state.messages[message] || message
  }
})

export default useI18nStore

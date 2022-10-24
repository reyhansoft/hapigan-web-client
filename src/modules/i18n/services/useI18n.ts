import useI18nStore from "./useI18nStore"
const i18n = () => {
  const store = useI18nStore()
  return {
    t (msg: string, ...args: Array<string>) {
      let translatedMessage = store.translate(msg)
      args.forEach((value, index) => {
        translatedMessage = translatedMessage.replaceAll('{' + index + '}', value)
      })
      return translatedMessage
    }
  }
}

export default i18n

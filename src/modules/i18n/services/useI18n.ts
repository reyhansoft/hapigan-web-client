import useI18nStore from "../stores/useI18nStore"
const useI18n = () => {
  const store = useI18nStore()
  return {
    t (msg: string, ...args: Array<any>) {
      let translatedMessage = store.translate(msg)
      args.forEach((value, index) => {
        translatedMessage = translatedMessage.replaceAll('{' + index + '}', value)
      })
      return translatedMessage
    }
  }
}

export default useI18n

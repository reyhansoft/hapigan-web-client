const i18n = () => {
  return {
    t (msg: string, ...args: Array<string>) {
      args.forEach((value, index) => {
        msg = msg.replaceAll('{' + index + '}', value)
      })
      return msg
    }
  }
}

export default i18n
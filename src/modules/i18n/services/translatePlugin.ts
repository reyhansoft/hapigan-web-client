import { App } from "vue";
import useI18n from "./useI18n";

export default {
  install (app: App) {
    app.config.globalProperties.$t = (msg: string, ...args: Array<string>) => {
      const { t } = useI18n()
      return t(msg, ...args)
    }
  }
}


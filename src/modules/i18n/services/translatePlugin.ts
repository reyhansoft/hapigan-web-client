import { AppLifeCycleService } from "@/services/common/appLifeCycleService";
import { App } from "vue";
import useI18n from "./useI18n";
import useI18nInitializer from "./useI18nInitializer";

export default {
  install (app: App, options: { appLifeCycleService: AppLifeCycleService }) {
    options.appLifeCycleService.onMount(() => {
      return useI18nInitializer()
    })
    app.config.globalProperties.$t = (msg: string, ...args: Array<string>) => {
      const { t } = useI18n()
      return t(msg, ...args)
    }
  }
}


import { AppLifeCycleService } from "@/services/common/appLifeCycleService"
import { App } from "vue"
import { Router } from "vue-router"
import initializeOptions from "./servcies/initializeOptions"

export default {
    install: (app: App<Element>, options: { router: Router, appLifeCycleService: AppLifeCycleService }) => {
      options.appLifeCycleService.onMount(async () => {
        return await initializeOptions()
      })
    }
  }
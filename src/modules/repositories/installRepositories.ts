import { AppLifeCycleService } from "@/services/common/appLifeCycleService"
import { App } from "vue"
import { Router } from "vue-router"
import CreateRepository from './pages/CreateRepository.vue'

export default {
  install: (app: App<Element>, options: { router: Router, appLifeCycleService: AppLifeCycleService }) => {
    options.router.addRoute('repositories-create', { path: '/repositories/new', component: CreateRepository })
  }
}  
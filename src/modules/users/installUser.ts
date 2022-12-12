import { AppLifeCycleService } from '@/services/common/appLifeCycleService'
import { App } from 'vue'
import { Router } from 'vue-router'
import Register from './pages/Register.vue'
import { initializeUserToken } from './services/tokenHandler'

export default {
  install: (app: App<Element>, options: { router: Router, appLifeCycleService: AppLifeCycleService }) => {
    
    options.appLifeCycleService.onMount(async () => {
      return await initializeUserToken()
    })

    options.router.addRoute('', { path: '/register', component: Register })
  }
}

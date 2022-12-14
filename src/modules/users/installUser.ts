import router from '@/router'
import { AppLifeCycleService } from '@/services/common/appLifeCycleService'
import { App } from 'vue'
import { Router, useRouter } from 'vue-router'
import Register from './pages/Register.vue'
import RegisterCompletion from './pages/RegisterCompletion.vue'
import { initializeUserToken } from './services/tokenHandler'
import { useUserStore } from './stores/userStore'

export default {
  install: (app: App<Element>, options: { router: Router, appLifeCycleService: AppLifeCycleService }) => {
    
    options.appLifeCycleService.onMount(async () => {
      return await initializeUserToken(useRouter())
    })

    options.router.addRoute('user-register', { path: '/register', component: Register })
    options.router.addRoute('user-register-completion', { path: '/register/completion', component: RegisterCompletion })
  }
}

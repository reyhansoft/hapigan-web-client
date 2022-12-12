import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { i18n } from './modules/i18n'
import router from './router'
import users from './modules/users/installUser'
import appLifeCycleService from './services/common/appLifeCycleService'

const pinia = createPinia()

const app = createApp(App)

app.use(users, { router, appLifeCycleService })
app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')

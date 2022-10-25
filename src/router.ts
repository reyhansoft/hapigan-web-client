import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/pages/Home.vue'
import MobileVerificationCode from '@/modules/users/components/VerificationCode/MobileVerificationCode.vue'

const routes : Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/register', component: MobileVerificationCode }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

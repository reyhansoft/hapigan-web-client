import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '@/pages/Home.vue'
import Register from '@/modules/users/pages/register.vue'

const routes : Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/register', component: Register }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

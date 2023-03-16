import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/refugee/:refugeeId',
      name: 'refugee',
      component: () => import('../views/Refugee/RefugeeView.vue')
    },
    {
      path: '/create-refugee',
      name: 'createRefugee',
      component: () => import('../views/Refugee/RefugeeCreateView.vue')
    }
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import TheCrucible from '../components/TheCrucible.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/crucible',
      name: 'crucible',
      component: TheCrucible
    }
    // Add more routes as needed
  ]
})

export default router
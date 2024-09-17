// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import MainView from '../views/MainView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LandingPage
    },
    {
      path: '/forge',
      component: MainView,
      children: [
        {
          path: '',
          redirect: { name: 'crucible' }
        },
        {
          path: 'crucible',
          name: 'crucible',
          component: () => import('../components/TheCrucible.vue')
        },
        {
          path: 'mold',
          name: 'mold',
          component: () => import('../components/TheMold.vue')
        },
        {
          path: 'forge',
          name: 'forge',
          component: () => import('../components/TheForge.vue')
        },
        {
          path: 'anvil',
          name: 'anvil',
          component: () => import('../components/TheAnvil.vue')
        },
        {
          path: 'workshop',
          name: 'workshop',
          component: () => import('../components/TheWorkshop.vue')
        },
        {
          path: 'finishing-touch',
          name: 'finishing-touch',
          component: () => import('../components/TheFinishingTouch.vue')
        }
      ]
    },
    // Redirects for convenience
    {
      path: '/crucible',
      redirect: '/forge/crucible'
    },
    {
      path: '/mold',
      redirect: '/forge/mold'
    },
    {
      path: '/anvil',
      redirect: '/forge/anvil'
    },
    {
      path: '/workshop',
      redirect: '/forge/workshop'
    },
    {
      path: '/finishing-touch',
      redirect: '/forge/finishing-touch'
    },
    // Catch-all route for 404 Not Found
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFound.vue') // You'll need to create this component
    }
  ]
})

export default router
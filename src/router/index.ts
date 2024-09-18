// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useIdeaForgeStore } from '../stores/ideaForge'
import LandingPage from '../views/LandingPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/forge',
    component: () => import('../views/MainView.vue'),
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
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../components/SettingsView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../components/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
  const store = useIdeaForgeStore()
  const forgeSteps = ['crucible', 'mold', 'forge', 'anvil', 'workshop', 'finishing-touch']
  
  if (forgeSteps.includes(to.name as string)) {
    const currentStepIndex = forgeSteps.indexOf(store.currentStep)
    const targetStepIndex = forgeSteps.indexOf(to.name as string)

    if (targetStepIndex > currentStepIndex + 1) {
      next({ name: forgeSteps[currentStepIndex + 1] })
    } else {
      store.setCurrentStep(to.name as 'crucible' | 'mold' | 'forge' | 'anvil' | 'workshop' | 'finishingTouch')
      next()
    }
  } else {
    next()
  }
})

export default router
// src/main.ts

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Loading } from 'quasar'
import quasarIconSet from 'quasar/icon-set/material-icons'

// Import Quasar css
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

// Import global components
import ErrorDisplay from './components/ErrorDisplay.vue'

const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router
app.use(router)

// Use Quasar
app.use(Quasar, {
  plugins: {
    Notify,
    Loading
  },
  iconSet: quasarIconSet,
  config: {
    notify: {
      position: 'top',
      timeout: 2500,
      textColor: 'white',
      actions: [{ icon: 'close', color: 'white' }]
    }
  }
})

// Register global components
app.component('ErrorDisplay', ErrorDisplay)

// Global error handler
app.config.errorHandler = (err) => {
  console.error('Global error:', err)
  Notify.create({
    type: 'negative',
    message: 'An unexpected error occurred. Please try again.'
  })
}

// Check for API keys in environment variables
const requiredEnvVars = ['VITE_OLLAMA_BASE_URL', 'VITE_OLLAMA_MODEL', 'VITE_OPENAI_API_KEY', 'VITE_CLAUDE_API_KEY']
const missingEnvVars = requiredEnvVars.filter(key => !import.meta.env[key])

if (missingEnvVars.length > 0) {
  console.warn('Missing environment variables:', missingEnvVars.join(', '))
  Notify.create({
    type: 'warning',
    message: 'Some AI features may not work due to missing configuration. Please check your settings.'
  })
}

// Mount the app
app.mount('#app')

// Log that the app has been initialized (useful for debugging)
console.log('IdeaForge application initialized')
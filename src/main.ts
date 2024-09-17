// src/main.ts
import { createApp } from 'vue'
import { Quasar, Notify } from 'quasar'
import quasarIconSet from 'quasar/icon-set/material-icons'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes you have an App.vue file in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {
    Notify
  },
  iconSet: quasarIconSet,
})

myApp.mount('#app')
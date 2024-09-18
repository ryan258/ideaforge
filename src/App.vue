<!-- src/App.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          IdeaForge
        </q-toolbar-title>

        <q-btn flat round dense icon="settings" to="/settings" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Navigation
        </q-item-label>

        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/forge/crucible">
          <q-item-section avatar>
            <q-icon name="science" />
          </q-item-section>
          <q-item-section>Start Forging</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/settings">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div class="text-subtitle2">© {{ new Date().getFullYear() }} IdeaForge</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import { useQuasar } from 'quasar'

// const $q = useQuasar()

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style>
/* Global styles can be added here */
body {
  font-family: 'Arial', sans-serif;
}

.q-page-container {
  background-color: #f5f5f5;
}

/* You can add more global styles as needed */
</style>
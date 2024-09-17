<!-- src/App.vue -->
<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>IdeaForge</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md">
        <TheCrucible />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import TheCrucible from './components/TheCrucible.vue'
</script>
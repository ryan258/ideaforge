<!-- src/views/MainView.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { useIdeaForgeStore } from '../stores/ideaForge'
import TheCrucible from '../components/TheCrucible.vue'
import TheMold from '../components/TheMold.vue'
import TheForge from '../components/TheForge.vue'
import TheAnvil from '../components/TheAnvil.vue'
import TheWorkshop from '../components/TheWorkshop.vue'
import TheFinishingTouch from '../components/TheFinishingTouch.vue'

// Initialize the store
const store = useIdeaForgeStore()

// Compute the current component based on the current step in the store
const currentComponent = computed(() => {
  switch (store.currentStep) {
    case 'crucible': return TheCrucible
    case 'mold': return TheMold
    case 'forge': return TheForge
    case 'anvil': return TheAnvil
    case 'workshop': return TheWorkshop
    case 'finishingTouch': return TheFinishingTouch
    default: return TheCrucible // Default to TheCrucible if unknown step
  }
})
</script>

<template>
  <div class="main-view">
    <!-- Dynamically render the current component based on the store's current step -->
    <component :is="currentComponent" />
  </div>
</template>

<style scoped>
.main-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
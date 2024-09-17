<!-- src/components/TheAnvil.vue -->
<template>
    <div class="anvil q-pa-md">
      <h2>🔨 The Anvil</h2>
      <p>Welcome to The Anvil! Here we'll refine and shape your idea.</p>
  
      <!-- Display the current idea -->
      <div v-if="currentIdea" class="q-my-md">
        <h3>Your Current Idea:</h3>
        <p>{{ currentIdea }}</p>
      </div>
  
      <!-- TODO: Add refinement options and interactions -->
  
      <!-- Loading spinner -->
      <q-inner-loading :showing="isLoading">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
  
      <!-- Error display component -->
      <ErrorDisplay :error="error || ''" />
  
      <!-- Button to proceed to next step -->
      <div class="q-mt-md">
        <q-btn 
          color="secondary" 
          label="Continue to The Workshop" 
          @click="proceedToWorkshop" 
          :disable="!canProceed" 
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useIdeaForgeStore } from '../stores/ideaForge'
  import ErrorDisplay from './ErrorDisplay.vue'
  
  // Initialize the store and router
  const store = useIdeaForgeStore()
  const router = useRouter()
  
  // Destructure reactive properties from the store
  const { currentIdea, isLoading, error } = storeToRefs(store)
  
  // TODO: Implement canProceed logic based on refinement state
  const canProceed = computed(() => true)
  
  // Function to proceed to the next step (TheWorkshop)
  const proceedToWorkshop = () => {
    if (canProceed.value) {
      store.setCurrentStep('workshop')
      router.push({ name: 'workshop' })
    }
  }
  </script>
  
  <style scoped>
  .anvil {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
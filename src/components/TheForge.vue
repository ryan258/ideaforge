<!-- src/components/TheForge.vue -->
<template>
    <div class="forge q-pa-md">
      <h2>🔥 The Forge</h2>
      <p>Welcome to The Forge! Let's explore different directions for your idea.</p>
  
      <!-- Display the current idea -->
      <div v-if="currentIdea" class="q-my-md">
        <h3>Your Current Idea:</h3>
        <p>{{ currentIdea }}</p>
      </div>
  
      <!-- List of available directions -->
      <div v-if="availableDirections.length > 0" class="q-my-md">
        <h3>Possible Directions:</h3>
        <q-list bordered separator>
          <q-item 
            v-for="(direction, index) in availableDirections" 
            :key="index" 
            clickable 
            v-ripple 
            @click="selectDirection(direction)"
          >
            <q-item-section>
              <q-item-label>{{ direction }}</q-item-label>
            </q-item-section>
            <q-item-section side v-if="chosenDirection === direction">
              <q-icon name="check" color="positive" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
  
      <!-- Button to generate new direction -->
      <div class="q-mt-md">
        <q-btn 
          color="primary" 
          label="Generate Direction" 
          @click="generateDirection" 
          :disable="isLoading" 
        />
      </div>
  
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
          label="Continue to The Anvil" 
          @click="proceedToAnvil" 
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
  const { currentIdea, isLoading, error, chosenDirection, availableDirections } = storeToRefs(store)
  
  // Computed property to check if we can proceed to next step
  const canProceed = computed(() => !!chosenDirection.value)
  
  // Function to generate a new direction
  const generateDirection = async () => {
    await store.generateDirectionWithAI()
  }
  
  // Function to select a direction
  const selectDirection = (direction: string) => {
    store.setChosenDirection(direction)
  }
  
  // Function to proceed to the next step (TheAnvil)
  const proceedToAnvil = () => {
    if (canProceed.value) {
      store.setCurrentStep('anvil')
      router.push({ name: 'anvil' })
    }
  }
  </script>
  
  <style scoped>
  .forge {
    max-width: 600px;
    margin: 0 auto;
  }
  </style>
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

    <!-- List of available directions with rationales -->
    <div v-if="availableDirections.length > 0" class="q-my-md">
      <h3>Possible Directions:</h3>
      <q-list bordered separator>
        <q-expansion-item
          v-for="(directionItem, index) in availableDirections"
          :key="index"
          :label="directionItem.direction"
          :caption="chosenDirection === directionItem.direction ? 'Selected' : ''"
          :default-opened="chosenDirection === directionItem.direction"
        >
          <q-card>
            <q-card-section>
              <p><strong>Rationale:</strong> {{ directionItem.rationale }}</p>
              <q-btn
                v-if="chosenDirection !== directionItem.direction"
                color="primary"
                label="Select This Direction"
                @click="selectDirection(directionItem.direction, directionItem.rationale)"
                class="q-mt-sm"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
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

    <!-- Error display component -->
    <ErrorDisplay :error="error || ''" />

    <!-- Loading spinner -->
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <!-- Button to proceed to next step -->
    <div class="q-mt-md">
      <q-btn 
        color="secondary" 
        label="Continue to The Anvil" 
        @click="proceedToAnvil" 
        :disable="!canProceedToAnvil" 
      />
    </div>
    <!-- Debug info -->
    <div class="q-mt-md text-caption">
      Debug: Chosen Direction: {{ chosenDirection }}
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useIdeaForgeStore } from '../stores/ideaForge'
import ErrorDisplay from './ErrorDisplay.vue'

// Initialize the store and router
const store = useIdeaForgeStore()
const router = useRouter()

// Destructure reactive properties from the store
const { 
  currentIdea, 
  isLoading, 
  error, 
  chosenDirection, 
  chosenDirectionRationale, 
  availableDirections 
} = storeToRefs(store)

// Computed property to check if we can proceed to next step
const canProceed = computed(() => !!chosenDirection.value && availableDirections.value.length > 0)

// New computed property to determine if the "Continue to The Anvil" button should be disabled
const canProceedToAnvil = computed(() => {
  return store.hasChosenDirection && !error.value
})

// Function to generate a new direction
const generateDirection = async () => {
  await store.generateDirectionWithAI()
}

// Function to select a direction
const selectDirection = (direction: string, rationale: string) => {
  store.setChosenDirection(direction, rationale)
  console.log('Direction selected:', direction) // Debug log
}

// Function to proceed to the next step (TheAnvil)
const proceedToAnvil = () => {
  if (canProceedToAnvil.value) {
    store.setCurrentStep('anvil')
    router.push({ name: 'anvil' })
  } else {
    store.setError('Please select a direction before continuing.')
  }
}

// Debug: Watch for changes in chosenDirection
watch(chosenDirection, (newVal) => {
  console.log('chosenDirection changed:', newVal)
})

</script>
  
<style scoped>
.forge {
  max-width: 600px;
  margin: 0 auto;
}
</style>
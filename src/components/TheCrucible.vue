<!-- src/components/TheCrucible.vue -->
<template>
  <div class="crucible q-pa-md">
    <h2>🧪 The Crucible</h2>
    <p>Welcome to The Crucible! Enter your idea or let our AI suggest one.</p>

    <!-- Input field for user's idea -->
    <q-input
      v-model="userIdea"
      label="Enter your awesome idea"
      type="textarea"
      rows="4"
    />

    <div class="q-mt-md">
      <!-- Button to submit user's idea -->
      <q-btn
        color="primary"
        label="Submit My Idea"
        @click="submitIdea"
        :disabled="isLoading"
      />
      <!-- Button to generate AI idea -->
      <q-btn
        color="secondary"
        label="Generate New Idea"
        @click="generateIdea"
        :disabled="isLoading"
        class="q-ml-sm"
      />
    </div>

    <!-- Display the current idea -->
    <div v-if="currentIdea" class="q-mt-md q-pa-md bg-grey-2">
      <h3>Your Awesome Idea:</h3>
      <p>{{ currentIdea }}</p>
    </div>

    <!-- Error display component -->
    <ErrorDisplay :error="error || ''" />

    <!-- Loading spinner -->
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useIdeaForgeStore } from '../stores/ideaForge'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ErrorDisplay from './ErrorDisplay.vue'

// Initialize the store and router
const store = useIdeaForgeStore()
const router = useRouter()

// Destructure reactive properties from the store
const { isLoading, error, currentIdea } = storeToRefs(store)

// Ref for user's input idea
const userIdea = ref('')

// Function to submit user's idea
const submitIdea = () => {
  if (userIdea.value.trim() === '') {
    store.setError("Oops! Your idea can't be empty. Let's think of something cool! 🤔")
    return
  }
  
  store.setOriginalIdea(userIdea.value)
  navigateToNextStep()
}

// Function to generate idea using AI
const generateIdea = async () => {
  await store.generateIdeaWithAI()
  if (!error.value) {
    navigateToNextStep()
  }
}

// Function to navigate to the next step (TheMold)
const navigateToNextStep = () => {
  console.log('Navigating to next step: Mold')
  store.setCurrentStep('mold')
  router.push({ name: 'mold' })
}

// Debug log
console.log('TheCrucible component loaded')
</script>

<style scoped>
.crucible {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
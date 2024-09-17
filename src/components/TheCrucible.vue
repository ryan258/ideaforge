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
import { generateText } from '../services/ollamaService'

// Initialize the store and router
const store = useIdeaForgeStore()
const router = useRouter()

// Destructure reactive properties from the store
const { isLoading, error } = storeToRefs(store)

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

// Function to generate idea using Ollama
const generateIdeaWithOllama = async () => {
  store.setLoading(true)
  store.setError(null)
  try {
    // Prompt for Ollama to generate a creative idea
    const prompt = "Generate a creative idea for a 5th-grade student's project:"
    const generatedIdea = await generateText(prompt)
    store.setOriginalIdea(generatedIdea)
    navigateToNextStep()
  } catch (error) {
    if (error instanceof Error) {
      store.setError(error.message)
    } else {
      store.setError('An unexpected error occurred')
    }
  } finally {
    store.setLoading(false)
  }
}

// Function to generate idea (now uses Ollama)
const generateIdea = async () => {
  await generateIdeaWithOllama()
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
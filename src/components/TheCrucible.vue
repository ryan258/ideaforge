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
      :disable="isLoading"
    />

    <div class="q-mt-md">
      <!-- Button to submit user's idea -->
      <q-btn
        color="primary"
        label="Submit My Idea"
        @click="submitIdea"
        :disable="isLoading"
      />
      <!-- Button to generate AI idea -->
      <q-btn
        color="secondary"
        label="Generate New Idea"
        @click="generateIdea"
        :disable="isLoading"
        class="q-ml-sm"
      />
    </div>

    <!-- AI Model Selection -->
    <div class="q-mt-md">
      <q-select
        v-model="selectedAIModel"
        :options="aiModelOptions"
        label="Select AI Model"
        :disable="isLoading"
      />
    </div>

    <!-- Display the generated or submitted idea -->
    <div v-if="currentIdea" class="q-mt-md">
      <h3>Your Awesome Idea:</h3>
      <p>{{ currentIdea }}</p>
    </div>

    <!-- Error display component -->
    <ErrorDisplay :error="error" />

    <!-- Loading spinner -->
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
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

// AI model selection
const selectedAIModel = ref(store.userPreferences.preferredAIModel)
const aiModelOptions = ['ollama', 'openai', 'claude']

// Watch for changes in selected AI model
watch(selectedAIModel, (newModel) => {
  store.setPreferredAIModel(newModel as 'ollama' | 'openai' | 'claude')
})

// Function to submit user's idea
const submitIdea = () => {
  if (userIdea.value.trim() === '') {
    store.setError("Oops! Your idea can't be empty. Let's think of something cool! 🤔")
    return
  }
  
  store.setOriginalIdea(userIdea.value)
  navigateToNextStep()
}

// Function to generate idea using the selected AI model
const generateIdea = async () => {
  try {
    await store.generateIdeaWithAI()
    if (store.originalIdea) {
      navigateToNextStep()
    }
  } catch (error) {
    console.error('Error generating idea:', error)
    // Error is already set in the store, so we don't need to set it here
  }
}

// Function to navigate to the next step (TheMold)
const navigateToNextStep = () => {
  console.log('Navigating to next step: Mold')
  store.setCurrentStep('mold')
  router.push({ name: 'mold' })
}

// Computed property to determine if we can proceed
// const canProceed = computed(() => !!store.originalIdea && !isLoading.value)
</script>

<style scoped>
.crucible {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.q-btn {
  margin-top: 1rem;
}
</style>
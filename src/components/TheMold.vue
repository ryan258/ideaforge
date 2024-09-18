<!-- src/components/TheMold.vue -->
<template>
  <div class="mold q-pa-md">
    <h2>🧬 The Mold</h2>
    <p>Welcome to The Mold! Let's create some fun personas who would love your idea.</p>

    <!-- Display the original idea as reference -->
    <div v-if="originalIdea" class="q-my-md q-pa-md bg-grey-2">
      <h3>Your Original Idea:</h3>
      <p>{{ originalIdea }}</p>
    </div>

    <!-- List of generated personas -->
    <div v-if="selectedPersonas.length > 0" class="q-my-md">
      <h3>Generated Personas:</h3>
      <q-list bordered separator>
        <q-expansion-item
          v-for="(persona, index) in selectedPersonas"
          :key="index"
          :label="persona.name"
          group="personas"
          icon="person"
        >
          <q-card>
            <q-card-section>
              <p><strong>Age:</strong> {{ persona.age }}</p>
              <p><strong>Occupation:</strong> {{ persona.occupation }}</p>
              <p><strong>Interests:</strong> {{ persona.interests.join(', ') }}</p>
              <p><strong>Why they love the idea:</strong> {{ persona.reasonForInterest }}</p>
            </q-card-section>
            <q-card-actions>
              <q-btn flat color="negative" icon="delete" label="Remove" @click="removePersona(index)" />
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>

    <div class="q-mt-md">
      <!-- Button to generate new persona -->
      <q-btn
        color="primary"
        label="Generate New Persona"
        @click="generatePersona"
        :disable="isLoading"
      />
    </div>

    <!-- Button to proceed to next step -->
    <div v-if="canProceed" class="q-mt-md">
      <q-btn
        color="secondary"
        label="Continue to The Forge"
        @click="proceedToForge"
        :disable="isLoading"
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
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useIdeaForgeStore } from '../stores/ideaForge'
import ErrorDisplay from './ErrorDisplay.vue'

// Initialize the store and router
const store = useIdeaForgeStore()
const router = useRouter()

// Destructure reactive properties from the store
const { selectedPersonas, isLoading, error, originalIdea } = storeToRefs(store)

// Computed property to check if we can proceed to next step
const canProceed = computed(() => selectedPersonas.value.length > 0)

// Function to generate a new persona using AI
const generatePersona = async () => {
  try {
    await store.generatePersonaWithAI()
  } catch (error) {
    console.error('Failed to generate persona:', error)
    // The error is already set in the store, so we don't need to set it here
  }
}

// Function to remove a persona
const removePersona = (index: number) => {
  store.removePersona(index)
}

// Function to proceed to the next step (TheForge)
const proceedToForge = () => {
  if (canProceed.value) {
    store.setCurrentStep('forge')
    router.push({ name: 'forge' })
  }
}
</script>

<style scoped>
.mold {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.q-btn {
  margin-top: 1rem;
}

.bg-grey-2 {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
}
</style>
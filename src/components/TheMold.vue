<!-- src/components/TheMold.vue -->
<template>
  <div class="mold q-pa-md">
    <h2>🧬 The Mold</h2>
    <p>Welcome to The Mold! Let's create some fun personas for your idea.</p>

    <!-- List of selected personas -->
    <q-list bordered separator>
      <q-item v-for="(persona, index) in selectedPersonas" :key="index">
        <q-item-section>
          <q-item-label>{{ persona }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat round color="red" icon="delete" @click="removePersona(persona)" />
        </q-item-section>
      </q-item>
    </q-list>

    <div class="q-mt-md">
      <!-- Button to generate new persona -->
      <q-btn
        color="primary"
        label="Generate Persona"
        @click="generatePersona"
        :disable="isLoading"
      />
    </div>

    <!-- Loading spinner -->
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <!-- Error display component -->
    <ErrorDisplay :error="error || ''" />

    <div class="q-mt-md">
      <!-- Button to proceed to next step -->
      <q-btn
        color="secondary"
        label="Continue to The Forge"
        @click="proceedToForge"
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
const { selectedPersonas, isLoading, error } = storeToRefs(store)

// Computed property to check if we can proceed to next step
const canProceed = computed(() => selectedPersonas.value.length > 0)

// Function to generate a new persona
const generatePersona = async () => {
  await store.generatePersonaWithAI()
}

// Function to remove a persona
const removePersona = (persona: string) => {
  store.removePersona(persona)
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
</style>
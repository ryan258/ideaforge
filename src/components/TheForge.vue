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

    <!-- Display generated personas with expandable details -->
    <div v-if="selectedPersonas.length > 0" class="q-my-md">
    <h3>Generated Personas:</h3>
    <q-list bordered separator>
        <q-expansion-item
        v-for="(persona, index) in selectedPersonas"
        :key="index"
        :label="persona.name"
        :caption="`${persona.age}, ${persona.occupation}`"
        icon="person"
        >
        <q-card>
            <q-card-section>
            <p><strong>Age:</strong> {{ persona.age }}</p>
            <p><strong>Occupation:</strong> {{ persona.occupation }}</p>
            <p><strong>Interests:</strong> {{ persona.interests.join(', ') }}</p>
            <p><strong>Why they love the idea:</strong> {{ persona.reasonForInterest }}</p>
            </q-card-section>
            <q-card-actions align="right">
            <q-btn flat color="negative" icon="delete" label="Remove" @click="removePersona(index)" />
            </q-card-actions>
        </q-card>
        </q-expansion-item>
    </q-list>
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
const { 
  currentIdea, 
  isLoading, 
  error, 
  chosenDirection, 
  chosenDirectionRationale, 
  availableDirections, 
  selectedPersonas 
} = storeToRefs(store)

// Computed property to check if we can proceed to next step
const canProceed = computed(() => !!chosenDirection.value)

// Function to generate a new direction
const generateDirection = async () => {
  await store.generateDirectionWithAI()
}

// Function to select a direction
const selectDirection = (direction: string, rationale: string) => {
  store.setChosenDirection(direction, rationale)
}

// Function to remove a persona
const removePersona = (index: number) => {
  store.removePersona(index)
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
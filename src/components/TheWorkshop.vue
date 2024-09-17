<!-- src/components/TheWorkshop.vue -->
<template>
<div class="workshop q-pa-md">
    <h2>🛠️ The Workshop</h2>
    <p>Welcome to The Workshop! Here we'll craft your social media content.</p>

    <!-- Display the current idea -->
    <div v-if="currentIdea" class="q-my-md">
    <h3>Your Refined Idea:</h3>
    <p>{{ currentIdea }}</p>
    </div>

    <!-- List of generated social media content ideas -->
    <div v-if="socialMediaIdeas.length > 0" class="q-my-md">
    <h3>Social Media Content Ideas:</h3>
    <q-list bordered separator>
        <q-item v-for="(idea, index) in socialMediaIdeas" :key="index">
        <q-item-section>
            <q-item-label>{{ idea }}</q-item-label>
        </q-item-section>
        </q-item>
    </q-list>
    </div>

    <!-- Button to generate social media content -->
    <div class="q-mt-md">
    <q-btn 
        color="primary" 
        label="Generate Social Media Content" 
        @click="generateSocialMediaContent" 
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
        label="Continue to The Finishing Touch" 
        @click="proceedToFinishingTouch" 
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
const { currentIdea, isLoading, error, socialMediaIdeas } = storeToRefs(store)

// Computed property to check if we can proceed to next step
const canProceed = computed(() => socialMediaIdeas.value.length > 0)

// Function to generate social media content
const generateSocialMediaContent = async () => {
// TODO: Implement social media content generation
console.log('Generating social media content')
}

// Function to proceed to the next step (TheFinishingTouch)
const proceedToFinishingTouch = () => {
if (canProceed.value) {
    store.setCurrentStep('finishingTouch')
    router.push({ name: 'finishing-touch' })
}
}
</script>

<style scoped>
.workshop {
max-width: 600px;
margin: 0 auto;
}
</style>
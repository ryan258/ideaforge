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
        <q-item-section side>
          <q-btn flat round color="red" icon="delete" @click="removeIdea(index)" />
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

  <!-- Platform selection for content generation -->
  <div class="q-mt-md">
    <q-select
      v-model="selectedPlatform"
      :options="platforms"
      label="Select Platform"
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useIdeaForgeStore } from '../stores/ideaForge'
import ErrorDisplay from './ErrorDisplay.vue'

// Initialize the store and router
const store = useIdeaForgeStore()
const router = useRouter()

// Destructure reactive properties from the store
const { currentIdea, isLoading, error, socialMediaIdeas } = storeToRefs(store)

// Platform selection
const selectedPlatform = ref('Twitter')
const platforms = ['Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok']

// Computed property to check if we can proceed to next step
const canProceed = computed(() => socialMediaIdeas.value.length > 0)

// Function to generate social media content
const generateSocialMediaContent = async () => {
try {
  store.setLoading(true)
  const prompt = `Generate a creative ${selectedPlatform.value} post for this idea: "${currentIdea.value}". 
                  The post should be engaging and suitable for a ${selectedPlatform.value} audience.`
  const content = await store.generateTextWithAI(prompt)
  store.addSocialMediaIdea(content.trim())
} catch (error) {
  console.error('Failed to generate social media content:', error)
  store.setError('Oops! We had trouble creating social media content. Let\'s try again!')
} finally {
  store.setLoading(false)
}
}

// Function to remove an idea
const removeIdea = (index: number) => {
store.socialMediaIdeas.splice(index, 1)
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

.q-list {
margin-top: 1rem;
}

.q-item {
padding: 1rem;
}
</style>
<!-- src/components/TheFinishingTouch.vue -->
<template>
<div class="finishing-touch q-pa-md">
    <h2>🎨 The Finishing Touch</h2>
    <p>Welcome to The Finishing Touch! Here we'll put the final polish on your idea.</p>

    <!-- Display the current idea -->
    <div v-if="currentIdea" class="q-my-md">
    <h3>Your Final Idea:</h3>
    <p>{{ currentIdea }}</p>
    </div>

    <!-- Display social media content -->
    <div v-if="socialMediaIdeas.length > 0" class="q-my-md">
    <h3>Your Social Media Content:</h3>
    <q-list bordered separator>
        <q-item v-for="(content, index) in socialMediaIdeas" :key="index">
        <q-item-section>
            <q-item-label>{{ content }}</q-item-label>
        </q-item-section>
        </q-item>
    </q-list>
    </div>

    <!-- TODO: Add options for final adjustments -->

    <!-- Button to make final adjustments -->
    <div class="q-mt-md">
    <q-btn 
        color="primary" 
        label="Make Final Adjustments" 
        @click="makeFinalAdjustments" 
        :disable="isLoading" 
    />
    </div>

    <!-- Loading spinner -->
    <q-inner-loading :showing="isLoading">
    <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <!-- Error display component -->
    <ErrorDisplay :error="error || ''" />

    <!-- Button to finish the process -->
    <div class="q-mt-md">
    <q-btn 
        color="secondary" 
        label="Finish and Save" 
        @click="finishAndSave" 
        :disable="!canFinish" 
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

// Computed property to check if we can finish the process
// TODO: Implement proper logic for when the process can be finished
const canFinish = computed(() => true)

// Function to make final adjustments
const makeFinalAdjustments = async () => {
// TODO: Implement final adjustment logic
console.log('Making final adjustments')
}

// Function to finish the process and save the result
const finishAndSave = () => {
if (canFinish.value) {
    // TODO: Implement saving logic
    console.log('Finishing and saving the idea')
    // Navigate to a results or summary page
    router.push({ name: 'results' })
}
}
</script>

<style scoped>
.finishing-touch {
max-width: 600px;
margin: 0 auto;
}
</style>
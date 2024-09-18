<!-- src/components/TheFinishingTouch.vue -->
<template>
<div class="finishing-touch q-pa-md">
    <h2>🎨 The Finishing Touch</h2>
    <p>Welcome to The Finishing Touch! Here we'll put the final polish on your idea.</p>

    <!-- Display the current idea -->
    <div v-if="currentIdea" class="q-my-md">
    <h3>Your Final Idea:</h3>
    <div v-html="renderedIdea"></div>
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

    <!-- Final adjustments input -->
    <q-input
    v-model="finalAdjustments"
    label="Any final touches? Add them here!"
    type="textarea"
    rows="4"
    />

    <!-- Button to make final adjustments -->
    <div class="q-mt-md">
    <q-btn 
        color="primary" 
        label="Apply Final Touches" 
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

    <!-- Project summary modal -->
    <q-dialog v-model="showSummary">
    <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
        <div class="text-h6">Your IdeaForge Project Summary</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
        <h5>Original Idea:</h5>
        <p>{{ originalIdea }}</p>

        <h5>Final Idea:</h5>
        <div v-html="renderedIdea"></div>

        <h5>Social Media Content:</h5>
        <ul>
            <li v-for="(content, index) in socialMediaIdeas" :key="index">
            {{ content }}
            </li>
        </ul>
        </q-card-section>

        <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
        <q-btn flat label="Export" color="secondary" @click="exportProject" />
        </q-card-actions>
    </q-card>
    </q-dialog>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useIdeaForgeStore } from '../stores/ideaForge'
import ErrorDisplay from './ErrorDisplay.vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Initialize the store and router
const store = useIdeaForgeStore()
// const router = useRouter()

// Destructure reactive properties from the store
const { currentIdea, originalIdea, isLoading, error, socialMediaIdeas } = storeToRefs(store)

// Local state
const finalAdjustments = ref('')
const showSummary = ref(false)

// Computed property to check if we can finish the process
const canFinish = computed(() => !!currentIdea.value && socialMediaIdeas.value.length > 0)

// Function to render markdown safely
function renderMarkdown(text: string): string {
if (typeof text !== 'string') return ''
const rawHtml = marked(text || '')
return DOMPurify.sanitize(rawHtml)
}

// Computed property to render the current idea as markdown
const renderedIdea = computed(() => {
return renderMarkdown(currentIdea.value || '')
})

// Function to make final adjustments
const makeFinalAdjustments = async () => {
if (!finalAdjustments.value.trim()) {
    store.setError("Please enter some final adjustments before applying.")
    return
}

try {
    store.setLoading(true)
    const prompt = `Please provide a final polished version of this idea, incorporating these adjustments: "${finalAdjustments.value}".
                    Current idea: "${currentIdea.value}"`
    const refinedIdea = await store.generateTextWithAI(prompt)
    store.updateCurrentIdea(refinedIdea.trim())
    finalAdjustments.value = '' // Clear the input after applying
} catch (error) {
    console.error('Failed to make final adjustments:', error)
    store.setError('Oops! We had trouble applying your final touches. Let\'s try again!')
} finally {
    store.setLoading(false)
}
}

// Function to finish the process and save the result
const finishAndSave = () => {
if (canFinish.value) {
    showSummary.value = true
    // Here you might want to call a method to save the project to a database or local storage
}
}

// Function to export the project (placeholder)
const exportProject = () => {
console.log('Exporting project...')
// Implement project export functionality here
// This could involve generating a PDF, JSON file, or other format
}
</script>

<style scoped>
.finishing-touch {
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

/* Add some basic styling for rendered markdown */
:deep(h1, h2, h3, h4, h5, h6) {
margin-top: 1em;
margin-bottom: 0.5em;
}

:deep(p) {
margin-bottom: 1em;
}

:deep(ul, ol) {
margin-bottom: 1em;
padding-left: 2em;
}

:deep(li) {
margin-bottom: 0.5em;
}

:deep(code) {
background-color: #f0f0f0;
padding: 0.2em 0.4em;
border-radius: 3px;
}

:deep(pre) {
background-color: #f0f0f0;
padding: 1em;
border-radius: 5px;
overflow-x: auto;
}

:deep(blockquote) {
border-left: 4px solid #ccc;
padding-left: 1em;
margin-left: 0;
color: #666;
}
</style>
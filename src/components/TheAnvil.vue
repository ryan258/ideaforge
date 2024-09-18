<!-- src/components/TheAnvil.vue -->
<template>
  <div class="anvil q-pa-md">
    <h2>🔨 The Anvil</h2>
    <p>Welcome to The Anvil! Here we'll make your idea even more awesome!</p>

    <!-- Display the current idea -->
    <div v-if="currentIdea" class="q-my-md">
      <h3>Your Current Idea:</h3>
      <div v-if="isLoading">
        <q-spinner color="primary" size="2em" />
        <span class="q-ml-sm">Shaping your idea...</span>
      </div>
      <div v-else-if="error">
        <p class="text-negative">Oops! Something went wrong: {{ error }}</p>
      </div>
      <div v-else v-html="renderedIdea"></div>
    </div>

    <!-- AI Suggestions -->
    <div v-if="aiSuggestions.length > 0" class="q-my-md">
      <h3>Cool Ideas from our Robot Friend:</h3>
      <ul>
        <li v-for="(suggestion, index) in aiSuggestions" :key="index">
          <div v-html="renderedSuggestions[index]"></div>
        </li>
      </ul>
    </div>

    <!-- Persona Feedback -->
    <div v-if="personaFeedback.length > 0" class="q-my-md">
      <h3>What Your Friendly Helpers Think:</h3>
      <q-list bordered separator>
        <q-item v-for="(feedback, index) in personaFeedback" :key="index">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ feedback.persona.name[0] }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ feedback.persona.name }} says:</q-item-label>
            <q-item-label caption>
              <div v-html="renderedFeedback[index]"></div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- User refinement input -->
    <q-input
      v-model="userRefinement"
      label="Make your idea even cooler here!"
      type="textarea"
      rows="4"
    />

    <!-- Refine button -->
    <q-btn
      class="q-mt-md"
      color="primary"
      label="Make My Idea Super Awesome!"
      @click="refineIdea"
      :disable="isLoading"
    />

    <!-- Loading spinner -->
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <!-- Error display -->
    <ErrorDisplay :error="error" />

    <!-- Continue button -->
    <q-btn
      class="q-mt-md"
      color="secondary"
      label="Continue to The Workshop"
      @click="proceedToWorkshop"
      :disable="!canProceed"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useIdeaForgeStore } from '../stores/ideaForge'
import ErrorDisplay from './ErrorDisplay.vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// Initialize store and router
const store = useIdeaForgeStore()
const router = useRouter()

// Get reactive properties from the store
const { currentIdea, isLoading, error, selectedPersonas } = storeToRefs(store)

// Local state
const aiSuggestions = ref<string[]>([])
const personaFeedback = ref<Array<{ persona: any; suggestion: string }>>([])
const userRefinement = ref('')
const renderedIdea = ref('')
const renderedSuggestions = ref<string[]>([])
const renderedFeedback = ref<string[]>([])

// Computed property to check if we can proceed
const canProceed = computed(() => !!currentIdea.value && !isLoading.value && !error.value)

// Function to render markdown safely
async function renderMarkdown(text: string): Promise<string> {
  if (typeof text !== 'string') return ''
  const rawHtml = await marked(text || '')
  return DOMPurify.sanitize(rawHtml)
}

// Watch for changes in currentIdea and render markdown
watch(currentIdea, async () => {
  if (currentIdea.value) {
    renderedIdea.value = await renderMarkdown(currentIdea.value)
  }
}, { immediate: true })

// Function to get AI suggestions
const getAISuggestions = async () => {
  try {
    store.setLoading(true)
    const prompt = `Give 3 cool suggestions to make this idea even better: "${currentIdea.value}"`
    const response = await store.generateTextWithAI(prompt)
    aiSuggestions.value = response.split('\n').filter(suggestion => suggestion.trim() !== '')
    renderedSuggestions.value = await Promise.all(aiSuggestions.value.map(renderMarkdown))
  } catch (error) {
    store.setError('Oops! Our robot friend is taking a nap. Try again later!')
  } finally {
    store.setLoading(false)
  }
}

// Function to get persona feedback
const getPersonaFeedback = async () => {
  try {
    store.setLoading(true)
    personaFeedback.value = []
    for (const persona of selectedPersonas.value) {
      const prompt = `As ${persona.name}, a ${persona.age}-year-old ${persona.occupation} interested in ${persona.interests.join(', ')}, 
        give one specific suggestion to improve this idea: "${currentIdea.value}". 
        Your suggestion should reflect your age, occupation, and interests.`
      const suggestion = await store.generateTextWithAI(prompt)
      personaFeedback.value.push({ persona, suggestion: suggestion.trim() })
    }
    renderedFeedback.value = await Promise.all(personaFeedback.value.map(fb => renderMarkdown(fb.suggestion)))
  } catch (error) {
    store.setError('Uh-oh! Our friendly helpers are busy. Let\'s try again later!')
  } finally {
    store.setLoading(false)
  }
}

// Function to refine the idea
const refineIdea = async () => {
  if (userRefinement.value.trim() === '') {
    store.setError("Uh-oh! You didn't type anything. Give it another try!")
    return
  }

  try {
    store.setLoading(true)
    const refinedIdea = await store.generateTextWithAI(
      `Refine this idea: "${currentIdea.value}" with these changes: "${userRefinement.value}"`
    )
    store.updateCurrentIdea(refinedIdea.trim())
    userRefinement.value = ''
    await Promise.all([getAISuggestions(), getPersonaFeedback()])
  } catch (error) {
    store.setError('Oops! Something went wrong. Let\'s try that again!')
  } finally {
    store.setLoading(false)
  }
}

// Function to proceed to the next step
const proceedToWorkshop = () => {
  if (canProceed.value) {
    store.setCurrentStep('workshop')
    router.push({ name: 'workshop' })
  }
}

// Get initial AI suggestions and persona feedback when component is mounted
onMounted(async () => {
  if (currentIdea.value) {
    await Promise.all([getAISuggestions(), getPersonaFeedback()])
  }
})
</script>

<style scoped>
.anvil {
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
<!-- src/components/Settings.vue -->
<template>
    <div class="settings q-pa-md">
      <h2>Settings</h2>
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-select
          v-model="preferredAIModel"
          :options="aiModelOptions"
          label="Preferred AI Model"
        />
        <q-input v-model="apiKey" label="API Key" type="password" />
        <q-btn label="Save Settings" type="submit" color="primary"/>
      </q-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useIdeaForgeStore } from '../stores/ideaForge'
  
  const store = useIdeaForgeStore()
  
  const preferredAIModel = ref(store.userPreferences.preferredAIModel)
  const apiKey = ref('')
  const aiModelOptions = ['ollama', 'openai', 'claude']
  
  const onSubmit = () => {
    store.setPreferredAIModel(preferredAIModel.value as 'ollama' | 'openai' | 'claude')
    // TODO: Implement API key saving logic
    console.log('Settings saved')
  }
  
  onMounted(() => {
    preferredAIModel.value = store.userPreferences.preferredAIModel
    // TODO: Load API key if needed
  })
  </script>
<template>
    <div class="crucible q-pa-md">
      <h2>The Crucible</h2>
      <q-input v-model="idea" label="Enter your idea" />
      <q-btn @click="generateIdea" label="Generate New Idea" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  
  export default defineComponent({
    name: 'TheCrucible',
    setup() {
      const idea = ref('')
  
      const generateIdea = () => {
        // TODO: Implement idea generation logic
        console.log('Generating new idea')
      }
  
      return {
        idea,
        generateIdea
      }
    }
  })
  </script>
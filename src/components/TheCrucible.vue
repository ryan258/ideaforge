<!-- src/components/TheCrucible.vue -->
<template>
  <div class="crucible">
    <h2>🧪 The Crucible</h2>
    <p>Welcome to The Crucible! Enter your idea or let our AI suggest one.</p>

    <textarea v-model="userIdea" placeholder="Enter your awesome idea" rows="4" style="width: 100%; margin-bottom: 10px;"></textarea>

    <div>
      <button @click="submitIdea" :disabled="isLoading">Submit My Idea</button>
      <button @click="generateIdea" :disabled="isLoading">Generate New Idea</button>
    </div>

    <div v-if="finalIdea" style="margin-top: 20px; border: 1px solid #ccc; padding: 10px;">
      <h3>Your Awesome Idea:</h3>
      <p>{{ finalIdea }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const userIdea = ref('')
const finalIdea = ref('')
const isLoading = ref(false)

const submitIdea = () => {
  if (userIdea.value.trim() === '') {
    alert("Oops! Your idea can't be empty. Let's think of something cool! 🤔")
    return
  }
  
  finalIdea.value = userIdea.value
  alert('Great idea! Moving to the next step.')
}

const generateIdea = async () => {
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1500))  // Simulating API call
    finalIdea.value = "Create a funny TikTok video about a day in the life of a pencil"
    alert('AI generated an awesome idea for you!')
  } catch (err) {
    alert("Uh-oh! Our idea machine is taking a nap. Let's try again soon! 😴")
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.crucible {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
button {
  margin-right: 10px;
  padding: 5px 10px;
}
</style>
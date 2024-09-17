<!-- src/components/ErrorDisplay.vue -->
<script setup lang="ts">
defineProps<{ error: string }>()
</script>

<template>
  <div v-if="error" class="error-display q-mt-md">
    {{ error }}
  </div>
</template>

<style scoped>
.error-display {
  color: red;
  font-weight: bold;
}
</style>
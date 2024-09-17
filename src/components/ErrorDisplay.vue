<!-- src/components/ErrorDisplay.vue -->
<script setup lang="ts">
defineProps<{ error: string | null }>()
</script>

<template>
  <div v-if="error" class="error-display q-mt-md text-negative">
    <q-banner rounded class="bg-red-1">{{ error }}</q-banner>
  </div>
</template>

<style scoped>
.error-display {
  color: red;
  font-weight: bold;
}
</style>
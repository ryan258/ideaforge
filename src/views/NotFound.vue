<!-- src/views/NotFound.vue -->
<template>
<div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you're looking for doesn't exist.</p>
    <router-link to="/">Go back to the home page</router-link>
</div>
</template>

<script setup lang="ts">
// No setup needed
</script>

<style scoped>
.not-found {
text-align: center;
padding: 20px;
}
</style>
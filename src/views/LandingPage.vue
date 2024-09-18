<template>
    <div class="landing-page q-pa-md">
      <h1 class="text-h2 text-weight-bold text-center q-mt-xl">Welcome to IdeaForge</h1>
      <p class="text-h5 text-center q-mt-md">Transform your creative ideas into polished social media content</p>
      <div class="row justify-center q-mt-xl">
        <q-btn to="/forge/crucible" color="primary" label="Start Forging" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // No setup needed for now
  </script>
  
  <style scoped>
  .landing-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  </style>
<template>
<div class="landing-page q-pa-md">
    <h1>Welcome to IdeaForge</h1>
    <p>Transform your creative ideas into polished social media content</p>
    <q-btn to="/dashboard" color="primary" label="Get Started" />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
name: 'LandingPage'
})
</script>
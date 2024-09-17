<template>
<div class="dashboard q-pa-md">
    <h2>Your IdeaForge Dashboard</h2>
    <q-list bordered separator>
    <q-item v-for="(idea, index) in recentIdeas" :key="index" clickable v-ripple>
        <q-item-section>{{ idea }}</q-item-section>
    </q-item>
    </q-list>
    <q-btn to="/forge" color="primary" label="Create New Idea" class="q-mt-md" />
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    name: 'Dashboard',
    setup() {
        const recentIdeas = ref(['Idea 1', 'Idea 2', 'Idea 3']) // Placeholder data
        return { recentIdeas }
    }
})
</script>
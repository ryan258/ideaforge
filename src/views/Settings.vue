<template>
<div class="settings q-pa-md">
    <h2>Settings</h2>
    <q-form @submit="onSubmit" class="q-gutter-md">
    <q-select v-model="preferredAIModel" :options="aiModelOptions" label="Preferred AI Model" />
    <q-input v-model="apiKey" label="API Key" type="password" />
    <q-btn label="Save Settings" type="submit" color="primary"/>
    </q-form>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
name: 'Settings',
setup() {
    const preferredAIModel = ref(null)
    const apiKey = ref('')
    const aiModelOptions = ['OpenAI', 'Claude', 'Ollama']

    const onSubmit = () => {
    // TODO: Implement settings save logic
    console.log('Settings saved')
    }

    return { preferredAIModel, apiKey, aiModelOptions, onSubmit }
}
})
</script>
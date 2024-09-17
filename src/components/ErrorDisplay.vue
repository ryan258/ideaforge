<template>
<q-banner v-if="error" rounded class="bg-negative text-white">
    <template v-slot:avatar>
    <q-icon name="error" color="white" />
    </template>
    {{ error }}
</q-banner>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
name: 'ErrorDisplay',
props: {
    error: {
    type: String,
    default: ''
    }
}
})
</script>
<template>
<div class="flex flex-center">
    <q-spinner
    color="primary"
    size="3em"
    :thickness="2"
    />
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
name: 'LoadingSpinner'
})
</script>
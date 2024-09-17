<template>
    <div class="main-view">
      <TheCrucible v-if="currentStep === 'crucible'" />
      <TheMold v-else-if="currentStep === 'mold'" />
      <TheForge v-else-if="currentStep === 'forge'" />
      <TheAnvil v-else-if="currentStep === 'anvil'" />
      <TheWorkshop v-else-if="currentStep === 'workshop'" />
      <TheFinishingTouch v-else-if="currentStep === 'finishingTouch'" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useIdeaForgeStore } from '@/stores/ideaForge'
  import TheCrucible from '@/components/TheCrucible.vue'
  import TheMold from '@/components/TheMold.vue'
  import TheForge from '@/components/TheForge.vue'
  import TheAnvil from '@/components/TheAnvil.vue'
  import TheWorkshop from '@/components/TheWorkshop.vue'
  import TheFinishingTouch from '@/components/TheFinishingTouch.vue'
  
  export default defineComponent({
    name: 'MainView',
    components: {
      TheCrucible,
      TheMold,
      TheForge,
      TheAnvil,
      TheWorkshop,
      TheFinishingTouch
    },
    setup() {
      const store = useIdeaForgeStore()
      const currentStep = computed(() => store.currentStep)
  
      return {
        currentStep
      }
    }
  })
  </script>
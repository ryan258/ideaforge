import { defineStore } from 'pinia'

export const useIdeaForgeStore = defineStore('ideaForge', {
  state: () => ({
    currentStep: 'crucible',
    originalIdea: '',
    selectedPersonas: [] as string[],
    chosenDirection: null as string | null,
    currentIteration: null as string | null,
    socialMediaIdeas: [] as string[],
  }),
  actions: {
    setCurrentStep(step: string) {
      this.currentStep = step
    },
    setOriginalIdea(idea: string) {
      this.originalIdea = idea
    },
    // TODO: Add more actions as needed
  },
})
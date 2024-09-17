// src/stores/ideaForge.ts
import { defineStore } from 'pinia'

export const useIdeaForgeStore = defineStore('ideaForge', {
  state: () => ({
    currentStep: 'crucible' as 'crucible' | 'mold' | 'forge' | 'anvil' | 'workshop' | 'finishingTouch',
    originalIdea: '',
    selectedPersonas: [] as string[],
    chosenDirection: '',
    currentIteration: '',
    socialMediaIdeas: [] as string[],
  }),

  actions: {
    setCurrentStep(step: 'crucible' | 'mold' | 'forge' | 'anvil' | 'workshop' | 'finishingTouch') {
      this.currentStep = step
    },

    setOriginalIdea(idea: string) {
      this.originalIdea = idea
    },

    addPersona(persona: string) {
      this.selectedPersonas.push(persona)
    },

    setChosenDirection(direction: string) {
      this.chosenDirection = direction
    },

    setCurrentIteration(iteration: string) {
      this.currentIteration = iteration
    },

    addSocialMediaIdea(idea: string) {
      this.socialMediaIdeas.push(idea)
    },

    reset() {
      this.currentStep = 'crucible'
      this.originalIdea = ''
      this.selectedPersonas = []
      this.chosenDirection = ''
      this.currentIteration = ''
      this.socialMediaIdeas = []
    }
  },

  getters: {
    currentIdea(): string {
      return this.currentIteration || this.originalIdea
    },
  },
})
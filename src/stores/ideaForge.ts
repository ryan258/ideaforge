// src/stores/ideaForge.ts

import { defineStore } from 'pinia'
import { AIModelFactory } from '../utils/aiModelFactory'
import { aiPrompts } from '../utils/aiPrompts'

// Define the structure for a Persona
interface Persona {
  name: string
  age: number
  occupation: string
  interests: string[]
  reasonForInterest: string
}

// Define the structure for a Direction
interface Direction {
  direction: string
  rationale: string
}

// Define the structure for the store state
interface IdeaForgeState {
  currentStep: 'crucible' | 'mold' | 'forge' | 'anvil' | 'workshop' | 'finishingTouch'
  originalIdea: string
  currentIdea: string
  selectedPersonas: Persona[]
  chosenDirection: string
  chosenDirectionRationale: string
  availableDirections: Direction[]
  socialMediaIdeas: string[]
  userPreferences: {
    preferredAIModel: 'ollama' | 'openai' | 'claude'
  }
  error: string | null
  isLoading: boolean
}

export const useIdeaForgeStore = defineStore('ideaForge', {
  state: (): IdeaForgeState => ({
    currentStep: 'crucible',
    originalIdea: '',
    currentIdea: '',
    selectedPersonas: [],
    chosenDirection: '',
    chosenDirectionRationale: '',
    availableDirections: [],
    socialMediaIdeas: [],
    userPreferences: {
      preferredAIModel: 'ollama'
    },
    error: null,
    isLoading: false
  }),

  getters: {
    hasChosenDirection: (state) => !!state.chosenDirection,
    canProceedToNextStep: (state): boolean => {
      switch (state.currentStep) {
        case 'crucible':
          return !!state.originalIdea
        case 'mold':
          return state.selectedPersonas.length > 0
        case 'forge':
          return !!state.chosenDirection
        case 'anvil':
          return !!state.currentIdea
        case 'workshop':
          return state.socialMediaIdeas.length > 0
        case 'finishingTouch':
          return true // Always allow proceeding from the final step
        default:
          return false
      }
    }
  },

  actions: {
    setCurrentStep(step: IdeaForgeState['currentStep']) {
      this.currentStep = step
    },

    setOriginalIdea(idea: string) {
      this.originalIdea = idea
      this.currentIdea = idea // Initialize currentIdea with originalIdea
    },

    updateCurrentIdea(idea: string) {
      this.currentIdea = idea
    },

    addPersona(persona: Persona) {
      const isDuplicate = this.selectedPersonas.some(
        p => p.name === persona.name && p.age === persona.age && p.occupation === persona.occupation
      )
      if (!isDuplicate) {
        this.selectedPersonas.push(persona)
      } else {
        console.warn('Duplicate persona detected:', persona.name)
        this.setError('A similar persona already exists.')
      }
    },

    removePersona(index: number) {
      this.selectedPersonas.splice(index, 1)
    },

    setChosenDirection(direction: string, rationale: string) {
      this.chosenDirection = direction
      this.chosenDirectionRationale = rationale
    },

    addAvailableDirection(direction: string, rationale: string) {
      this.availableDirections.push({ direction, rationale })
    },

    addSocialMediaIdea(idea: string) {
      this.socialMediaIdeas.push(idea)
    },

    removeSocialMediaIdea(index: number) {
      this.socialMediaIdeas.splice(index, 1)
    },

    setPreferredAIModel(model: IdeaForgeState['userPreferences']['preferredAIModel']) {
      this.userPreferences.preferredAIModel = model
    },

    setError(error: string | null) {
      this.error = error
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    resetStore() {
      this.$reset()
    },

    getPersonasAsString(): string {
      return this.selectedPersonas.map(persona => 
        `Name: ${persona.name}, Age: ${persona.age}, Occupation: ${persona.occupation}, 
        Interests: ${persona.interests.join(', ')}, 
        Reason for Interest: ${persona.reasonForInterest}`
      ).join('\n\n')
    },

    async generateTextWithAI(prompt: string): Promise<string> {
      this.setLoading(true)
      this.setError(null)
      try {
        const model = AIModelFactory.getModel(this.userPreferences.preferredAIModel)
        const generatedText = await model.generate(prompt)
        return generatedText
      } catch (error) {
        if (error instanceof Error) {
          this.setError(error.message)
        } else {
          this.setError('An unexpected error occurred')
        }
        throw error
      } finally {
        this.setLoading(false)
      }
    },

    async generateIdeaWithAI() {
      try {
        const prompt = aiPrompts.generateIdea
        const generatedIdea = await this.generateTextWithAI(prompt)
        this.setOriginalIdea(generatedIdea)
      } catch (error) {
        console.error('Failed to generate idea:', error)
      }
    },

    async generatePersonaWithAI() {
      try {
        this.setLoading(true)
        const prompt = aiPrompts.generatePersona(this.currentIdea)

        const generatedPersonaText = await this.generateTextWithAI(prompt)
        let generatedPersona
        try {
          generatedPersona = JSON.parse(this.preprocessJsonResponse(generatedPersonaText))
        } catch (jsonError) {
          console.error('Failed to parse JSON:', generatedPersonaText)
          throw new Error('AI response was not in valid JSON format. Please try again.')
        }
        
        if (!generatedPersona.name || !generatedPersona.age || !generatedPersona.occupation || !Array.isArray(generatedPersona.interests) || !generatedPersona.reasonForInterest) {
          throw new Error('AI response is missing required fields. Please try again.')
        }

        this.addPersona(generatedPersona)
      } catch (error) {
        if (error instanceof Error) {
          this.setError(error.message)
        } else {
          this.setError('An unexpected error occurred while generating the persona')
        }
      }
    },

    async generateDirectionWithAI() {
      try {
        const personasContext = this.getPersonasAsString()
        const prompt = aiPrompts.generateDirection(this.currentIdea, personasContext)
    
        const generatedDirectionText = await this.generateTextWithAI(prompt)
        
        // Extract JSON from the response
        const jsonMatch = generatedDirectionText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error('No valid JSON found in the response');
        }
    
        const jsonString = jsonMatch[0];
        let generatedDirection
        try {
          generatedDirection = JSON.parse(jsonString)
        } catch (jsonError) {
          console.error('Failed to parse JSON:', jsonString)
          throw new Error('AI response was not in valid JSON format. Please try again.')
        }
    
        if (!generatedDirection.direction || !generatedDirection.rationale) {
          throw new Error('AI response is missing required fields. Please try again.')
        }
    
        this.addAvailableDirection(generatedDirection.direction, generatedDirection.rationale)
      } catch (error) {
        if (error instanceof Error) {
          this.setError(error.message)
        } else {
          this.setError('Failed to generate direction. Please try again.')
        }
      }
    },

    async refinedIdeaWithAI(refinementNotes: string) {
      try {
        const prompt = aiPrompts.refineIdea(this.currentIdea, refinementNotes)
        const refinedIdea = await this.generateTextWithAI(prompt)
        this.updateCurrentIdea(refinedIdea.trim())
      } catch (error) {
        console.error('Failed to refine idea:', error)
        this.setError('Failed to refine the idea. Please try again.')
      }
    },

    async generateSocialMediaContentWithAI(platform: string) {
      try {
        const prompt = aiPrompts.generateSocialMediaContent(this.currentIdea, platform)
        const content = await this.generateTextWithAI(prompt)
        this.addSocialMediaIdea(content.trim())
      } catch (error) {
        console.error('Failed to generate social media content:', error)
        this.setError('Failed to generate social media content. Please try again.')
      }
    },

    async generateAIFeedbackWithAI() {
      try {
        const prompt = aiPrompts.generateAIFeedback(this.currentIdea)
        const feedback = await this.generateTextWithAI(prompt)
        return feedback.trim()
      } catch (error) {
        console.error('Failed to generate AI feedback:', error)
        this.setError('Failed to generate AI feedback. Please try again.')
      }
    },

    async generatePersonaFeedbackWithAI(persona: Persona) {
      try {
        const personaString = `Name: ${persona.name}, Age: ${persona.age}, Occupation: ${persona.occupation}, Interests: ${persona.interests.join(', ')}`
        const prompt = aiPrompts.generatePersonaFeedback(personaString, this.currentIdea)
        const feedback = await this.generateTextWithAI(prompt)
        return feedback.trim()
      } catch (error) {
        console.error('Failed to generate persona feedback:', error)
        this.setError('Failed to generate persona feedback. Please try again.')
      }
    },

    preprocessJsonResponse(text: string): string {
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}')
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        return text.slice(jsonStart, jsonEnd + 1)
      }
      return text
    }
  }
})
// src/stores/ideaForge.ts
import { defineStore } from 'pinia'
import { generateText } from '../services/ollamaService'

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
  selectedPersonas: Persona[]
  chosenDirection: string
  chosenDirectionRationale: string
  availableDirections: Direction[]
  currentIteration: string
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
    selectedPersonas: [],
    chosenDirection: '',
    chosenDirectionRationale: '',
    availableDirections: [],
    currentIteration: '',
    socialMediaIdeas: [],
    userPreferences: {
      preferredAIModel: 'ollama'
    },
    error: null,
    isLoading: false
  }),

  getters: {
    hasChosenDirection: (state) => !!state.chosenDirection,
    // Get the current idea (either the original or the latest iteration)
    currentIdea: (state): string => state.currentIteration || state.originalIdea,

    // Check if we can move to the next step
    canProceedToNextStep: (state): boolean => {
      switch (state.currentStep) {
        case 'crucible':
          return !!state.originalIdea
        case 'mold':
          return state.selectedPersonas.length > 0
        case 'forge':
          return !!state.chosenDirection
        case 'anvil':
          return !!state.currentIteration
        case 'workshop':
          return state.socialMediaIdeas.length > 0
        default:
          return true
      }
    }
  },

  actions: {
    // Set the current step in the process
    setCurrentStep(step: IdeaForgeState['currentStep']) {
      this.currentStep = step
    },

    // Set the original idea
    setOriginalIdea(idea: string) {
      this.originalIdea = idea
    },

    addPersona(persona: Persona) {
      const isDuplicate = this.selectedPersonas.some(
        p => p.name === persona.name && p.age === persona.age && p.occupation === persona.occupation
      )
      if (!isDuplicate) {
        this.selectedPersonas.push(persona)
      } else {
        console.warn('Duplicate persona detected:', persona.name)
        // Optionally, you can set an error state here to inform the user
        // this.setError('A similar persona already exists.')
      }
    },

    // Remove a persona by index
    removePersona(index: number) {
      this.selectedPersonas.splice(index, 1)
    },

    // Set the chosen direction for the idea
    setChosenDirection(direction: string, rationale: string) {
      this.chosenDirection = direction
      this.chosenDirectionRationale = rationale
      console.log('Direction set:', this.chosenDirection) // Debug log
    },

    // Add a new available direction
    addAvailableDirection(direction: string, rationale: string) {
      this.availableDirections.push({ direction, rationale })
    },

    // Update the current iteration of the idea
    updateCurrentIteration(iteration: string) {
      this.currentIteration = iteration
    },

    // Add a social media content idea
    addSocialMediaIdea(idea: string) {
      this.socialMediaIdeas.push(idea)
    },

    // Set user preference for AI model
    setPreferredAIModel(model: IdeaForgeState['userPreferences']['preferredAIModel']) {
      this.userPreferences.preferredAIModel = model
    },

    // Set error state
    setError(error: string | null) {
      this.error = error
    },

    // Set loading state
    setLoading(isLoading: boolean) {
      this.isLoading = isLoading
    },

    // Reset the entire store (useful when starting a new idea process)
    resetStore() {
      this.$reset()
    },

    // Get all personas as a formatted string
    getPersonasAsString(): string {
      return this.selectedPersonas.map(persona => 
        `Name: ${persona.name}, Age: ${persona.age}, Occupation: ${persona.occupation}, 
        Interests: ${persona.interests.join(', ')}, 
        Reason for Interest: ${persona.reasonForInterest}`
      ).join('\n\n')
    },

    // Async action to generate an idea using AI
    async generateIdeaWithAI() {
      this.setLoading(true)
      this.setError(null)
      try {
        const prompt = "Generate a creative idea for a 5th-grade student's project:"
        const generatedIdea = await generateText(prompt)
        this.setOriginalIdea(generatedIdea)
      } catch (error) {
        this.setError('Failed to generate idea. Please try again.')
      } finally {
        this.setLoading(false)
      }
    },

    // Async action to generate a persona using AI
    async generatePersonaWithAI() {
      this.setLoading(true)
      this.setError(null)
      try {
        const prompt = `Generate a detailed persona who would be excited about this idea: "${this.originalIdea}". 
        Respond ONLY with a JSON object containing these fields:
        {
          "name": "Character Name",
          "age": 25,
          "occupation": "Job Title",
          "interests": ["Interest 1", "Interest 2", "Interest 3"],
          "reasonForInterest": "Brief explanation of why they find this idea interesting"
        }
        Do not include any text outside the JSON object.`

        const generatedPersonaText = await generateText(prompt)
        let generatedPersona
        try {
          generatedPersona = JSON.parse(generatedPersonaText)
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
      } finally {
        this.setLoading(false)
      }
    },

    

    // Async action to generate a direction using AI
    async generateDirectionWithAI() {
      this.setLoading(true)
      this.setError(null)
      try {
        const personasContext = this.getPersonasAsString()
        const prompt = `Given the original idea: "${this.currentIdea}" 
        and the following personas:\n\n${personasContext}\n\n
        Generate a creative direction for developing this idea that would appeal to these personas. 
        Respond with a JSON object in this format:
        {
          "direction": "Brief description of the direction",
          "rationale": "Explanation of why this direction would appeal to the personas"
        }`

        const generatedDirectionText = await generateText(prompt)
        
        // Attempt to parse the response as JSON
        let generatedDirection
        try {
          generatedDirection = JSON.parse(this.preprocessJsonResponse(generatedDirectionText))
        } catch (jsonError) {
          console.error('Failed to parse JSON:', generatedDirectionText)
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
      } finally {
        this.setLoading(false)
      }
    },

    // Helper method to preprocess AI response
    preprocessJsonResponse(text: string): string {
      // Remove any text before the first '{' and after the last '}'
      const jsonStart = text.indexOf('{')
      const jsonEnd = text.lastIndexOf('}')
      if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
        return text.slice(jsonStart, jsonEnd + 1)
      }
      // If we can't find valid JSON delimiters, return the original text
      // This will cause a JSON parse error, which we catch and handle
      return text
    }
  }
})
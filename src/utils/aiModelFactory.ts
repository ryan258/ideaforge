// src/utils/aiModelFactory.ts
export class AIModelFactory {
  static getModel(modelName: string) {
    return {
      generate: async (prompt: string) => {
        console.log(`Generating idea with ${modelName} model: ${prompt}`)
        return "This is a placeholder generated idea. Replace with actual AI integration."
      }
    }
  }
}
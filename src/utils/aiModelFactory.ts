interface AIModel {
    generate: (prompt: string) => Promise<string>
  }
  
  class OllamaModel implements AIModel {
    async generate(prompt: string): Promise<string> {
      // TODO: Implement Ollama API call
      console.log('Generating with Ollama:', prompt)
      return 'Ollama generated response'
    }
  }
  
  class OpenAIModel implements AIModel {
    async generate(prompt: string): Promise<string> {
      // TODO: Implement OpenAI API call
      console.log('Generating with OpenAI:', prompt)
      return 'OpenAI generated response'
    }
  }
  
  class ClaudeModel implements AIModel {
    async generate(prompt: string): Promise<string> {
      // TODO: Implement Claude API call
      console.log('Generating with Claude:', prompt)
      return 'Claude generated response'
    }
  }
  
  export class AIModelFactory {
    static getModel(modelName: string): AIModel {
      switch(modelName) {
        case 'ollama':
          return new OllamaModel()
        case 'openai':
          return new OpenAIModel()
        case 'claude':
          return new ClaudeModel()
        default:
          throw new Error('Invalid model name')
      }
    }
  }
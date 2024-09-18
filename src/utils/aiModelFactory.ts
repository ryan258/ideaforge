// src/utils/aiModelFactory.ts

import axios from 'axios';

// Define the AIModel interface
interface AIModel {
  generate(prompt: string): Promise<string>;
}

// Ollama Model Implementation
class OllamaModel implements AIModel {
  private baseUrl: string;
  private model: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_OLLAMA_BASE_URL;
    this.model = import.meta.env.VITE_OLLAMA_MODEL;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/generate`, {
        model: this.model,
        prompt: prompt,
        stream: false
      });
      return response.data.response;
    } catch (error) {
      console.error('Error generating text with Ollama:', error);
      throw new Error('Failed to generate text with Ollama. Please try again later.');
    }
  }
}

// OpenAI Model Implementation
class OpenAIModel implements AIModel {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'text-davinci-003', // You can change this to a different model if needed
        prompt: prompt,
        max_tokens: 150
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error generating text with OpenAI:', error);
      throw new Error('Failed to generate text with OpenAI. Please try again later.');
    }
  }
}

// Claude Model Implementation
class ClaudeModel implements AIModel {
  private apiKey: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await axios.post('https://api.anthropic.com/v1/completions', {
        model: 'claude-2', // You can change this to a different Claude model if needed
        prompt: prompt,
        max_tokens_to_sample: 150
      }, {
        headers: {
          'X-API-Key': this.apiKey,
          'Content-Type': 'application/json'
        }
      });
      return response.data.completion;
    } catch (error) {
      console.error('Error generating text with Claude:', error);
      throw new Error('Failed to generate text with Claude. Please try again later.');
    }
  }
}

// AIModelFactory class
export class AIModelFactory {
  static getModel(modelName: string): AIModel {
    switch (modelName.toLowerCase()) {
      case 'ollama':
        return new OllamaModel();
      case 'openai':
        return new OpenAIModel();
      case 'claude':
        return new ClaudeModel();
      default:
        throw new Error('Invalid model name. Please choose "ollama", "openai", or "claude".');
    }
  }
}

// Example usage (you can remove this in the actual implementation):
// const model = AIModelFactory.getModel('ollama');
// model.generate('Your prompt here').then(console.log).catch(console.error);
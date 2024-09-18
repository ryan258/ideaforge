// src/models/OllamaModel.ts

import { AIModel } from './AIModel';
import axios from 'axios';

export class OllamaModel extends AIModel {
  private baseUrl: string;
  private model: string;

  constructor() {
    super();
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
      throw new Error('Failed to generate text. Please try again later.');
    }
  }
}

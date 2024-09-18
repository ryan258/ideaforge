// src/models/OpenAIModel.ts

import { AIModel } from './AIModel';
import axios from 'axios';

export class OpenAIModel extends AIModel {
  private apiKey: string;

  constructor() {
    super();
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await axios.post('https://api.openai.com/v1/completions', {
        model: 'gpt-4o-mini-2024-07-18',
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
      throw new Error('Failed to generate text. Please try again later.');
    }
  }
}
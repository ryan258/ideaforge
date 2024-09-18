// src/models/ClaudeModel.ts

import { AIModel } from './AIModel';
import axios from 'axios';

export class ClaudeModel extends AIModel {
  private apiKey: string;

  constructor() {
    super();
    this.apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
  }

  async generate(prompt: string): Promise<string> {
    try {
      const response = await axios.post('https://api.anthropic.com/v1/completions', {
        model: 'claude-3-5-sonnet-20240620',
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
      throw new Error('Failed to generate text. Please try again later.');
    }
  }
}

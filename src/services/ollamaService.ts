// src/services/ollamaService.ts

import axios from 'axios';

const OLLAMA_BASE_URL = import.meta.env.VITE_OLLAMA_BASE_URL;
const OLLAMA_MODEL = import.meta.env.VITE_OLLAMA_MODEL;

export async function generateText(prompt: string): Promise<string> {
  try {
    const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false
    });

    return response.data.response;
  } catch (error) {
    console.error('Error generating text with Ollama:', error);
    throw new Error('Failed to generate text. Please try again later.');
  }
}
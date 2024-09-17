import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.ideaforge.com', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
})

export default {
  generateIdea(prompt: string) {
    return apiClient.post('/generate-idea', { prompt })
  },
  refineIdea(idea: string, feedback: string) {
    return apiClient.post('/refine-idea', { idea, feedback })
  },
  generateSocialMediaContent(idea: string) {
    return apiClient.post('/generate-social-media', { idea })
  },
  // Add more API methods as needed
}
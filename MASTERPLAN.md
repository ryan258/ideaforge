# IdeaForge: Developer's Masterplan

## Project Overview

IdeaForge is a Vue.js single-page application that uses AI models to help users refine creative ideas into polished social media content.

- **Frontend**: Vue.js 3 with TypeScript
- **UI Framework**: Quasar
- **State Management**: Pinia
- **API Integration**: Axios
- **AI Models**: Ollama LLaMA 3.1, OpenAI, Claude

## Project Structure

```
ideaforge/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── TheCrucible.vue
│   │   ├── TheMold.vue
│   │   ├── TheForge.vue
│   │   ├── TheAnvil.vue
│   │   ├── TheWorkshop.vue
│   │   └── TheFinishingTouch.vue
│   ├── composables/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── stores/
│   │   └── ideaForge.ts
│   ├── types/
│   └── utils/
│       └── aiModelFactory.ts
├── tests/
│   ├── unit/
│   └── e2e/
├── .env
├── package.json
└── tsconfig.json
```

## Core Features

1. **The Crucible (Idea Input)** - Implemented

   - Component: `TheCrucible.vue`
   - Functionality: Form for idea input, option to generate new ideas

2. **The Mold (Persona Generation)**

   - Component: `TheMold.vue`
   - Functionality: Generate and select marketing personas

3. **The Forge (Direction Exploration)**

   - Component: `TheForge.vue`
   - Functionality: Generate and explore idea directions

4. **The Anvil (Idea Refinement)**

   - Component: `TheAnvil.vue`
   - Functionality: AI-powered evaluation and refinement

5. **The Workshop (Social Media Content Generation)**

   - Component: `TheWorkshop.vue`
   - Functionality: Generate and refine social media content

6. **The Finishing Touch (Iterative Deliverable Creation)**
   - Component: `TheFinishingTouch.vue`
   - Functionality: Final refinement and iteration

## State Management

Use Pinia for state management. Create a store in `src/stores/ideaForge.ts`:

```typescript
import { defineStore } from 'pinia'

export const useIdeaForgeStore = defineStore('ideaForge', {
  state: () => ({
    currentStep: 'crucible',
    originalIdea: '',
    selectedPersonas: [],
    chosenDirection: null,
    currentIteration: null,
    socialMediaIdeas: []
  }),
  actions: {
    // Define actions here
  },
  getters: {
    // Define getters here
  }
})
```

## AI Model Integration

Create an AI model factory in `src/utils/aiModelFactory.ts`:

```typescript
class AIModelFactory {
  getModel(modelName: string) {
    switch (modelName) {
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
```

## Development Practices

1. Use Composition API and `<script setup>` in Vue components
2. Implement class-based syntax for complex components
3. Use TypeScript for type safety
4. Apply SOLID principles
5. Use dependency injection with `provide`/`inject`
6. Create base classes for shared functionality
7. Use Single-File Components (SFCs)
8. Implement lazy loading for routes
9. Use computed properties for complex calculations
10. Implement error handling and logging
11. Use environment variables for configuration
12. Implement code splitting and tree-shaking
13. Use ESLint with Vue plugin
14. Implement accessibility practices
15. Use Teleport for modals and popups

## Testing Strategy

1. Unit Tests: Use Vitest

   ```
   npm install --save-dev vitest @vue/test-utils
   ```

2. E2E Tests: Use Cypress
   ```
   npm install --save-dev cypress
   ```

## Performance Considerations

1. Use `keep-alive` for caching components
2. Implement debouncing for user inputs
3. Optimize API calls
4. Monitor and optimize component re-renders

## Security Measures

1. Implement input sanitization
2. Use environment variables for API keys
3. Implement XSS prevention measures

## Development Phases

1. Project setup and basic structure ✅ (Completed)
2. Implement core structure and routing ✅ (Completed)
3. Develop The Crucible ✅ (Completed)
4. Implement Pinia store integration ✅ (Completed)
5. Develop The Mold ✅ (Completed)
6. Implement The Forge
7. Develop The Anvil and iteration system
8. Integrate AI models (Ollama, OpenAI, Claude)
9. Implement The Workshop
10. Develop The Finishing Touch
11. Implement data persistence
12. Comprehensive testing suite implementation (Ongoing)
13. Performance optimization (Ongoing)
14. UI/UX refinements
15. Accessibility improvements
16. Documentation and deployment preparation

## Current Progress

- Set up basic Vue.js project structure with Vite and TypeScript
- Implemented TheCrucible component with basic functionality:
  - User can input their own idea
  - User can generate an AI-suggested idea (currently simulated)
  - Ideas are displayed after submission or generation
- Basic error handling and user feedback implemented
- Implemented Pinia store for state management
- Integrated routing system with Vue Router
- Developed TheMold component with functionality:
  - Generate AI personas (currently simulated)
  - Display and remove personas
  - Navigate to next step (The Forge)
- Updated store to handle persona generation and management

## Immediate Next Steps

1. Implement The Forge component
2. Set up Axios for API calls to Ollama (or chosen AI service)
3. Begin actual AI model integration for idea and persona generation
4. Develop The Mold component with full functionality
5. Enhance error handling and user feedback mechanisms
6. Implement unit tests for existing components

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env`
4. Run the development server: `npm run dev`

## Useful Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run test:unit`: Run unit tests
- `npm run test:e2e`: Run end-to-end tests
- `npm run lint`: Lint and fix files

Remember to document your code thoroughly and follow Vue.js best practices throughout the development process. Regularly revisit this masterplan to ensure alignment with project goals and to update progress.

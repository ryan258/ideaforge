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

1. **The Crucible (Idea Input)** - ✅ Implemented

   - Component: `TheCrucible.vue`
   - Functionality: Form for idea input, option to generate new ideas

2. **The Mold (Persona Generation)** - ✅ Implemented

   - Component: `TheMold.vue`
   - Functionality: Generate and select marketing personas

3. **The Forge (Direction Exploration)** - ✅ Implemented

   - Component: `TheForge.vue`
   - Functionality: Generate and explore idea directions

4. **The Anvil (Idea Refinement)** - ✅ Implemented

   - Component: `TheAnvil.vue`
   - Functionality: AI-powered evaluation and refinement

5. **The Workshop (Social Media Content Generation)** - 🚧 Basic Structure Implemented

   - Component: `TheWorkshop.vue`
   - Functionality: Generate and refine social media content

6. **The Finishing Touch (Iterative Deliverable Creation)** - 🚧 Basic Structure Implemented

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
    currentIdea: '',
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

## AI Model Integration - ✅ Implemented

AI model factory implemented in `src/utils/aiModelFactory.ts`:

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
6. Implement The Forge ✅ (Completed)
7. Implement full functionality for The Anvil ✅ (Completed)
8. Implement markdown rendering for improved readability ✅ (Completed)
9. Create basic structure for The Workshop ✅ (Completed)
10. Create basic structure for The Finishing Touch ✅ (Completed)
11. Integrate AI models (Ollama, OpenAI, Claude) ✅ (Completed)
12. Implement full functionality for The Workshop
13. Implement full functionality for The Finishing Touch
14. Implement data persistence
15. Comprehensive testing suite implementation (Ongoing)
16. Performance optimization (Ongoing)
17. UI/UX refinements (Ongoing)
18. Accessibility improvements
19. Documentation and deployment preparation

## Current Progress

- Set up basic Vue.js project structure with Vite and TypeScript
- Implemented TheCrucible component with basic functionality:
  - User can input their own idea
  - User can generate an AI-suggested idea
  - Ideas are displayed after submission or generation
- Basic error handling and user feedback implemented
- Implemented Pinia store for state management
- Integrated routing system with Vue Router
- Developed TheMold component with functionality:
  - Generate AI personas
  - Display and remove personas
  - Navigate to next step (The Forge)
- Updated store to handle persona generation and management
- Developed TheForge component with functionality:
  - Generate and display idea directions
  - Select a direction for further development
- Created basic structures for TheAnvil, TheWorkshop, and TheFinishingTouch components
- Implemented consistent error handling across all components
- Updated all components to use ErrorDisplay component correctly
- Integrated AI model factory for Ollama, OpenAI, and Claude
- Implemented AI-powered refinement and persona feedback in TheAnvil
- Implemented markdown rendering for improved readability of AI-generated content
- Enhanced error handling and loading state management across components
- Implemented JSON parsing and error handling for AI responses
- Developed full functionality for TheAnvil component, including AI-powered refinement and persona feedback

## Immediate Next Steps

1. Implement full functionality for TheWorkshop component
   - Design and implement social media content generation process
   - Create user interface for displaying and selecting content ideas
   - Integrate AI for platform-specific content suggestions

2. Enhance AI model integration
   - Refine prompts for more accurate and relevant responses
   - Implement fallback mechanisms for AI service unavailability

3. Develop full functionality for TheFinishingTouch component
   - Design user interface for final idea review and adjustments
   - Implement export functionality for completed ideas
   - Create summary view of the entire idea development process

4. Implement data persistence
   - Design data structure for saving user progress
   - Implement local storage solution for saving and loading projects
   - Create user interface for managing saved projects

5. Expand unit testing coverage
   - Write comprehensive unit tests for all components
   - Implement integration tests for AI service interactions
   - Set up continuous integration for automated testing
   - Add specific tests for markdown rendering and error handling


6. Enhance accessibility features
   - Add specific tests for markdown rendering and error handling
   - Audit current components for accessibility issues
   - Implement keyboard navigation improvements
   - Add ARIA attributes where necessary
   - Ensure proper color contrast and text alternatives

7. Enhance error handling and logging
   - Implement centralized error handling mechanism
   - Add more detailed logging for debugging purposes
   - Create user-friendly error messages suitable for the target audience

8. Start UI/UX refinements
   - Gather user feedback on current interface
   - Design and implement UI improvements based on feedback
   - Enhance animations and transitions for a more engaging experience

9.  Update documentation
    - Keep README, ROADMAP, HANDBOOK, and MASTERPLAN up to date with each significant change
    - Begin drafting user documentation and tutorials
    - Create a quick-start guide for new developers joining the project


Remember to document your code thoroughly and follow Vue.js best practices throughout the development process. Regularly revisit this masterplan to ensure alignment with project goals and to update progress.


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

// src/models/AIModel.ts

export abstract class AIModel {
    abstract generate(prompt: string): Promise<string>;
}
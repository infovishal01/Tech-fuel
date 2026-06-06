import OpenAI from 'openai';

let openaiInstance: OpenAI | null = null;

/**
 * Get or create OpenAI instance
 * Lazily initializes to avoid errors at build time
 */
export function getOpenAI(): OpenAI {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiInstance;
}

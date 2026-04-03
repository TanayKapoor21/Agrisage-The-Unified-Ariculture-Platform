
export class QuotaExceededError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuotaExceededError';
  }
}

/**
 * Utility for retrying an async function with exponential backoff.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: any;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      
      // Check if it's a 429 error
      const errorStr = JSON.stringify(error);
      const isRateLimit = error?.message?.includes('429') || 
                          error?.status === 429 ||
                          errorStr.includes('429') ||
                          errorStr.includes('RESOURCE_EXHAUSTED');
      
      if (!isRateLimit) {
        throw error;
      }

      if (i === maxRetries) {
        throw new QuotaExceededError('API Quota exceeded. Please try again later or select a different API key.');
      }
      
      const delay = initialDelay * Math.pow(2, i);
      console.warn(`Rate limit hit (429). Retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
}

import { useLocation } from 'wouter';

// Error handling utility functions

/**
 * Navigate to a custom error page
 */
export function navigateToError(status: number) {
  window.location.href = `/error/${status}`;
}

/**
 * Handle API errors and redirect to appropriate error pages
 */
export function handleApiError(error: any, defaultStatus = 500) {
  const status = error?.status || error?.response?.status || defaultStatus;
  
  // Log the error for debugging
  console.error('API Error:', error);
  
  // Track error in analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: `API Error ${status}: ${error?.message || 'Unknown error'}`,
      fatal: false
    });
  }
  
  // Navigate to error page for server errors
  if (status >= 500) {
    navigateToError(status);
  }
  
  return status;
}

/**
 * Custom hook for error boundary integration
 */
export function useErrorHandler() {
  const [, setLocation] = useLocation();

  const handleError = (error: Error, context?: string) => {
    console.error(`Error in ${context || 'component'}:`, error);
    
    // Track error in analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: `${context || 'Component'} Error: ${error.message}`,
        fatal: false
      });
    }
    
    // For development, throw the error to trigger error boundary
    if (process.env.NODE_ENV === 'development') {
      throw error;
    }
    
    // For production, navigate to error page
    setLocation('/error/500');
  };

  return { handleError };
}

/**
 * Async error wrapper for promise-based operations
 */
export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context?: string
): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error(`Error in ${context || 'async operation'}:`, error);
    
    // Track error in analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: `${context || 'Async'} Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        fatal: false
      });
    }
    
    // Handle different types of errors
    if (error instanceof Error) {
      const status = (error as any).status || 500;
      if (status >= 500) {
        navigateToError(status);
      }
    }
    
    return null;
  }
}

/**
 * Error types for better error handling
 */
export class AppError extends Error {
  status: number;
  context?: string;
  
  constructor(message: string, status: number = 500, context?: string) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.context = context;
  }
}

/**
 * Network error class
 */
export class NetworkError extends AppError {
  constructor(message: string = 'Network error occurred', status: number = 500) {
    super(message, status, 'Network');
    this.name = 'NetworkError';
  }
}

/**
 * Validation error class
 */
export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', status: number = 400) {
    super(message, status, 'Validation');
    this.name = 'ValidationError';
  }
}
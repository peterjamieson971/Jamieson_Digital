import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Home, RefreshCw, Bug } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId?: string;
  eventId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Generate unique error ID for tracking
    const errorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    // Categorize error type
    const errorType = this.categorizeError(error);
    
    this.setState({
      error,
      errorInfo,
      errorId
    });
    
    // Enhanced error logging
    console.group(`🚨 Error Boundary [${errorId}]`);
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Error Type:', errorType);
    console.error('Timestamp:', timestamp);
    console.error('Component Stack:', errorInfo.componentStack);
    console.groupEnd();
    
    // Report to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: `${errorType}: ${error.message}`,
        fatal: false,
        custom_map: {
          error_id: errorId,
          error_type: errorType,
        }
      });
    }
    
    // Store error details in localStorage for debugging (development only)
    if (process.env.NODE_ENV === 'development') {
      const errorDetails = {
        errorId,
        timestamp,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        errorType,
        userAgent: navigator.userAgent,
        url: window.location.href,
      };
      
      try {
        const existingErrors = JSON.parse(localStorage.getItem('errorBoundaryLogs') || '[]');
        existingErrors.push(errorDetails);
        // Keep only last 10 errors
        localStorage.setItem('errorBoundaryLogs', JSON.stringify(existingErrors.slice(-10)));
      } catch (e) {
        console.warn('Failed to store error details in localStorage:', e);
      }
    }
  }

  private categorizeError(error: Error): string {
    // Categorize common error types
    if (error.name === 'ChunkLoadError' || error.message.includes('Loading chunk')) {
      return 'CHUNK_LOAD_ERROR';
    }
    if (error.message.includes('Network Error') || error.message.includes('fetch')) {
      return 'NETWORK_ERROR';
    }
    if (error.message.includes('Cannot read properties') || error.message.includes('Cannot read property')) {
      return 'NULL_REFERENCE_ERROR';
    }
    if (error.name === 'TypeError') {
      return 'TYPE_ERROR';
    }
    if (error.name === 'ReferenceError') {
      return 'REFERENCE_ERROR';
    }
    if (error.message.includes('hydrat')) {
      return 'HYDRATION_ERROR';
    }
    return 'UNKNOWN_ERROR';
  }

  private getErrorMessage(errorType: string): { title: string; description: string } {
    switch (errorType) {
      case 'CHUNK_LOAD_ERROR':
        return {
          title: 'Loading Error',
          description: 'There was a problem loading part of the application. This usually happens after an update. Please refresh the page.'
        };
      case 'NETWORK_ERROR':
        return {
          title: 'Connection Error',
          description: 'Unable to connect to the server. Please check your internet connection and try again.'
        };
      case 'NULL_REFERENCE_ERROR':
        return {
          title: 'Data Error',
          description: 'There was a problem with the data. Please refresh the page to try again.'
        };
      case 'HYDRATION_ERROR':
        return {
          title: 'Rendering Error',
          description: 'There was a problem rendering the page. Please refresh to try again.'
        };
      default:
        return {
          title: 'Something Went Wrong',
          description: 'An unexpected error occurred. Please try refreshing the page or return home.'
        };
    }
  }

  private handleRefresh = (errorType: string) => {
    // For chunk loading errors, perform a hard refresh to clear cache
    if (errorType === 'CHUNK_LOAD_ERROR') {
      window.location.reload();
      return;
    }
    
    // For other errors, try a regular refresh first
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Get categorized error message
      const errorType = this.state.error ? this.categorizeError(this.state.error) : 'UNKNOWN_ERROR';
      const errorMessage = this.getErrorMessage(errorType);

      return (
        <>
          <Helmet>
            <title>{errorMessage.title} | Peter Jamieson</title>
            <meta name="description" content={errorMessage.description} />
          </Helmet>
          
          <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900">
            <Card className="w-full max-w-lg mx-4 shadow-xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  {/* Error Icon */}
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <Bug className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Error Message */}
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {errorMessage.title}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                      {errorMessage.description}
                    </p>
                    
                    {/* Error ID for support */}
                    {this.state.errorId && (
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-2">
                        Error ID: {this.state.errorId}
                      </p>
                    )}
                    
                    {/* Error Details (only in development) */}
                    {process.env.NODE_ENV === 'development' && this.state.error && (
                      <details className="mt-4 text-left">
                        <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300">
                          View Error Details
                        </summary>
                        <div className="mt-2 p-3 bg-slate-100 dark:bg-slate-800 rounded-md text-xs font-mono text-slate-700 dark:text-slate-300 overflow-auto max-h-32">
                          <p className="font-semibold text-red-600 dark:text-red-400 mb-2">
                            {this.state.error.name}: {this.state.error.message}
                          </p>
                          {this.state.error.stack && (
                            <pre className="whitespace-pre-wrap text-xs">
                              {this.state.error.stack}
                            </pre>
                          )}
                        </div>
                      </details>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      onClick={() => this.handleRefresh(errorType)}
                      className="flex-1"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {errorType === 'CHUNK_LOAD_ERROR' ? 'Hard Refresh' : 'Refresh Page'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = '/'}
                      className="flex-1"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Go Home
                    </Button>
                  </div>
                  
                  {/* Support Information */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      If this problem persists, please{' '}
                      <a 
                        href="/#contact" 
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = '/#contact';
                        }}
                      >
                        contact support
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function ErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
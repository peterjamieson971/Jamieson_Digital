import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw, Mail } from "lucide-react";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

interface ServerErrorProps {
  status?: number;
  message?: string;
  canRetry?: boolean;
}

export default function ServerError({ 
  status = 500, 
  message = "An internal server error occurred.",
  canRetry = true
}: ServerErrorProps) {
  
  const getErrorColor = (status: number) => {
    if (status >= 500) return "red"; // Server errors
    if (status >= 400) return "orange"; // Client errors
    return "slate"; // Default
  };
  
  const getErrorDescription = (status: number) => {
    switch (status) {
      case 400:
        return "The request was invalid or malformed.";
      case 401:
        return "Authentication is required to access this resource.";
      case 403:
        return "You don't have permission to access this resource.";
      case 404:
        return "The requested resource could not be found.";
      case 429:
        return "Too many requests. Please try again later.";
      case 500:
        return "An internal server error occurred. We're working to fix it.";
      case 502:
        return "The server received an invalid response from upstream.";
      case 503:
        return "The service is temporarily unavailable for maintenance.";
      case 504:
        return "The server request timed out.";
      default:
        return message || "An unexpected error occurred.";
    }
  };

  const errorColor = getErrorColor(status);
  const description = getErrorDescription(status);

  return (
    <>
      <Helmet>
        <title>{status} - Server Error | Peter Jamieson</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <div className={`min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-${errorColor}-50 to-${errorColor}-100 dark:from-${errorColor}-950 dark:to-${errorColor}-900`}>
        <Card className="w-full max-w-lg mx-4 shadow-xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              {/* Error Icon and Code */}
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full bg-${errorColor}-100 dark:bg-${errorColor}-900/30 flex items-center justify-center`}>
                    <AlertTriangle className={`h-8 w-8 text-${errorColor}-500 dark:text-${errorColor}-400`} />
                  </div>
                  <div className={`absolute -top-1 -right-1 w-6 h-6 bg-${errorColor}-500 rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
                <div>
                  <div className="text-6xl font-bold text-slate-800 dark:text-slate-200 leading-none">
                    {status}
                  </div>
                </div>
              </div>
              
              {/* Error Message */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {status >= 500 ? 'Server Error' : 'Request Error'}
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  {description}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {canRetry && (
                  <Button 
                    onClick={() => window.location.reload()}
                    className="flex-1"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                )}
                
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
              </div>
              
              {/* Support Information */}
              {status >= 500 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    If this problem persists, please contact support:
                  </p>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/#contact">
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Support
                    </Link>
                  </Button>
                </div>
              )}
              
              {/* Maintenance Notice for 503 */}
              {status === 503 && (
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    We're performing scheduled maintenance and will be back shortly.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
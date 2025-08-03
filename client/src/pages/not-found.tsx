import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft, Search } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const [location] = useLocation();
  
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Peter Jamieson</title>
        <meta name="description" content="The page you're looking for could not be found. Return to the homepage to explore Peter Jamieson's portfolio." />
      </Helmet>
      
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <Card className="w-full max-w-lg mx-4 shadow-xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              {/* Error Icon and Code */}
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
                <div>
                  <div className="text-6xl font-bold text-slate-800 dark:text-slate-200 leading-none">404</div>
                </div>
              </div>
              
              {/* Error Message */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Page Not Found
                </h1>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                {location && location !== '/' && (
                  <p className="text-sm text-slate-500 dark:text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-md inline-block">
                    {location}
                  </p>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild className="flex-1">
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.history.back()}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
              </div>
              
              {/* Helpful Links */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  Or explore these sections:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/#about">
                      About
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/#expertise">
                      Expertise
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/#experience">
                      Experience
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/#contact">
                      Contact
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

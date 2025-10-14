import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "./lib/analytics";
import { useAnalytics } from "./hooks/use-analytics";
import { ErrorBoundary } from "@/components/error-boundary";
import { SearchProvider, useSearch } from "@/contexts/search-context";
import { SearchCommandPalette } from "@/components/search-command-palette";
import { Analytics } from "@vercel/analytics/react";
import Home from "@/pages/home";
import Articles from "@/pages/articles";
import Article from "@/pages/article";
import Podcasts from "@/pages/podcasts";
import Podcast from "@/pages/podcast";
import NotFound from "@/pages/not-found";
import ServerError from "@/pages/server-error";

function Router() {
  // Track page views when routes change
  useAnalytics();
  const { searchOpen, setSearchOpen } = useSearch();
  
  return (
    <ErrorBoundary>
      <SearchCommandPalette open={searchOpen} setOpen={setSearchOpen} />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/articles" component={Articles} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/podcasts" component={Podcasts} />
        <Route path="/podcast/:slug" component={Podcast} />
        <Route path="/error/:status?" component={({ params }) => {
          const status = params?.status ? parseInt(params.status) : 500;
          return <ServerError status={status} />;
        }} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Always initialize GA - it handles fallback internally
    initGA();
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <SearchProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
              <Analytics />
            </TooltipProvider>
          </SearchProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;

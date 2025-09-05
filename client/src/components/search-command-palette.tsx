import * as React from "react";
import { useLocation } from "wouter";
import { Search, FileText, Calendar, Clock, Tag, Mic } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { allArticles, type Article } from "@/data/articles";
import { allPodcasts, type Podcast } from "@/data/podcasts";
import { useSearch } from "@/contexts/search-context";
import { searchAll, type SearchResult } from "@/lib/search-utils";
import { trackSearch } from "@/lib/search-analytics";

interface SearchCommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SearchCommandPalette({ open, setOpen }: SearchCommandPaletteProps) {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = React.useState("");

  const searchResults = React.useMemo(() => {
    const results = searchAll(searchTerm);
    
    // Track search analytics (only for actual searches, not empty terms)
    if (searchTerm.trim()) {
      trackSearch(searchTerm, results.length, 'command_palette');
    }
    
    return results;
  }, [searchTerm]);

  // Separate results by type
  const articleResults = searchResults.filter(result => result.type === 'article');
  const podcastResults = searchResults.filter(result => result.type === 'podcast');

  const handleSelect = React.useCallback((type: 'article' | 'podcast', slug: string) => {
    setOpen(false);
    if (type === 'article') {
      setLocation(`/article/${slug}`);
    } else {
      setLocation(`/podcast/${slug}`);
    }
    setSearchTerm(""); // Clear search after selection
  }, [setLocation, setOpen]);

  const navigateToArticles = React.useCallback(() => {
    setOpen(false);
    setLocation("/articles");
    setSearchTerm("");
  }, [setLocation, setOpen]);

  const navigateToPodcasts = React.useCallback(() => {
    setOpen(false);
    setLocation("/podcasts");
    setSearchTerm("");
  }, [setLocation, setOpen]);

  const navigateToHome = React.useCallback(() => {
    setOpen(false);
    setLocation("/");
    setSearchTerm("");
  }, [setLocation, setOpen]);

  // Global keyboard shortcut handler
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
      
      // Also handle Escape to close
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen, open]);

  // Clear search when dialog closes
  React.useEffect(() => {
    if (!open) {
      setSearchTerm("");
    }
  }, [open]);

  return (
    <CommandDialog open={open} onOpenChange={setOpen} shouldFilter={false}>
      <VisuallyHidden>
        <DialogTitle>Search Articles & Podcasts</DialogTitle>
        <DialogDescription>
          Search through all articles and podcasts by title, topic, category, or content. Use keyboard navigation to browse results.
        </DialogDescription>
      </VisuallyHidden>
      
      <CommandInput
        placeholder="Search articles, podcasts, categories, or topics..."
        value={searchTerm}
        onValueChange={setSearchTerm}
        aria-label="Search articles"
        role="searchbox"
      />
      <CommandList className="max-h-[400px]" aria-label="Search results">
        {!searchTerm.trim() && searchResults.length === 0 && (
          <CommandEmpty>
            <div className="flex flex-col items-center py-6 text-center">
              <Search className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">Start typing to search</p>
              <p className="text-xs text-gray-400">
                Try searching for "AI", "CNTRL", "podcast", or "technology"
              </p>
            </div>
          </CommandEmpty>
        )}

        {searchTerm.trim() && searchResults.length === 0 && (
          <CommandEmpty>
            <div className="flex flex-col items-center py-6 text-center">
              <Search className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">No results found</p>
              <p className="text-xs text-gray-400">
                Try searching for "AI", "CNTRL", "podcast", or "technology"
              </p>
            </div>
          </CommandEmpty>
        )}

        {/* Quick navigation - only show when no search term */}
        {!searchTerm.trim() && (
          <CommandGroup heading="Quick Navigation">
            <CommandItem onSelect={navigateToHome}>
              <Search className="mr-2 h-4 w-4" />
              <span>Home</span>
            </CommandItem>
            <CommandItem onSelect={navigateToArticles}>
              <FileText className="mr-2 h-4 w-4" />
              <span>All Articles</span>
            </CommandItem>
            <CommandItem onSelect={navigateToPodcasts}>
              <Mic className="mr-2 h-4 w-4" />
              <span>All Podcasts</span>
            </CommandItem>
          </CommandGroup>
        )}

        {/* Articles Results */}
        {articleResults.length > 0 && (
          <>
            {!searchTerm.trim() && <CommandSeparator />}
            <CommandGroup heading={searchTerm.trim() ? `Articles (${articleResults.length})` : `Articles (${articleResults.length})`}>
              {articleResults.map((result) => {
                const article = result.item as Article;
                return (
                  <CommandItem
                    key={article.slug}
                    onSelect={() => handleSelect('article', article.slug)}
                    className="flex flex-col items-start p-4 gap-2"
                  >
                    <div className="flex items-start w-full">
                      <img
                        src={article.icon}
                        alt=""
                        className="w-8 h-8 rounded-lg mr-3 mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm truncate">
                            {article.title}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {article.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {article.category}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </div>
                          {article.publishDate && (
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {article.publishDate}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </>
        )}

        {/* Podcast Results */}
        {podcastResults.length > 0 && (
          <>
            {(articleResults.length > 0 || !searchTerm.trim()) && <CommandSeparator />}
            <CommandGroup heading={`Podcasts (${podcastResults.length})`}>
              {podcastResults.map((result) => {
                const podcast = result.item as Podcast;
                return (
                  <CommandItem
                    key={podcast.slug}
                    onSelect={() => handleSelect('podcast', podcast.slug)}
                    className="flex flex-col items-start p-4 gap-2"
                  >
                    <div className="flex items-start w-full">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mr-3 mt-1 flex-shrink-0 flex items-center justify-center">
                        <Mic className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm truncate">
                            {podcast.title}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {podcast.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {podcast.category === 'trailer' ? 'Trailer' : 
                             podcast.category === 'episode' ? `Ep. ${podcast.episodeNumber}` :
                             'Special'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {podcast.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {podcast.publishDate}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </>
        )}
      </CommandList>
      
      {/* Footer with keyboard shortcuts */}
      <div className="border-t p-2 text-xs text-gray-500 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>Navigate with ↑↓</span>
            <span>Select with ↵</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">
              {navigator.platform?.includes('Mac') ? '⌘' : 'Ctrl'}
            </kbd>
            <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">K</kbd>
            <span className="ml-1">to toggle</span>
          </div>
        </div>
      </div>
    </CommandDialog>
  );
}
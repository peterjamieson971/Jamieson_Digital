import * as React from "react";
import { useLocation } from "wouter";
import { Search, FileText, Calendar, Clock, Tag } from "lucide-react";
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
import { useSearch } from "@/contexts/search-context";
import { searchArticles } from "@/lib/search-utils";
import { trackSearch } from "@/lib/search-analytics";

interface SearchCommandPaletteProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SearchCommandPalette({ open, setOpen }: SearchCommandPaletteProps) {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredArticles = React.useMemo(() => {
    const results = searchArticles(searchTerm);
    
    // Track search analytics (only for actual searches, not empty terms)
    if (searchTerm.trim()) {
      trackSearch(searchTerm, results.length, 'command_palette');
    }
    
    return results;
  }, [searchTerm]);

  const handleSelect = React.useCallback((articleSlug: string) => {
    setOpen(false);
    setLocation(`/article/${articleSlug}`);
    setSearchTerm(""); // Clear search after selection
  }, [setLocation, setOpen]);

  const navigateToArticles = React.useCallback(() => {
    setOpen(false);
    setLocation("/articles");
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
        <DialogTitle>Search Articles</DialogTitle>
        <DialogDescription>
          Search through all articles by title, topic, category, or content. Use keyboard navigation to browse results.
        </DialogDescription>
      </VisuallyHidden>
      
      <CommandInput
        placeholder="Search articles, categories, or topics..."
        value={searchTerm}
        onValueChange={setSearchTerm}
        aria-label="Search articles"
        role="searchbox"
      />
      <CommandList className="max-h-[400px]" aria-label="Search results">
        {!searchTerm.trim() && filteredArticles.length === 0 && (
          <CommandEmpty>
            <div className="flex flex-col items-center py-6 text-center">
              <Search className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">Start typing to search</p>
              <p className="text-xs text-gray-400">
                Try searching for topics like "AI", "architecture", or "strategy"
              </p>
            </div>
          </CommandEmpty>
        )}

        {searchTerm.trim() && filteredArticles.length === 0 && (
          <CommandEmpty>
            <div className="flex flex-col items-center py-6 text-center">
              <Search className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 mb-1">No results found</p>
              <p className="text-xs text-gray-400">
                Try searching for topics like "AI", "architecture", or "strategy"
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
          </CommandGroup>
        )}

        {filteredArticles.length > 0 && (
          <>
            {!searchTerm.trim() && <CommandSeparator />}
            <CommandGroup heading={searchTerm.trim() ? `Results (${filteredArticles.length})` : `Articles (${filteredArticles.length})`}>
              {filteredArticles.map((article) => (
                <CommandItem
                  key={article.slug}
                  onSelect={() => handleSelect(article.slug)}
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
              ))}
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
// Simple client-side search analytics for tracking popular search terms
// This data helps optimize search keywords and understand user behavior

interface SearchAnalytics {
  searchTerm: string;
  timestamp: number;
  resultsCount: number;
  interface: 'command_palette' | 'articles_page';
}

const ANALYTICS_KEY = 'jamieson_search_analytics';
const MAX_ENTRIES = 1000; // Limit storage to prevent excessive local storage usage

// Track a search query
export const trackSearch = (
  searchTerm: string,
  resultsCount: number,
  searchInterface: 'command_palette' | 'articles_page'
): void => {
  // Only track non-empty searches
  if (!searchTerm.trim()) return;

  try {
    // Get existing analytics
    const existing = getStoredAnalytics();
    
    // Create new entry
    const newEntry: SearchAnalytics = {
      searchTerm: searchTerm.trim().toLowerCase(),
      timestamp: Date.now(),
      resultsCount,
      interface: searchInterface,
    };
    
    // Add to existing data
    const updated = [newEntry, ...existing];
    
    // Limit storage size
    const limited = updated.slice(0, MAX_ENTRIES);
    
    // Store back to localStorage
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(limited));
  } catch (error) {
    // Fail silently - analytics shouldn't break the search functionality
    console.debug('Search analytics tracking failed:', error);
  }
};

// Get stored analytics data
const getStoredAnalytics = (): SearchAnalytics[] => {
  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Get popular search terms for optimization
export const getPopularSearchTerms = (limit = 20): Array<{ term: string; count: number; avgResults: number }> => {
  try {
    const analytics = getStoredAnalytics();
    
    // Group by search term
    const termCounts = analytics.reduce((acc, entry) => {
      const { searchTerm, resultsCount } = entry;
      if (!acc[searchTerm]) {
        acc[searchTerm] = { count: 0, totalResults: 0 };
      }
      acc[searchTerm].count++;
      acc[searchTerm].totalResults += resultsCount;
      return acc;
    }, {} as Record<string, { count: number; totalResults: number }>);
    
    // Convert to array and sort by popularity
    return Object.entries(termCounts)
      .map(([term, data]) => ({
        term,
        count: data.count,
        avgResults: Math.round(data.totalResults / data.count),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  } catch {
    return [];
  }
};

// Get search terms with zero results for optimization
export const getZeroResultSearches = (limit = 10): Array<{ term: string; count: number }> => {
  try {
    const analytics = getStoredAnalytics();
    
    // Filter for zero-result searches
    const zeroResults = analytics.filter(entry => entry.resultsCount === 0);
    
    // Group by term and count
    const termCounts = zeroResults.reduce((acc, entry) => {
      acc[entry.searchTerm] = (acc[entry.searchTerm] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Convert to array and sort by frequency
    return Object.entries(termCounts)
      .map(([term, count]) => ({ term, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  } catch {
    return [];
  }
};

// Clear analytics data (for privacy/maintenance)
export const clearSearchAnalytics = (): void => {
  try {
    localStorage.removeItem(ANALYTICS_KEY);
  } catch {
    // Fail silently
  }
};

// Get analytics summary
export const getAnalyticsSummary = () => {
  try {
    const analytics = getStoredAnalytics();
    const totalSearches = analytics.length;
    const uniqueTerms = new Set(analytics.map(a => a.searchTerm)).size;
    const zeroResultCount = analytics.filter(a => a.resultsCount === 0).length;
    
    return {
      totalSearches,
      uniqueTerms,
      zeroResultCount,
      zeroResultRate: totalSearches > 0 ? (zeroResultCount / totalSearches) * 100 : 0,
    };
  } catch {
    return {
      totalSearches: 0,
      uniqueTerms: 0,
      zeroResultCount: 0,
      zeroResultRate: 0,
    };
  }
};
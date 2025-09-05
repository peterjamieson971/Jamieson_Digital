import { useState, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, Home, Filter, SortAsc, Search, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { allPodcasts, getAllPodcastCategories, type Podcast } from '../data/podcasts';
import { YouTubeThumbnail } from '../components/youtube-player';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function Podcasts() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'episode'>('newest');

  const categories = useMemo(() => {
    const uniqueCategories = getAllPodcastCategories();
    return ['All Categories', ...uniqueCategories.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1)).sort()];
  }, []);

  // Filter and search podcasts
  const filteredPodcasts = useMemo(() => {
    let filtered = allPodcasts;

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      const categoryLower = selectedCategory.toLowerCase();
      filtered = filtered.filter(podcast => podcast.category === categoryLower);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(podcast => {
        return (
          podcast.title.toLowerCase().includes(query) ||
          podcast.description.toLowerCase().includes(query) ||
          podcast.topics.some(topic => topic.toLowerCase().includes(query)) ||
          podcast.guestName?.toLowerCase().includes(query) ||
          podcast.searchKeywords?.some(keyword => keyword.toLowerCase().includes(query))
        );
      });
    }

    // Sort podcasts
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
        case 'oldest':
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime();
        case 'episode':
          return b.episodeNumber - a.episodeNumber;
        default:
          return 0;
      }
    });

    return sorted;
  }, [searchQuery, selectedCategory, sortBy]);

  const handlePodcastClick = (podcast: Podcast) => {
    setLocation(`/podcast/${podcast.slug}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Podcasts - Ctrl + AI | Jamieson Digital</title>
        <link rel="canonical" href="https://jamieson.digital/podcasts" />
        <meta name="description" content="Explore the Ctrl + AI podcast series with Peter Jamieson. Deep dives into technology leadership, artificial intelligence, and digital transformation." />
        <meta name="keywords" content="Ctrl AI, Peter Jamieson, AI Podcast, Technology Leadership, Digital Transformation" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Podcasts - Ctrl + AI | Jamieson Digital" />
        <meta property="og:description" content="Explore the Ctrl + AI podcast series with Peter Jamieson. Deep dives into technology leadership, artificial intelligence, and digital transformation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jamieson.digital/podcasts" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Podcasts - Ctrl + AI | Jamieson Digital" />
        <meta name="twitter:description" content="Explore the Ctrl + AI podcast series with Peter Jamieson. Deep dives into technology leadership, artificial intelligence, and digital transformation." />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "PodcastSeries",
            "name": "CNTRL + AI",
            "description": "Where technology leadership meets artificial intelligence transformation",
            "url": "https://jamieson.digital/podcasts",
            "author": {
              "@type": "Person",
              "name": "Peter Jamieson"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Jamieson Digital"
            }
          })}
        </script>
      </Helmet>
      
      <Navigation />
      
      <main id="main-content" role="main" className="pt-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="py-8 px-6 lg:px-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center text-apple-gray hover:text-apple-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-1 py-1"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <span className="text-apple-gray mx-2">/</span>
              </li>
              <li aria-current="page" className="text-apple-text font-medium">
                Podcasts
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section 
          className="relative py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden"
          style={{
            backgroundImage: 'url(/podcast-hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-blue-900/80"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <Link 
                href="/"
                className="inline-flex items-center text-white hover:text-blue-200 transition-colors duration-200 mb-8 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 rounded px-2 py-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-6">
              Ctrl + AI Podcast
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-4">
              Where technology leadership meets artificial intelligence transformation. 
              Join Peter Jamieson as he explores the practical realities of implementing AI in enterprise environments.
            </p>
            <div className="text-blue-200">
              <span className="font-medium">{allPodcasts.length} episode{allPodcasts.length !== 1 ? 's' : ''}</span> • Updated regularly
            </div>
          </div>
        </section>

        {/* Filters and Sorting */}
        <section className="py-8 px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              
              {/* Results Counter and Info */}
              <div className="flex items-center gap-4">
                <div className="text-apple-text font-medium">
                  {filteredPodcasts.length} episode{filteredPodcasts.length !== 1 ? 's' : ''}
                  {searchQuery.trim() && (
                    <span className="text-apple-gray ml-2">
                      for <span className="text-green-600 font-semibold">"{searchQuery}"</span>
                    </span>
                  )}
                  {selectedCategory !== "All Categories" && (
                    <span className="text-apple-gray ml-2">
                      in <span className="text-apple-blue font-semibold">{selectedCategory}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Search Input */}
                <div className="relative">
                  <label htmlFor="search-podcasts" className="sr-only">Search episodes</label>
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 w-4 h-4 text-apple-gray pointer-events-none" />
                    <input
                      id="search-podcasts"
                      type="text"
                      placeholder="Search episodes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:min-w-[240px] bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl pl-10 pr-10 py-3 text-apple-text font-medium text-base placeholder-gray-400 focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/20 shadow-sm hover:shadow-md transition-all duration-200"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 p-0.5 rounded-full hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition-colors"
                        aria-label="Clear search"
                      >
                        <X className="w-4 h-4 text-apple-gray" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="relative">
                  <label htmlFor="category-filter" className="sr-only">Filter by category</label>
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 text-apple-gray mr-2" />
                    <select
                      id="category-filter"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl px-4 py-3 pr-10 text-apple-text text-base tracking-normal focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/20 min-w-[180px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      style={{ 
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        fontWeight: '400',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em'
                      }}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="relative">
                  <label htmlFor="sort-order" className="sr-only">Sort episodes</label>
                  <div className="flex items-center">
                    <SortAsc className="w-4 h-4 text-apple-gray mr-2" />
                    <select
                      id="sort-order"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'episode')}
                      className="appearance-none bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl px-4 py-3 pr-10 text-apple-text text-base tracking-normal focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/20 min-w-[160px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      style={{ 
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        fontWeight: '400',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em'
                      }}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="episode">Episode Number</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Episodes Content */}
        <section className="py-12 px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {filteredPodcasts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.696" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No episodes found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPodcasts.map((podcast) => (
                  <div
                    key={podcast.slug}
                    className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group"
                    onClick={() => handlePodcastClick(podcast)}
                  >
                {/* Video Thumbnail */}
                <div className="p-4 pb-0">
                  <YouTubeThumbnail
                    videoId={podcast.youtubeId}
                    title={podcast.title}
                    isShort={podcast.isShort}
                    className="mb-4"
                  />
                </div>

                {/* Content */}
                <div className="p-6 pt-2">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      podcast.category === 'trailer' ? 'bg-red-100 text-red-800' :
                      podcast.category === 'episode' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {podcast.category === 'trailer' ? 'Trailer' : 
                       podcast.category === 'episode' ? `Episode ${podcast.episodeNumber}` :
                       'Special'}
                    </span>
                    <span className="text-sm text-gray-500">{podcast.duration}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {podcast.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {podcast.description}
                  </p>

                  {/* Guest */}
                  {podcast.guestName && (
                    <p className="text-sm text-gray-500 mb-3">
                      <span className="font-medium">Guest:</span> {podcast.guestName}
                    </p>
                  )}

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {podcast.topics.slice(0, 3).map((topic, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600"
                      >
                        {topic}
                      </span>
                    ))}
                    {podcast.topics.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                        +{podcast.topics.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Publish Date */}
                    <p className="text-sm text-gray-500">{podcast.publishDate}</p>
                  </div>
                </div>
              ))}
            </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowLeft, Home, Filter, SortAsc } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useMemo, useRef } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { allArticles } from "@/data/articles";

export default function Articles() {
  // State for filtering and sorting
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [location] = useLocation();
  const hasScrolledRef = useRef(false);

  // Smart scroll-to-top logic - only when actually needed
  useEffect(() => {
    // Check if this is a direct URL access, refresh, or back/forward navigation
    const isDirectAccess = !document.referrer || 
                          document.referrer.indexOf(window.location.origin) !== 0;
    
    // Check for page refresh (fallback for older browsers)
    const isPageRefresh = performance.navigation?.type === 1 || 
                         (performance.getEntriesByType && 
                          performance.getEntriesByType('navigation')[0]?.type === 'reload');
    
    // Check if user came from homepage (natural navigation)
    const cameFromHomepage = document.referrer && 
                            document.referrer.includes(window.location.origin) &&
                            (document.referrer.endsWith('/') || document.referrer.includes('/#'));

    // Only scroll to top if:
    // 1. Direct URL access or page refresh
    // 2. Coming from a different site
    // 3. NOT coming from natural homepage navigation
    if (isDirectAccess || isPageRefresh || !cameFromHomepage) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    
    hasScrolledRef.current = true;
  }, []);

  // Auto-generate unique categories from articles
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allArticles.map(article => article.category)));
    return ["All Categories", ...uniqueCategories.sort()];
  }, []);

  // Filter and sort articles based on state
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = allArticles;

    // Filter by category
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Sort articles
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          // Sort by publish date (newest first)
          const dateA = new Date(a.publishDate || "1900-01-01");
          const dateB = new Date(b.publishDate || "1900-01-01");
          return dateB.getTime() - dateA.getTime();
        case "oldest":
          // Sort by publish date (oldest first)
          const dateC = new Date(a.publishDate || "1900-01-01");
          const dateD = new Date(b.publishDate || "1900-01-01");
          return dateC.getTime() - dateD.getTime();
        case "category":
          // Sort alphabetically by category, then by title
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          return a.title.localeCompare(b.title);
        case "read-time-short":
          // Sort by read time (shortest first)
          const readTimeA = parseInt(a.readTime.split(' ')[0]);
          const readTimeB = parseInt(b.readTime.split(' ')[0]);
          return readTimeA - readTimeB;
        case "read-time-long":
          // Sort by read time (longest first)
          const readTimeC = parseInt(a.readTime.split(' ')[0]);
          const readTimeD = parseInt(b.readTime.split(' ')[0]);
          return readTimeD - readTimeC;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortOrder]);
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>All Articles | Peter Jamieson</title>
        <link rel="canonical" href="https://jamieson.digital/articles" />
        <meta name="description" content="Explore all articles and insights from Peter Jamieson on digital transformation, AI strategy, technology leadership, and business innovation." />
        <meta name="keywords" content="Peter Jamieson, articles, digital transformation, AI, technology leadership, enterprise architecture, business strategy" />
        
        {/* Open Graph */}
        <meta property="og:title" content="All Articles | Peter Jamieson" />
        <meta property="og:description" content="Explore all articles and insights from Peter Jamieson on digital transformation, AI strategy, technology leadership, and business innovation." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jamieson.digital/articles" />
        <meta property="og:site_name" content="Peter Jamieson" />
        <meta property="og:image" content="https://jamieson.digital/profile-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@digitaljamieson" />
        <meta name="twitter:creator" content="@digitaljamieson" />
        <meta name="twitter:title" content="All Articles | Peter Jamieson" />
        <meta name="twitter:description" content="Explore all articles and insights from Peter Jamieson on digital transformation, AI strategy, technology leadership, and business innovation." />
        <meta name="twitter:image" content="https://jamieson.digital/profile-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "All Articles",
            "description": "Collection of articles and insights from Peter Jamieson",
            "url": "https://jamieson.digital/articles",
            "author": {
              "@type": "Person",
              "name": "Peter Jamieson",
              "jobTitle": "Digital Transformation Leader",
              "url": "https://jamieson.digital"
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": allArticles.length,
              "itemListElement": allArticles.map((article, index) => ({
                "@type": "Article",
                "position": index + 1,
                "name": article.title,
                "description": article.description,
                "url": `https://jamieson.digital/article/${article.slug}`,
                "author": {
                  "@type": "Person",
                  "name": article.author || "Peter Jamieson"
                },
                "datePublished": article.publishDate,
                "articleSection": article.category
              }))
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
                Articles
              </li>
            </ol>
          </div>
        </nav>

        {/* Hero Section */}
        <section 
          className="relative py-20 px-6 lg:px-8 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden"
          style={{
            backgroundImage: 'url(/articles-hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Overlay for better text readability */}
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
              All Articles
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-4">
              Insights and thought leadership on technology, digital transformation, AI strategy, and business innovation
            </p>
            <div className="text-blue-200">
              <span className="font-medium">{allArticles.length} articles</span> • Updated regularly
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
                  {filteredAndSortedArticles.length} article{filteredAndSortedArticles.length !== 1 ? 's' : ''}
                  {selectedCategory !== "All Categories" && (
                    <span className="text-apple-gray ml-2">
                      in <span className="text-apple-blue font-semibold">{selectedCategory}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex flex-col sm:flex-row gap-4">
                
                {/* Category Filter */}
                <div className="relative">
                  <label htmlFor="category-filter" className="sr-only">Filter by category</label>
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 text-apple-gray mr-2" />
                    <select
                      id="category-filter"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl px-4 py-3 pr-10 text-apple-text font-medium text-base tracking-normal focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/20 min-w-[180px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      style={{ 
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em'
                      }}
                    >
                      {categories.map((category) => (
                        <option 
                          key={category} 
                          value={category}
                          style={{ 
                            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                            fontWeight: '500',
                            fontSize: '16px'
                          }}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="relative">
                  <label htmlFor="sort-order" className="sr-only">Sort articles</label>
                  <div className="flex items-center">
                    <SortAsc className="w-4 h-4 text-apple-gray mr-2" />
                    <select
                      id="sort-order"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="appearance-none bg-white border-2 border-gray-200 hover:border-gray-300 rounded-2xl px-4 py-3 pr-10 text-apple-text font-medium text-base tracking-normal focus:outline-none focus:border-apple-blue focus:ring-4 focus:ring-apple-blue/20 min-w-[160px] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                      style={{ 
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 0.75rem center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em'
                      }}
                    >
                      <option 
                        value="newest"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                          fontWeight: '500',
                          fontSize: '16px'
                        }}
                      >
                        Newest First
                      </option>
                      <option 
                        value="oldest"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                          fontWeight: '500',
                          fontSize: '16px'
                        }}
                      >
                        Oldest First
                      </option>
                      <option 
                        value="category"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                          fontWeight: '500',
                          fontSize: '16px'
                        }}
                      >
                        By Category
                      </option>
                      <option 
                        value="read-time-short"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                          fontWeight: '500',
                          fontSize: '16px'
                        }}
                      >
                        Quick Reads
                      </option>
                      <option 
                        value="read-time-long"
                        style={{ 
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                          fontWeight: '500',
                          fontSize: '16px'
                        }}
                      >
                        Long Reads
                      </option>
                    </select>
                  </div>
                </div>

              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedCategory !== "All Categories" || sortOrder !== "newest") && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-apple-gray font-medium">Active filters:</span>
                
                {selectedCategory !== "All Categories" && (
                  <button
                    onClick={() => setSelectedCategory("All Categories")}
                    className="inline-flex items-center px-3 py-1 bg-apple-blue text-white text-sm rounded-full hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2"
                  >
                    <span>{selectedCategory}</span>
                    <span className="ml-2 text-xs">×</span>
                  </button>
                )}
                
                {sortOrder !== "newest" && (
                  <button
                    onClick={() => setSortOrder("newest")}
                    className="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded-full hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                  >
                    <span>
                      {sortOrder === "oldest" && "Oldest First"}
                      {sortOrder === "category" && "By Category"}
                      {sortOrder === "read-time-short" && "Quick Reads"}
                      {sortOrder === "read-time-long" && "Long Reads"}
                    </span>
                    <span className="ml-2 text-xs">×</span>
                  </button>
                )}

                {(selectedCategory !== "All Categories" || sortOrder !== "newest") && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All Categories");
                      setSortOrder("newest");
                    }}
                    className="text-sm text-apple-blue hover:text-blue-700 font-medium underline focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {filteredAndSortedArticles.length === 0 ? (
              /* No Results State */
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-apple-text mb-4">No articles found</h3>
                <p className="text-apple-gray mb-6 max-w-md mx-auto">
                  No articles match your current filters. Try adjusting your category selection or sort order.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSortOrder("newest");
                  }}
                  className="inline-flex items-center px-6 py-3 bg-apple-blue hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {filteredAndSortedArticles.map((article, index) => (
                <article key={index} className="group relative">
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 p-8 h-full flex flex-col border border-gray-100/50">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-50 to-white border border-gray-100 relative">
                        <img 
                          src={article.icon} 
                          alt={`${article.title} icon`} 
                          className="w-16 h-16 object-cover rounded-2xl" 
                        />
                        {/* Future: Video indicator badge */}
                        {article.hasVideo && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-apple-blue rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <div className="mb-6">
                        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-apple-blue/10 to-blue-500/10 text-apple-blue rounded-full text-sm font-semibold mb-3 border border-apple-blue/20">
                          {article.category}
                        </span>
                        <div className="flex items-center justify-center gap-3 text-sm text-apple-gray font-medium">
                          <span>{article.readTime}</span>
                          {article.publishDate && (
                            <>
                              <span>•</span>
                              <span>{article.publishDate}</span>
                            </>
                          )}
                          {/* Future: Video duration */}
                          {article.hasVideo && article.videoDuration && (
                            <>
                              <span>•</span>
                              <span className="text-apple-blue font-semibold">
                                {article.videoDuration} video
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-apple-text mb-4 tracking-tight leading-tight">
                        {article.title}
                      </h2>
                      <p className="text-apple-gray text-base leading-relaxed font-medium line-height-loose">
                        {article.description}
                      </p>
                    </div>
                    
                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-gray-100">
                      <Link 
                        href={`/article/${article.slug}`} 
                        className="inline-flex items-center justify-center w-full text-apple-blue font-semibold hover:text-blue-700 transition-colors duration-200 group/link focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1"
                      >
                        <span>{article.hasVideo ? 'Watch & Read' : 'Read Article'}</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-apple-gray mb-8 leading-relaxed">
              Get notified when new articles are published. Connect with me on social media or reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/#contact"
                className="inline-flex items-center px-8 py-3 bg-apple-blue hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2"
              >
                Get in Touch
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a 
                href="https://linkedin.com/in/pjamieson"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 border-2 border-apple-blue text-apple-blue hover:bg-apple-blue hover:text-white font-semibold rounded-2xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2"
              >
                Follow on LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
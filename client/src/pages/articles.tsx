import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Home } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { allArticles } from "@/data/articles";

export default function Articles() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
              "jobTitle": "Chief Information Officer",
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
        <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <Link 
                href="/"
                className="inline-flex items-center text-apple-blue hover:text-blue-700 transition-colors duration-200 mb-8 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-apple-text tracking-tight mb-6">
              All Articles
            </h1>
            <p className="text-xl text-apple-gray max-w-3xl mx-auto leading-relaxed mb-4">
              Insights and thought leadership on technology, digital transformation, AI strategy, and business innovation
            </p>
            <div className="text-apple-gray">
              <span className="font-medium">{allArticles.length} articles</span> • Updated regularly
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-20 px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {allArticles.map((article, index) => (
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
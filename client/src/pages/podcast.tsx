import { useRoute, Link } from 'wouter';
import { Home, ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { getPodcastBySlug, getVisiblePodcasts, type Podcast } from '../data/podcasts';
import { YouTubePlayer, YouTubeThumbnail } from '../components/youtube-player';
import { useLocation } from 'wouter';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function PodcastPage() {
  const [, params] = useRoute('/podcast/:slug');
  const [, setLocation] = useLocation();
  
  if (!params?.slug) {
    return <div>Podcast not found</div>;
  }

  const podcast = getPodcastBySlug(params.slug);

  if (!podcast) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Podcast Not Found</h1>
          <p className="text-gray-600 mb-6">The podcast you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => setLocation('/podcasts')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Podcasts
          </button>
        </div>
      </div>
    );
  }

  // Get related podcasts (exclude current one, respect release dates)
  const relatedPodcasts = getVisiblePodcasts()
    .filter(p => p.slug !== podcast.slug)
    .slice(0, 3);

  const handleRelatedPodcastClick = (relatedPodcast: Podcast) => {
    setLocation(`/podcast/${relatedPodcast.slug}`);
  };

  const shareUrl = `https://jamieson.digital/podcast/${podcast.slug}`;
  const shareText = `Check out "${podcast.title}" by Peter Jamieson`;

  return (
    <div className="bg-white min-h-screen">
      <Helmet prioritizeSeoTags>
        <title>{podcast.title} | Podcasts | Peter Jamieson</title>
        <link rel="canonical" href={shareUrl} />
        <meta name="description" content={podcast.description} />
        <meta name="keywords" content={podcast.searchKeywords?.join(', ')} />

        {/* Open Graph */}
        <meta property="og:title" content={`${podcast.title} | Peter Jamieson`} />
        <meta property="og:description" content={podcast.description} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:site_name" content="Peter Jamieson" />
        <meta property="og:image" content={`https://img.youtube.com/vi/${podcast.youtubeId}/maxresdefault.jpg`} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content={`${podcast.title} thumbnail`} />
        <meta property="og:video" content={podcast.youtubeUrl} />
        <meta property="og:video:secure_url" content={podcast.youtubeUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@digitaljamieson" />
        <meta name="twitter:creator" content="@digitaljamieson" />
        <meta name="twitter:title" content={`${podcast.title} | Peter Jamieson`} />
        <meta name="twitter:description" content={podcast.description} />
        <meta name="twitter:image" content={`https://img.youtube.com/vi/${podcast.youtubeId}/maxresdefault.jpg`} />
        <meta name="twitter:player" content={`https://www.youtube.com/embed/${podcast.youtubeId}`} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": podcast.title,
            "description": podcast.description,
            "thumbnailUrl": `https://img.youtube.com/vi/${podcast.youtubeId}/maxresdefault.jpg`,
            "uploadDate": new Date(podcast.publishDate).toISOString().split('T')[0],
            "duration": `PT${podcast.duration.replace(/[^\d:]/g, '').replace(':', 'M')}S`,
            "embedUrl": `https://www.youtube.com/embed/${podcast.youtubeId}`,
            "contentUrl": podcast.youtubeUrl,
            "publisher": {
              "@type": "Organization",
              "name": "Jamieson Digital",
              "url": "https://jamieson.digital"
            },
            "author": {
              "@type": "Person",
              "name": "Peter Jamieson",
              "url": "https://jamieson.digital"
            },
            "partOfSeries": {
              "@type": "PodcastSeries",
              "name": "Peter Jamieson Podcasts",
              "url": "https://jamieson.digital/podcasts"
            },
            "keywords": podcast.searchKeywords?.join(', '),
            "genre": "Technology",
            "inLanguage": "en-US"
          })}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://jamieson.digital/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Podcasts",
                "item": "https://jamieson.digital/podcasts"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": podcast.title,
                "item": shareUrl
              }
            ]
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
              <li>
                <Link 
                  href="/podcasts"
                  className="text-apple-gray hover:text-apple-blue transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-1 py-1"
                >
                  Podcasts
                </Link>
              </li>
              <li>
                <span className="text-apple-gray mx-2">/</span>
              </li>
              <li aria-current="page" className="text-apple-text font-medium">
                {podcast.title}
              </li>
            </ol>
          </div>
        </nav>

        {/* Main Content */}
        <section className="py-12 px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Main Content Column */}
              <div className="lg:col-span-3">
                {/* Video Player Card */}
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-6">
                  <div className="p-6">
                    <div className={`bg-gray-900 rounded-lg overflow-hidden mb-6 mx-auto ${
                      podcast.isShort 
                        ? 'aspect-[9/16] max-w-sm' 
                        : 'aspect-video max-w-2xl'
                    }`}>
                      <YouTubePlayer
                        videoId={podcast.youtubeId}
                        title={podcast.title}
                        isShort={podcast.isShort}
                        autoLoad={true}
                        embedRestricted={podcast.embedRestricted}
                      />
                    </div>
                  </div>
                  
                  {/* Episode Info */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          podcast.category === 'trailer' ? 'bg-red-100 text-red-800' :
                          podcast.category === 'episode' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {podcast.category === 'trailer' ? 'Trailer' : 
                           podcast.category === 'episode' ? `Episode ${podcast.episodeNumber}` :
                           'Special'}
                        </span>
                        <span className="text-gray-500 text-sm">{podcast.duration}</span>
                        <span className="text-gray-500 text-sm">{podcast.publishDate}</span>
                      </div>
                      
                      {/* Share Button */}
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: podcast.title,
                              text: shareText,
                              url: shareUrl
                            });
                          } else {
                            navigator.clipboard.writeText(shareUrl);
                          }
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Episode Content */}
                <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-apple-text tracking-tight mb-4">
                    {podcast.title}
                  </h1>
                  
                  {podcast.guestName && (
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-apple-text">
                        <span className="font-semibold text-apple-blue">Guest:</span> {podcast.guestName}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-lg text-apple-gray leading-relaxed mb-6">
                    {podcast.description}
                  </p>

                  {/* Topics */}
                  <div className="mb-4">
                    <h3 className="text-base font-semibold text-apple-text mb-3">Topics Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {podcast.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-apple-blue/10 text-apple-blue border border-apple-blue/20"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Related Episodes */}
                {relatedPodcasts.length > 0 && (
                  <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
                    <h3 className="text-lg font-semibold text-apple-text mb-4">More Episodes</h3>
                    <div className="space-y-4">
                      {relatedPodcasts.map((relatedPodcast) => (
                        <div
                          key={relatedPodcast.slug}
                          className="cursor-pointer group"
                          onClick={() => handleRelatedPodcastClick(relatedPodcast)}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0">
                              <YouTubeThumbnail
                                videoId={relatedPodcast.youtubeId}
                                title={relatedPodcast.title}
                                isShort={relatedPodcast.isShort}
                                className="w-20 h-12 rounded-lg"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-1">
                                {relatedPodcast.title}
                              </h4>
                              <p className="text-xs text-gray-500">{relatedPodcast.duration} • {relatedPodcast.publishDate}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subscribe Section */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-apple-text mb-3">Subscribe to Podcasts</h3>
                  <p className="text-apple-gray text-sm mb-4">
                    Stay updated with the latest episodes exploring technology leadership and AI transformation.
                  </p>
                  <a
                    href="https://www.youtube.com/@jamiesondigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Subscribe on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
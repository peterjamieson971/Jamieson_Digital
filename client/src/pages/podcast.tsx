import { useState } from 'react';
import { useRoute } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { getPodcastBySlug, allPodcasts, type Podcast } from '../data/podcasts';
import { YouTubePlayer, YouTubeThumbnail } from '../components/youtube-player';
import { useLocation } from 'wouter';
import Navigation from '../components/navigation';
import Footer from '../components/footer';

export default function PodcastPage() {
  const [, params] = useRoute('/podcast/:slug');
  const [, setLocation] = useLocation();
  const [showTranscript, setShowTranscript] = useState(false);
  
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

  // Get related podcasts (exclude current one)
  const relatedPodcasts = allPodcasts
    .filter(p => p.slug !== podcast.slug)
    .slice(0, 3);

  const handleRelatedPodcastClick = (relatedPodcast: Podcast) => {
    setLocation(`/podcast/${relatedPodcast.slug}`);
  };

  const shareUrl = `https://jamieson.digital/podcast/${podcast.slug}`;
  const shareText = `Check out "${podcast.title}" from the CNTRL + AI podcast series by Peter Jamieson`;

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{podcast.title} | CNTRL + AI Podcast</title>
        <link rel="canonical" href={shareUrl} />
        <meta name="description" content={podcast.description} />
        <meta name="keywords" content={podcast.searchKeywords?.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={podcast.title} />
        <meta property="og:description" content={podcast.description} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:image" content={`https://img.youtube.com/vi/${podcast.youtubeId}/maxresdefault.jpg`} />
        <meta property="og:video" content={podcast.youtubeUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:title" content={podcast.title} />
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
            "uploadDate": podcast.publishDate,
            "duration": `PT${podcast.duration.replace(/[^\\d:]/g, '')}`,
            "embedUrl": `https://www.youtube.com/embed/${podcast.youtubeId}`,
            "publisher": {
              "@type": "Organization",
              "name": "Jamieson Digital"
            },
            "author": {
              "@type": "Person",
              "name": "Peter Jamieson"
            },
            "partOfSeries": {
              "@type": "PodcastSeries",
              "name": "Ctrl + AI"
            }
          })}
        </script>
      </Helmet>
      
      <Navigation />
      
      <main id="main-content" role="main" className="pt-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="py-8 px-6 lg:px-8 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => setLocation('/podcasts')}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Podcasts
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <section className="py-12 px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Main Content Column */}
              <div className="lg:col-span-2">
                {/* Video Player Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 p-8 mb-8">
                  <YouTubePlayer
                    videoId={podcast.youtubeId}
                    title={podcast.title}
                    isShort={podcast.isShort}
                    className="mb-6"
                  />
                  
                  {/* Episode Info */}
                  <div className="flex items-center justify-between mb-6">
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
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
                
                {/* Episode Content Card */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 p-8 mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-6">
                    {podcast.title}
                  </h1>
                  
                  {podcast.guestName && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                      <p className="text-lg text-apple-text">
                        <span className="font-bold text-apple-blue">Guest:</span> {podcast.guestName}
                      </p>
                    </div>
                  )}
                  
                  <p className="text-xl text-apple-gray leading-relaxed mb-8">
                    {podcast.description}
                  </p>

                  {/* Topics */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-apple-text mb-4">Topics Covered</h3>
                    <div className="flex flex-wrap gap-3">
                      {podcast.topics.map((topic, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200 hover:shadow-md transition-shadow"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Transcript Section */}
                {podcast.transcript && (
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 p-8 mb-8">
                    <button
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="flex items-center justify-between w-full hover:bg-gray-50 transition-colors rounded-2xl p-4"
                    >
                      <h3 className="text-2xl font-bold text-apple-text">Transcript</h3>
                      <svg
                        className={`w-6 h-6 text-apple-blue transition-transform ${
                          showTranscript ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showTranscript && (
                      <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
                        <p className="text-apple-gray text-lg leading-relaxed whitespace-pre-line">
                          {podcast.transcript}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Watch on YouTube */}
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 p-8">
                  <div className="flex items-center gap-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-apple-text mb-2">Watch on YouTube</h3>
                      <p className="text-apple-gray mb-4">Like, subscribe, and join the conversation on YouTube</p>
                      <a
                        href={podcast.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Watch on YouTube
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                {/* Related Episodes */}
                {relatedPodcasts.length > 0 && (
                  <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 p-8 mb-8">
                    <h3 className="text-2xl font-bold text-apple-text mb-6">More Episodes</h3>
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
                                className="w-24 h-14 rounded"
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
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 p-8">
                  <h3 className="text-2xl font-bold text-apple-text mb-4">Subscribe to Ctrl + AI</h3>
                  <p className="text-apple-gray mb-6">
                    Stay updated with the latest episodes exploring technology leadership and AI transformation.
                  </p>
                  <a
                    href="https://www.youtube.com/@jamiesondigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-2xl hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
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
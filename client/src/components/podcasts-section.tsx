import { featuredPodcasts } from '../data/podcasts';
import { YouTubeThumbnail } from './youtube-player';
import { useLocation } from 'wouter';

export default function PodcastsSection() {
  const [, setLocation] = useLocation();

  const handlePodcastClick = (slug: string) => {
    setLocation(`/podcast/${slug}`);
  };

  const handleViewAllClick = () => {
    setLocation('/podcasts');
  };

  // Only show if we have podcasts
  if (featuredPodcasts.length === 0) return null;

  return (
    <section 
      id="podcasts" 
      className="section-fade py-12 md:py-16 bg-gradient-to-b from-white to-gray-50" 
      aria-labelledby="podcasts-heading"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            id="podcasts-heading"
            className="text-3xl md:text-4xl font-bold text-apple-text tracking-tight mb-4"
          >
            Podcasts
          </h2>
          <p className="text-lg text-apple-gray max-w-2xl mx-auto leading-relaxed">
            Where technology leadership meets artificial intelligence transformation. 
            Exploring the practical realities of implementing AI in enterprise environments.
          </p>
        </div>

        {/* Latest Episode - Compact Card Layout */}
        {featuredPodcasts.length > 0 && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden max-w-2xl mx-auto">
              <div className="p-6">
                {/* Video Thumbnail - Uniform 16:9 aspect ratio */}
                <div className="mb-4">
                  <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden cursor-pointer group relative">
                    <img
                      src={`https://img.youtube.com/vi/${featuredPodcasts[0].youtubeId}/hqdefault.jpg`}
                      alt={`${featuredPodcasts[0].title} thumbnail`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity" />
                    <button
                      onClick={() => handlePodcastClick(featuredPodcasts[0].slug)}
                      className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                      aria-label={`Play ${featuredPodcasts[0].title}`}
                    >
                      <div className="w-16 h-16 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                    {featuredPodcasts[0].isShort && (
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                        Short
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      featuredPodcasts[0].category === 'trailer' ? 'bg-red-100 text-red-800' :
                      featuredPodcasts[0].category === 'episode' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {featuredPodcasts[0].category === 'trailer' ? 'Latest: Trailer' : 
                       featuredPodcasts[0].category === 'episode' ? `Episode ${featuredPodcasts[0].episodeNumber}` :
                       'Special Episode'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {featuredPodcasts[0].title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {featuredPodcasts[0].description}
                  </p>

                  <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-500">
                    <span>{featuredPodcasts[0].duration}</span>
                    <span>•</span>
                    <span>{featuredPodcasts[0].publishDate}</span>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => handlePodcastClick(featuredPodcasts[0].slug)}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
                    >
                      Watch Now
                    </button>
                    <a
                      href={featuredPodcasts[0].youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      aria-label="Watch on YouTube"
                    >
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Episodes */}
        {featuredPodcasts.length > 1 && (
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPodcasts.slice(1, 3).map((podcast) => (
                <div
                  key={podcast.slug}
                  className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer group"
                  onClick={() => handlePodcastClick(podcast.slug)}
                >
                  <div className="p-4">
                    <YouTubeThumbnail
                      videoId={podcast.youtubeId}
                      title={podcast.title}
                      isShort={podcast.isShort}
                      className="mb-4"
                    />
                  </div>
                  
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        podcast.category === 'trailer' ? 'bg-red-100 text-red-800' :
                        podcast.category === 'episode' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {podcast.category === 'trailer' ? 'Trailer' : 
                         podcast.category === 'episode' ? `Ep. ${podcast.episodeNumber}` :
                         'Special'}
                      </span>
                      <span className="text-xs text-gray-500">{podcast.duration}</span>
                    </div>
                    
                    <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {podcast.title}
                    </h4>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {podcast.description}
                    </p>
                    
                    <p className="text-xs text-gray-500">{podcast.publishDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View All Episodes Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleViewAllClick}
            className="inline-flex items-center px-6 py-3 bg-apple-blue hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 shadow-md hover:shadow-lg"
          >
            <span>View All Episodes</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
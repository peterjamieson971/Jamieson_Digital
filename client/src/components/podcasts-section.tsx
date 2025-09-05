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
      className="section-fade py-24 bg-gradient-to-b from-white to-gray-50" 
      aria-labelledby="podcasts-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            id="podcasts-heading"
            className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-4"
          >
            Ctrl + AI Podcast
          </h2>
          <p className="text-xl text-apple-gray max-w-2xl mx-auto leading-relaxed">
            Where technology leadership meets artificial intelligence transformation. 
            Exploring the practical realities of implementing AI in enterprise environments.
          </p>
        </div>

        {/* Latest Episode */}
        {featuredPodcasts.length > 0 && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Video Thumbnail */}
                <div className="p-6 md:p-8">
                  <YouTubeThumbnail
                    videoId={featuredPodcasts[0].youtubeId}
                    title={featuredPodcasts[0].title}
                    isShort={featuredPodcasts[0].isShort}
                    className="w-full cursor-pointer"
                    onClick={() => handlePodcastClick(featuredPodcasts[0].slug)}
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-4">
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

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPodcasts[0].title}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {featuredPodcasts[0].description}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500">{featuredPodcasts[0].duration}</span>
                    <span className="text-sm text-gray-500">{featuredPodcasts[0].publishDate}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePodcastClick(featuredPodcasts[0].slug)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      Watch Now
                    </button>
                    <a
                      href={featuredPodcasts[0].youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
        <div className="text-center mt-16">
          <button
            onClick={handleViewAllClick}
            className="inline-flex items-center px-8 py-4 bg-apple-blue hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            <span>View All Episodes</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
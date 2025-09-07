import { featuredPodcasts } from '../data/podcasts';
import { useLocation } from 'wouter';
import { ArrowRight, Play } from 'lucide-react';

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
      className="py-12 md:py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 section-fade" 
      aria-labelledby="podcasts-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 
            id="podcasts-heading"
            className="text-3xl md:text-5xl font-bold text-apple-text tracking-tight mb-4"
          >
            Podcasts
          </h2>
          <p className="text-lg md:text-xl text-apple-gray max-w-2xl mx-auto leading-relaxed">
            Where technology leadership meets artificial intelligence transformation. 
            Exploring the practical realities of implementing AI in enterprise environments.
          </p>
        </div>

        {/* Podcast Grid - Match Articles Layout */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
          {featuredPodcasts.slice(0, 3).map((podcast, index) => (
            <div key={podcast.slug} className="group relative">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 p-6 md:p-8 h-full flex flex-col border border-gray-100/50">
                {/* Header */}
                <div className="text-center mb-6 md:mb-8">
                  {/* Video Thumbnail - Enhanced with better aspect ratio and size */}
                  <div className="relative w-32 md:w-36 h-24 md:h-28 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-300 overflow-hidden">
                    <img
                      src={podcast.thumbnailUrl && podcast.thumbnailUrl !== "/podcast-ep1-thumb.jpg" && podcast.thumbnailUrl !== "/podcast-trailer-thumb.jpg" && podcast.thumbnailUrl !== "/podcast-atm-thumb.jpg" 
                        ? podcast.thumbnailUrl 
                        : `https://img.youtube.com/vi/${podcast.youtubeId}/maxresdefault.jpg`}
                      alt={`${podcast.title} thumbnail`}
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        if (img.src.includes('maxresdefault')) {
                          img.src = `https://img.youtube.com/vi/${podcast.youtubeId}/hqdefault.jpg`;
                        } else if (img.src.includes('hqdefault')) {
                          img.src = `https://img.youtube.com/vi/${podcast.youtubeId}/mqdefault.jpg`;
                        } else if (img.src.includes('mqdefault')) {
                          // Final fallback - hide image and show gradient background with play button
                          img.style.display = 'none';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center">
                      <Play className="w-8 h-8 text-white drop-shadow-lg" fill="white" />
                    </div>
                    {podcast.isShort && (
                      <div className="absolute bottom-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium shadow-lg">
                        Short
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    {/* Category Badge - Match Article Styling */}
                    <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-3 border ${
                      podcast.category === 'trailer' ? 'bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-600 border-red-500/20' :
                      podcast.category === 'episode' ? 'bg-gradient-to-r from-apple-blue/10 to-blue-500/10 text-apple-blue border-apple-blue/20' :
                      'bg-gradient-to-r from-purple-500/10 to-purple-600/10 text-purple-600 border-purple-500/20'
                    }`}>
                      {podcast.category === 'trailer' ? 'Trailer' : 
                       podcast.category === 'episode' ? `Episode ${podcast.episodeNumber}` :
                       'Special'}
                    </span>
                    <div className="text-sm text-apple-gray font-medium">
                      {podcast.duration} • {podcast.publishDate}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-apple-text mb-4 tracking-tight leading-tight">
                    {podcast.title}
                  </h3>
                  <p className="text-apple-gray text-base leading-relaxed font-medium line-height-loose">
                    {podcast.description}
                  </p>
                </div>
                
                {/* Footer - Match Article Button Styling */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <button 
                    onClick={() => handlePodcastClick(podcast.slug)}
                    className="inline-flex items-center justify-center w-full text-apple-blue font-semibold hover:text-blue-700 transition-colors duration-200 group/link"
                  >
                    <span>Watch Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Episodes Button - Match Articles Button */}
        <div className="text-center mt-16">
          <button
            onClick={handleViewAllClick}
            className="inline-flex items-center px-8 py-4 bg-apple-blue hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            <span>View All Episodes</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
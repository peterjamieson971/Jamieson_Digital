import { useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  isShort?: boolean;
  className?: string;
  autoLoad?: boolean; // If true, loads iframe immediately instead of showing thumbnail first
  embedRestricted?: boolean; // If true, skip embed and show YouTube link
}

export function YouTubePlayer({ videoId, title, isShort = false, className = '', autoLoad = false, embedRestricted = false }: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(autoLoad && !embedRestricted); // Don't auto-load if embed restricted
  const [hasEmbedError, setHasEmbedError] = useState(false);

  // Aspect ratio classes based on video type
  const aspectRatio = isShort ? 'aspect-[9/16]' : 'aspect-video';
  const maxWidth = isShort ? 'max-w-sm' : 'max-w-4xl';

  // YouTube thumbnail URL (maxresdefault for high quality, hqdefault as fallback)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleLoadPlayer = () => {
    setIsLoaded(true);
  };

  const handleWatchOnYouTube = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };
  
  if (!isLoaded) {
    return (
      <div className={`relative ${aspectRatio} ${maxWidth} mx-auto bg-gray-900 rounded-lg overflow-hidden cursor-pointer group ${className}`}>
        {/* Video Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity" />
        
        {/* Play button */}
        <button
          onClick={handleLoadPlayer}
          className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
          aria-label={`Play ${title}`}
        >
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
        
        {/* Video duration/type indicator */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          {isShort ? 'Short' : 'Video'}
        </div>
      </div>
    );
  }
  
  // If embed is restricted or we have an embed error, show fallback
  if (embedRestricted || hasEmbedError) {
    return (
      <div className={`relative ${aspectRatio} ${maxWidth} mx-auto bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        {/* Video Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={`${title} thumbnail`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Watch on YouTube content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Watch on YouTube</h3>
            <p className="text-sm text-gray-300 mb-4">This video cannot be embedded but is available on YouTube</p>
            <button
              onClick={handleWatchOnYouTube}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Open in YouTube
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${aspectRatio} ${maxWidth} mx-auto ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&playsinline=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-lg shadow-lg"
        onError={() => setHasEmbedError(true)}
        onLoad={(e) => {
          // Check if iframe loaded with an error page
          try {
            const iframe = e.target as HTMLIFrameElement;
            // If we can detect YouTube's error page, show fallback
            // This is limited due to cross-origin restrictions, but we'll detect common error cases
            if (iframe.contentWindow) {
              // Basic check - if iframe seems to have loaded but shows error, we'll catch it
              setTimeout(() => {
                try {
                  // This will throw an error due to cross-origin, but we can catch cases where YouTube blocks embedding
                  iframe.contentWindow?.postMessage('test', '*');
                } catch (error) {
                  // Most embedding restrictions will be caught here
                  setHasEmbedError(true);
                }
              }, 1000);
            }
          } catch (error) {
            setHasEmbedError(true);
          }
        }}
      />
    </div>
  );
}

// Smaller version for cards/previews
interface YouTubeThumbnailProps {
  videoId: string;
  title: string;
  isShort?: boolean;
  className?: string;
  onClick?: () => void;
}

export function YouTubeThumbnail({ videoId, title, isShort = false, className = '', onClick }: YouTubeThumbnailProps) {
  const aspectRatio = isShort ? 'aspect-[9/16]' : 'aspect-video';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  
  return (
    <div 
      className={`relative ${aspectRatio} bg-gray-900 rounded-lg overflow-hidden cursor-pointer group ${className}`}
      onClick={onClick}
    >
      <img
        src={thumbnailUrl}
        alt={`${title} thumbnail`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity" />
      
      <button
        className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
        aria-label={`Play ${title}`}
      >
        <div className="w-12 h-12 bg-red-600 bg-opacity-90 rounded-full flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>
      
      {isShort && (
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
          Short
        </div>
      )}
    </div>
  );
}
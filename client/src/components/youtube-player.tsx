import { useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  isShort?: boolean;
  className?: string;
  autoLoad?: boolean; // If true, loads iframe immediately instead of showing thumbnail first
}

export function YouTubePlayer({ videoId, title, isShort = false, className = '', autoLoad = false }: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(autoLoad); // Start with iframe loaded if autoLoad is true
  
  // Aspect ratio classes based on video type
  const aspectRatio = isShort ? 'aspect-[9/16]' : 'aspect-video';
  const maxWidth = isShort ? 'max-w-sm' : 'max-w-4xl';
  
  // YouTube thumbnail URL (maxresdefault for high quality, hqdefault as fallback)
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  const handleLoadPlayer = () => {
    setIsLoaded(true);
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
  
  return (
    <div className={`${aspectRatio} ${maxWidth} mx-auto ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full rounded-lg shadow-lg"
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
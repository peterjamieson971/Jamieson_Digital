export interface Podcast {
  title: string;
  description: string;
  episodeNumber: number;
  youtubeId: string;
  youtubeUrl: string;
  isShort: boolean;
  thumbnailUrl: string;
  duration: string;
  publishDate: string;
  category: 'trailer' | 'episode' | 'special';
  guestName?: string;
  topics: string[];
  transcript?: string;
  searchKeywords?: string[];
  slug: string;
}

const podcastIcon = "/podcast-icon.png";

export const allPodcasts: Podcast[] = [
  {
    title: "Ctrl + AI: The Podcast - Official Trailer",
    description: "Introducing Ctrl + AI, where we explore the intersection of technology leadership and artificial intelligence transformation. Join Peter Jamieson as he dives deep into the practical realities of implementing AI in enterprise environments.",
    episodeNumber: 0,
    youtubeId: "z5xxKbEzxoI",
    youtubeUrl: "https://www.youtube.com/shorts/z5xxKbEzxoI",
    isShort: true,
    thumbnailUrl: "/podcast-trailer-thumb.jpg",
    duration: "0:59",
    publishDate: "September 2024",
    category: "trailer",
    topics: ["AI", "Technology Leadership", "Digital Transformation", "Enterprise AI", "CTO Insights"],
    searchKeywords: [
      "Ctrl AI",
      "Peter Jamieson",
      "AI Podcast",
      "Technology Podcast",
      "Digital Transformation",
      "Enterprise AI",
      "Technology Leadership",
      "CTO",
      "Artificial Intelligence",
      "AI Implementation",
      "Tech Leadership",
      "Innovation",
      "Strategic Technology"
    ],
    slug: "ctrl-ai-podcast-trailer",
    transcript: `Welcome to Ctrl + AI, the podcast where technology leadership meets artificial intelligence transformation. I'm Peter Jamieson, and I'll be your guide through the practical realities of implementing AI in enterprise environments. From strategic planning to tactical execution, we'll explore what it really takes to drive meaningful change in today's technology landscape. Coming soon.`
  }
];

// Get featured podcasts (first 3 for homepage)
export const featuredPodcasts = allPodcasts.slice(0, 3);

// Get podcasts by category
export const getPodcastsByCategory = (category: Podcast['category']) => {
  return allPodcasts.filter(podcast => podcast.category === category);
};

// Get podcast by slug
export const getPodcastBySlug = (slug: string) => {
  return allPodcasts.find(podcast => podcast.slug === slug);
};

// Get all categories
export const getAllPodcastCategories = () => {
  const categories = allPodcasts.map(podcast => podcast.category);
  return Array.from(new Set(categories));
};

// Search podcasts
export const searchPodcasts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  
  return allPodcasts.filter(podcast => {
    const titleMatch = podcast.title.toLowerCase().includes(lowercaseQuery);
    const descriptionMatch = podcast.description.toLowerCase().includes(lowercaseQuery);
    const topicsMatch = podcast.topics.some(topic => 
      topic.toLowerCase().includes(lowercaseQuery)
    );
    const keywordsMatch = podcast.searchKeywords?.some(keyword => 
      keyword.toLowerCase().includes(lowercaseQuery)
    );
    const guestMatch = podcast.guestName?.toLowerCase().includes(lowercaseQuery);
    const transcriptMatch = podcast.transcript?.toLowerCase().includes(lowercaseQuery);
    
    return titleMatch || descriptionMatch || topicsMatch || keywordsMatch || guestMatch || transcriptMatch;
  });
};
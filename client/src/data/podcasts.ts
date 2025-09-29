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
  releaseDate?: Date;
  embedRestricted?: boolean; // Flag for videos that cannot be embedded
}

const podcastIcon = "/podcast-icon.png";

export const allPodcasts: Podcast[] = [
  {
    title: "CIO's with Coffee",
    description: "In this episode of CIO's with Coffee we sit down with Dr Patrick Duffy, an ex-CEO of major infrastructure organizations such as Cardiff Airport and National Trust for Scotland. Patrick has used his years of senior leadership to move into cultural diagnostics and is now the Doctor of Culture.",
    episodeNumber: 1,
    youtubeId: "2Sp61Ypm7vk",
    youtubeUrl: "https://www.youtube.com/watch?v=2Sp61Ypm7vk",
    isShort: false,
    thumbnailUrl: `https://img.youtube.com/vi/2Sp61Ypm7vk/maxresdefault.jpg`,
    duration: "54:32",
    publishDate: "September 29, 2025",
    category: "episode",
    guestName: "Dr. Patrick Duffy",
    topics: ["Culture", "Behaviors", "Transformation", "Organizational Behaviors", "Growth Mindset", "Cultural Diagnostics", "Self-awareness", "Impact on Change"],
    searchKeywords: [
      "CIO's with Coffee",
      "Dr Patrick Duffy",
      "Culture",
      "Organizational behaviors",
      "Cultural diagnostics",
      "Self-awareness",
      "Impact on change",
      "Transformation",
      "Growth mindset",
      "Cardiff Airport",
      "National Trust Scotland",
      "Doctor of Culture",
      "Leadership",
      "Senior leadership",
      "Infrastructure organizations",
      "CEO experience",
      "Cultural transformation",
      "Behavioral change"
    ],
    slug: "cios-with-coffee-dr-patrick-duffy-culture",
    transcript: "In this episode of CIO's with Coffee, we explore organizational behaviors, cultural diagnostics, self-awareness, and the impact on change with Dr Patrick Duffy. Drawing from his experience as ex-CEO of major infrastructure organizations including Cardiff Airport and National Trust for Scotland, Patrick shares insights on cultural transformation and how senior leaders can drive meaningful organizational change through understanding behaviors and fostering a growth mindset.",
    embedRestricted: true
  },
  {
    title: "CTRL+ - Peter Jamieson on AI, Leadership & the Future of IT",
    description: "Discussing the power of AI, the impact of it on both business and people and how it can be a power for good, when used the right way. An in-depth conversation exploring AI leadership, digital transformation, and the future of technology in enterprise environments.",
    episodeNumber: 1,
    youtubeId: "BrHB-4TOC0s",
    youtubeUrl: "https://www.youtube.com/watch?v=BrHB-4TOC0s",
    isShort: false,
    thumbnailUrl: `https://img.youtube.com/vi/BrHB-4TOC0s/maxresdefault.jpg`,
    duration: "1:06:00",
    publishDate: "September 8, 2025",
    category: "special",
    guestName: "CTRL+ Podcast Michael Page Middle East Technology",
    topics: ["AI Leadership", "Digital Transformation", "IT Strategy", "Future of Work", "Technology Ethics", "Enterprise AI"],
    searchKeywords: [
      "CTRL+ Podcast",
      "Peter Jamieson",
      "AI Leadership",
      "Digital Transformation",
      "Future of IT",
      "Technology Leadership",
      "Enterprise AI",
      "Business AI",
      "AI Strategy",
      "Technology Interview",
      "CTO Insights",
      "AI Implementation",
      "Tech Leadership",
      "AI for good",
      "Responsible AI",
      "Michael Page Middle East"
    ],
    slug: "ctrl-plus-peter-jamieson-ai-leadership-future-it",
    transcript: "In this comprehensive interview with CTRL+ Podcast, Peter Jamieson discusses the transformative power of AI in business and society. The conversation explores how AI can be a force for good when implemented responsibly, covering topics including AI leadership strategies, digital transformation best practices, and the evolving landscape of IT in enterprise environments. Key themes include the human impact of AI adoption, ethical considerations in technology deployment, and practical approaches to leading successful AI initiatives.",
    embedRestricted: true
  },
  {
    title: "Ctrl + AI Ethics - When is AI not the solution?",
    description: "In this episode, we describe the importance of AI ethics and why you should be aware of them. AI is touching many parts of our everyday life, and ethical boundaries are critical for safe AI adoption.",
    episodeNumber: 1,
    youtubeId: "y7VhwbAOESM",
    youtubeUrl: "https://youtube.com/shorts/y7VhwbAOESM",
    isShort: true,
    thumbnailUrl: "/podcast-ep1-thumb.jpg",
    duration: "2:58",
    publishDate: "September 8, 2025",
    releaseDate: new Date("2025-09-08T12:00:00+04:00"),
    category: "episode",
    topics: ["AI Ethics", "Responsible AI", "Technology Ethics", "AI Safety", "AI Governance"],
    searchKeywords: [
      "AI ethics",
      "responsible AI",
      "AI safety",
      "ethical AI",
      "AI boundaries",
      "when not to use AI",
      "AI limitations",
      "AI governance",
      "Ctrl AI episode 1",
      "Peter Jamieson AI ethics",
      "AI not the solution",
      "ethical boundaries",
      "safe AI adoption"
    ],
    slug: "ctrl-ai-ethics-when-ai-not-solution",
    transcript: "In this episode, we explore the critical importance of AI ethics in our rapidly evolving technological landscape. We discuss when AI is not the solution and why ethical boundaries are essential for safe AI adoption in our daily lives."
  },
  {
    title: "Ctrl + AI: The Podcast - Official Trailer",
    description: "Introducing Ctrl + AI, where we explore the intersection of technology leadership and artificial intelligence transformation. Join Peter Jamieson as he dives deep into the practical realities of implementing AI in enterprise environments.",
    episodeNumber: 0,
    youtubeId: "z5xxKbEzxoI",
    youtubeUrl: "https://www.youtube.com/shorts/z5xxKbEzxoI",
    isShort: true,
    thumbnailUrl: "/podcast-trailer-thumb.jpg",
    duration: "0:59",
    publishDate: "September 5, 2025",
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
  },
  {
    title: "Technology Innovation in Travel: Arabian Travel Market Interview",
    description: "Peter Jamieson discusses technology transformation in the travel industry, exploring how digital innovation enhances guest experiences and creates new opportunities for tour and attraction providers. Recorded live from the Arabian Travel Market event in Dubai.",
    episodeNumber: 1,
    youtubeId: "dz9RIl0IviU",
    youtubeUrl: "https://www.youtube.com/watch?v=dz9RIl0IviU",
    isShort: false,
    thumbnailUrl: "/podcast-atm-thumb.jpg",
    duration: "8:42",
    publishDate: "May 15, 2021",
    category: "special",
    topics: ["Travel Technology", "Digital Transformation", "Guest Experience", "Tourism Innovation", "Travel Industry"],
    searchKeywords: [
      "Arabian Travel Market",
      "ATM Dubai",
      "Peter Jamieson",
      "Travel Technology",
      "Tourism Innovation",
      "Guest Experience",
      "Travel Industry",
      "Digital Transformation",
      "Tour Operators",
      "Attraction Providers",
      "Hospitality Technology",
      "Travel Tech",
      "Dubai Tourism",
      "Travel Interview"
    ],
    slug: "travel-technology-arabian-travel-market",
    transcript: "In this interview from the Arabian Travel Market in Dubai, we explore how technology is revolutionizing the travel industry, from enhancing guest experiences to creating new revenue opportunities for tour and attraction providers. Discussion covers digital innovation trends, technology adoption in hospitality, and the future of travel technology solutions."
  }
];

// Get visible podcasts based on release date
export const getVisiblePodcasts = () => {
  const now = new Date();
  return allPodcasts.filter(podcast => 
    !podcast.releaseDate || podcast.releaseDate <= now
  );
};

// Get featured podcasts (first 3 for homepage) - include all visible podcasts
export const featuredPodcasts = getVisiblePodcasts().slice(0, 3);

// Get podcasts by category
export const getPodcastsByCategory = (category: Podcast['category']) => {
  return getVisiblePodcasts().filter(podcast => podcast.category === category);
};

// Get podcast by slug
export const getPodcastBySlug = (slug: string) => {
  return getVisiblePodcasts().find(podcast => podcast.slug === slug);
};

// Get all categories
export const getAllPodcastCategories = () => {
  const categories = getVisiblePodcasts().map(podcast => podcast.category);
  return Array.from(new Set(categories));
};

// Search podcasts
export const searchPodcasts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  
  return getVisiblePodcasts().filter(podcast => {
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
export interface Article {
  title: string;
  description: string;
  icon: string;
  slug: string;
  readTime: string;
  category: string;
  publishDate?: string;
  author?: string;
  // Future Loom integration fields
  hasVideo?: boolean;
  loomVideoId?: string;
  videoThumbnail?: string;
  videoDuration?: string;
}

const seoIcon = "/seo-icon.png";
const transformationIcon = "/corporate-ai-icon.png";
const aiIcon = "/vertical-ai-icon.png";
const businessIcon = "/business-icon.png";
const leadershipIcon = "/leadership-icon.png";

export const allArticles: Article[] = [
  {
    title: "The End of Googling: How AI Search is Redefining Business Discovery",
    description: "Exploring how ChatGPT, Perplexity, and other AI search engines are transforming business discovery and what companies need to do to stay visible in the age of conversational search.",
    icon: seoIcon,
    slug: "seo-strategy-modern-businesses",
    readTime: "12 min read",
    category: "Digital Marketing",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
  {
    title: "The Corporate AI Mandate: When \"Optional\" Becomes \"Essential\"",
    description: "Examining how companies like Duolingo are mandating AI use, the employee backlash, and what this means for the future of work and corporate strategy.",
    icon: transformationIcon,
    slug: "digital-transformation-roadmap",
    readTime: "10 min read",
    category: "Strategy",
    publishDate: "July 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
  {
    title: "Beyond Chatbots: How Vertical AI is Creating Billion-Dollar Companies",
    description: "Why specialized AI companies like Harvey AI and PathAI are achieving higher valuations than horizontal platforms, and what this means for the future of AI business models.",
    icon: aiIcon,
    slug: "ai-integration-enterprise",
    readTime: "11 min read",
    category: "Technology",
    publishDate: "July 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
  // Additional articles for the full listing page
  {
    title: "Digital Leadership in the Age of AI: A CIO's Perspective",
    description: "How technology leaders can navigate the complexities of AI adoption while maintaining human-centered innovation and driving organizational transformation.",
    icon: leadershipIcon,
    slug: "digital-leadership-ai-era",
    readTime: "15 min read",
    category: "Leadership",
    publishDate: "June 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
  {
    title: "Building Resilient Enterprise Architecture for the Cloud-First Era",
    description: "Strategies for creating scalable, secure, and adaptable technology infrastructures that can evolve with business needs and emerging technologies.",
    icon: businessIcon,
    slug: "enterprise-architecture-cloud",
    readTime: "14 min read",
    category: "Architecture",
    publishDate: "June 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
  {
    title: "The Future of Work: How AI is Reshaping Professional Services",
    description: "An analysis of how artificial intelligence is transforming professional services industries, from law and consulting to finance and healthcare.",
    icon: transformationIcon,
    slug: "ai-professional-services",
    readTime: "13 min read",
    category: "Future of Work",
    publishDate: "May 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
];

// Featured articles for homepage (first 3)
export const featuredArticles: Article[] = allArticles.slice(0, 3);
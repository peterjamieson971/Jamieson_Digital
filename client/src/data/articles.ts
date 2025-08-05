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
const mcpIcon = "/vertical-ai-icon.png";

export const allArticles: Article[] = [
  {
    title: "Building the Future: My Real-World Experience with MCPs and Autonomous Development",
    description: "How Model Context Protocol is transforming app development from concept to deployment, enabling truly autonomous development workflows with Claude Code.",
    icon: mcpIcon,
    slug: "mcp-autonomous-development-experience",
    readTime: "15 min read",
    category: "Technology",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
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
    publishDate: "August 2025",
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
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
  // Additional articles for the full listing page
  {
    title: "Mastering AI Communication: The Top 5 Skills Every Tech Professional Needs by 2030",
    description: "From context engineering to adaptive communication, explore the essential skills that will separate successful tech professionals from those left behind in the AI revolution.",
    icon: leadershipIcon,
    slug: "top-5-ai-skills-2030",
    readTime: "16 min read",
    category: "Leadership",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
  {
    title: "Beyond the Hype: A Strategic Guide to Communicating AI Value to Skeptical Boards",
    description: "How to transform board skepticism into strategic AI investment through evidence-based communication, realistic KPIs, and the proven PROVE framework for executive success.",
    icon: businessIcon,
    slug: "ai-board-communication-guide",
    readTime: "20 min read",
    category: "Strategy",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
  {
    title: "The Consumer Code AI Revolution: How Loveable and Replit Are Reshaping the Freelancer Developer Market",
    description: "Exploring how consumer-focused AI code generation platforms like Loveable and Replit are transforming the freelance development landscape, creating new opportunities while disrupting traditional development approaches.",
    icon: transformationIcon,
    slug: "consumer-code-ai-revolution",
    readTime: "18 min read",
    category: "Future of Work",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
  },
];

// Featured articles for homepage (first 3)
export const featuredArticles: Article[] = allArticles.slice(0, 3);
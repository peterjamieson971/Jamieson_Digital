export interface Article {
  title: string;
  description: string;
  icon: string;
  slug: string;
  readTime: string;
  category: string;
  publishDate?: string;
  author?: string;
  // Enhanced search fields
  searchKeywords?: string[];
  contentExcerpt?: string;
  // Future Loom integration fields
  hasVideo?: boolean;
  loomVideoId?: string;
  videoThumbnail?: string;
  videoDuration?: string;
  // Download fields
  hasDownload?: boolean;
  downloadUrl?: string;
  downloadTitle?: string;
  downloadSize?: string;
}

const seoIcon = "/seo-icon.webp";
const transformationIcon = "/corporate-ai-icon.webp";
const aiIcon = "/vertical-ai-icon.webp";
const businessIcon = "/business-icon.webp";
const leadershipIcon = "/leadership-icon.webp";
const mcpIcon = "/vertical-ai-icon.webp";

export const allArticles: Article[] = [
  {
    title: "The Revolutionary Power of AI Support Teams: Transforming Social Media Marketing with n8n and Arcads.ai",
    description: "Discover how brands are leveraging AI-powered virtual workforces to reduce manual content creation by 80%, increase production volume by 5-10x, and achieve 30-40% better engagement rates. This comprehensive guide reveals the revolutionary combination of n8n workflow automation and Arcads.ai video generation that's transforming social media marketing.",
    icon: aiIcon,
    slug: "ai-social-media-marketing-revolution",
    readTime: "25 min read",
    category: "Digital Marketing",
    publishDate: "September 2025",
    author: "Peter Jamieson",
    hasVideo: false,
    hasDownload: true,
    downloadUrl: "/downloads/virtual-workforce-setup-guide.pdf",
    downloadTitle: "Building Your First Virtual Workforce - Complete Setup Guide",
    downloadSize: "PDF • 442KB • 12 pages",
    searchKeywords: [
      "AI support teams", "virtual workforce", "social media marketing", "n8n", "Arcads.ai",
      "workflow automation", "AI video generation", "content creation", "marketing automation",
      "AI-powered marketing", "social media automation", "content scaling", "UGC content",
      "AI avatars", "video marketing", "digital marketing", "marketing efficiency",
      "content production", "social media strategy", "AI tools", "marketing technology",
      "automation workflow", "AI marketing tools", "content optimization",
      "brand automation", "social media ROI", "marketing productivity",
      "AI content creation", "video automation", "social media management",
      "artificial intelligence marketing", "automated content", "marketing workflows",
      "AI video ads", "social media AI", "content marketing automation",
      "AI-generated content", "marketing AI revolution", "automated social media",
      "AI marketing strategy", "content automation tools", "AI marketing platform"
    ],
    contentExcerpt: "Revolutionary guide to building AI-powered virtual workforces for social media marketing using n8n and Arcads.ai. Learn how leading brands reduce manual work by 80% while achieving 5-10x content volume increases and 30-40% engagement improvements. Includes real case studies, implementation strategies, and a complete 12-page setup guide covering workflow automation, AI video generation, and cost-effective scaling techniques for modern marketing teams."
  },
  {
    title: "The IT Budget Reality Check: A Practitioner's Guide to Financial Survival",
    description: "From shadow IT consuming 40% of budgets to SaaS inflation at 12% annually—discover proven frameworks and tools for taking back control of IT spending and transforming chaos into strategic advantage.",
    icon: businessIcon,
    slug: "it-budget-reality-check",
    readTime: "22 min read",
    category: "Strategy",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
    searchKeywords: [
      "Shadow IT", "Technical debt", "SaaS inflation", "IT budget", "CFO", "CIO",
      "McKinsey", "Zylo", "Productiv", "Torii", "BetterCloud", "Apptio", "ServiceNow",
      "Flexera", "CloudHealth", "CloudCheckr", "Cloudability", "TBM", "FinOps",
      "OPEX", "CAPEX", "Total Cost of Ownership", "TCO", "IT financial management",
      "budget planning", "vendor management", "SaaS management", "cloud cost optimization",
      "IT governance", "cost allocation", "showback", "chargeback", "Adaptive Insights",
      "Anaplan", "Power BI", "budget crisis", "40 million stolen records", "Target", 
      "Equifax", "162 million", "30-50% shadow IT", "20% innovation budget",
      "8.7-12% SaaS inflation", "670 applications", "2100 applications", "90-day plan",
      "forensic accounting", "vendor escalation", "honeymoon pricing", "IT spending"
    ],
    contentExcerpt: "Practical guide addressing the reality that shadow IT now represents 30-50% of technology spending, technical debt consumes 20% of innovation budgets, and SaaS inflation runs at 8.7-12% annually. Provides a proven 90-day emergency plan, comprehensive tool recommendations including Zylo and Apptio, and frameworks for CFO partnership to transform IT budgets from chaos to strategic control."
  },
  {
    title: "The IT Strategy Question: A Practitioner's Guide to Creating Strategic Clarity",
    description: "From Fortune 500 boardrooms to mid-market IT directors, the same four questions keep surfacing. This comprehensive guide provides proven frameworks and real-world approaches to building IT strategies that actually stick and deliver business value.",
    icon: businessIcon,
    slug: "it-strategy-practitioners-guide",
    readTime: "18 min read",
    category: "Strategy",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
    searchKeywords: [
      "McKinsey Strategy House", "TOGAF ADM", "Agile Strategy Canvas", "Gartner", "IBM",
      "Fortune 500", "CIO", "IT director", "business strategy", "enterprise architecture",
      "IT roadmap", "digital transformation", "strategic planning", "BCG", "Bain",
      "Architecture Development Method", "strategy framework", "business alignment",
      "technology strategy", "IT governance", "strategic initiatives", "ROI analysis",
      "strategy communication", "stakeholder management", "strategy validation",
      "ChatGPT", "Claude", "AI strategy", "strategy templates", "executive summary"
    ],
    contentExcerpt: "Comprehensive guide covering three proven IT strategy formats including McKinsey Strategy House used by Fortune 500 companies, TOGAF ADM for enterprise architecture, and Agile Strategy Canvas for rapid delivery. Based on extensive experience at Gartner and IBM, providing practical frameworks for CIOs and IT directors to build strategies that align with business goals and deliver measurable ROI."
  },
  {
    title: "The Hidden ROI Goldmine: Why Enterprise Architecture Isn't Just IT Bureaucracy",
    description: "Despite being dismissed as corporate overhead, enterprise architecture prevents million-dollar disasters and delivers measurable ROI through reduced downtime, faster projects, and strategic advantages.",
    icon: businessIcon,
    slug: "enterprise-architecture-roi-goldmine",
    readTime: "22 min read",
    category: "Strategy",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
    // Enhanced search fields - example implementation
    searchKeywords: [
      "Target breach", "HVAC vendor", "40 million card numbers", "162 million cost",
      "Equifax", "Apache Struts", "147 million Americans", "4 billion recovery fees",
      "British Airways", "power supply failure", "150 million costs",
      "network segmentation", "defense-in-depth", "zero-trust", "microsegmentation",
      "spaghetti architecture", "lateral movement", "system boundaries",
      "Ponemon Institute", "5600 per minute", "300000 per hour", "CHAOS Report",
      "project success rates", "Netflix microservices", "JPMorgan Chase",
      "data architecture", "security architecture", "cloud architecture",
      "auto-scaling", "managed services", "serverless computing"
    ],
    contentExcerpt: "Analyzing major security breaches like Target's 40 million stolen card numbers, Equifax's 147 million compromised records, and British Airways' power failure that cost £150 million. The article demonstrates how proper enterprise architecture with network segmentation, defense-in-depth strategies, and microservices design prevents disasters and delivers measurable ROI through reduced downtime costs."
  },
  {
    title: "GPT-5: What I've Learned About OpenAI's Game-Changing Release",
    description: "An honest analysis of GPT-5's unified intelligence, real business applications, and what this breakthrough means for companies ready to embrace AI transformation.",
    icon: aiIcon,
    slug: "gpt5-game-changing-release",
    readTime: "18 min read",
    category: "Technology",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    hasVideo: false,
    searchKeywords: [
      "OpenAI", "Sam Altman", "GPT-5", "unified intelligence", "artificial intelligence",
      "GPT-4o", "model switching", "reasoning capabilities", "multimodal intelligence",
      "chain-of-thought", "business AI", "enterprise AI", "language model",
      "AI transformation", "business applications", "enterprise adoption"
    ],
    contentExcerpt: "Deep analysis of OpenAI's GPT-5 release featuring unified intelligence capabilities, Sam Altman's strategic vision, and real business applications. Covers the evolution from GPT-4o, advanced reasoning with chain-of-thought processing, and what this breakthrough means for enterprise AI adoption and business transformation."
  },
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
    searchKeywords: [
      "Model Context Protocol", "MCP", "Claude Code", "Claude", "Anthropic",
      "autonomous development", "AI-assisted coding", "concept to deployment",
      "development workflows", "software engineering", "automation",
      "code generation", "testing", "deployment pipeline", "developer productivity",
      "Supabase", "AWS", "CloudFront", "real-time development"
    ],
    contentExcerpt: "Real-world experience building applications using Model Context Protocol (MCP) with Claude Code for autonomous development. Demonstrates concept-to-deployment workflows, AI-assisted coding capabilities, and integration with modern tools like Supabase and AWS for complete development automation."
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
    searchKeywords: [
      "ChatGPT", "Perplexity", "AI search", "Google search", "conversational search",
      "search engine optimization", "SEO", "business discovery", "AI overviews",
      "blue links", "search behavior", "digital marketing", "Claude", "Gemini",
      "search revolution", "content strategy", "multi-platform presence"
    ],
    contentExcerpt: "Comprehensive analysis of how AI search engines like ChatGPT and Perplexity are transforming business discovery, moving beyond traditional Google blue links to conversational search. Covers the impact on SEO strategy, digital marketing approaches, and what businesses need to do to maintain visibility in the AI-driven search landscape."
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
    searchKeywords: [
      "Duolingo", "corporate AI mandate", "mandatory AI use", "employee backlash",
      "workplace AI", "digital transformation", "corporate strategy", "AI adoption",
      "change management", "AI integration", "business process", "organizational change",
      "AI policy", "workforce transformation", "employee resistance", "AI implementation"
    ],
    contentExcerpt: "Examining Duolingo's controversial mandate requiring all employees to use AI tools, exploring the resulting employee backlash and resistance. Analyzes what mandatory AI adoption means for corporate strategy, change management, and the future of workplace technology integration."
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
    searchKeywords: [
      "Vertical AI", "Harvey AI", "PathAI", "Hebbia", "Glean", "specialized AI",
      "billion-dollar companies", "higher valuations", "horizontal platforms",
      "ChatGPT", "Claude", "GPT-4", "industry-specific AI", "legal AI", "medical AI",
      "enterprise AI", "AI business models", "domain expertise", "vertical solutions",
      "1.5 billion valuation", "4.6 billion valuation", "700 million valuation"
    ],
    contentExcerpt: "Analysis of specialized AI companies like Harvey AI (legal), PathAI (medical), Hebbia and Glean achieving billion-dollar valuations by focusing on vertical solutions rather than horizontal platforms like ChatGPT and Claude. Explores why industry-specific AI delivers higher value and better business outcomes."
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
    searchKeywords: [
      "prompt engineering", "context engineering", "AI communication", "adaptive communication",
      "tech professionals", "AI skills", "career development", "AI literacy", "AI revolution",
      "professional skills", "workforce transformation", "skill requirements", "future of work",
      "AI competencies", "technical skills", "communication skills", "professional development",
      "AI training", "skill building", "career advancement"
    ],
    contentExcerpt: "Comprehensive guide to the essential AI communication skills tech professionals need by 2030, including prompt engineering, context engineering, and adaptive communication strategies. Covers career development pathways and skill-building approaches for thriving in the AI-driven workplace transformation."
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
    searchKeywords: [
      "board communication", "AI strategy", "executive", "KPIs", "PROVE framework", "board skepticism",
      "AI investment", "business case", "stakeholder management", "ROI measurement", "AI governance",
      "strategic AI", "board meetings", "AI presentations", "executive leadership", "AI adoption",
      "organizational AI", "AI metrics", "performance indicators", "board relations", "AI ROI"
    ],
    contentExcerpt: "Strategic framework for communicating AI value to skeptical corporate boards, featuring the proven PROVE methodology for executive success. Covers evidence-based communication approaches, realistic KPI development, and techniques for transforming board skepticism into strategic AI investment."
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
    searchKeywords: [
      "Loveable", "Replit", "freelancer market", "developer market", "AI code generation", "no-code",
      "consumer AI", "development platforms", "freelance development", "AI tools", "code automation",
      "developer productivity", "low-code", "visual development", "citizen developers", "democratization",
      "coding platforms", "AI-powered development", "development tools", "software development"
    ],
    contentExcerpt: "Analysis of how consumer-focused AI code generation platforms like Loveable and Replit are transforming the freelance development market. Explores the democratization of coding through no-code/low-code solutions and the impact on traditional developer workflows and freelancer opportunities."
  },
];

// Featured articles for homepage (first 3)
export const featuredArticles: Article[] = allArticles.slice(0, 3);
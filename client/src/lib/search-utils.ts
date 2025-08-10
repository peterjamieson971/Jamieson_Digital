import { allArticles, type Article } from "@/data/articles";

// Import the articles content from article.tsx
const articlesContent: Record<string, { content: string }> = {};

// This will be populated with article content dynamically
// For now, we'll create a function that searches available content
const getArticleContent = (slug: string): string => {
  // This is a simplified approach - in a real app, you might want to
  // store content in the articles data or fetch it dynamically
  
  // Comprehensive content keywords extracted from your articles for enhanced search
  const contentKeywords: Record<string, string[]> = {
    "enterprise-architecture-roi-goldmine": [
      // Case studies
      "target", "equifax", "british airways", "security breach", "hvac vendor", "40 million card numbers", 
      "162 million", "apache struts", "147 million americans", "4 billion", "power supply failure", 
      "150 million costs",
      
      // Architecture concepts
      "network segmentation", "defense-in-depth", "microsegmentation", "zero-trust", "identity-centered access",
      "spaghetti architecture", "system boundaries", "operational domain", "lateral movement",
      
      // Business benefits
      "ponemon institute", "chaos report", "5600 per minute", "300000 per hour", "project success rates",
      "faster project timelines", "enhanced success", "compliance advantages", "risk mitigation",
      "cost optimization", "innovation enablement", "competitive advantage",
      
      // Technical domains
      "data architecture", "security architecture", "cloud architecture", "microservices architecture",
      "auto-scaling", "managed services", "serverless computing", "api specifications", "code libraries",
      
      // Organizations
      "netflix", "jpmorgan chase", "amazon", "gartner", "mckinsey", "standish group"
    ],
    
    "gpt5-game-changing-release": [
      "openai", "sam altman", "unified intelligence", "magic unified intelligence", "model-switching madness",
      "reasoning capabilities", "o-series", "chain-of-thought processing", "multimodal intelligence",
      "gpt-5-mini", "gpt-5-web", "gpt-5-vision", "strategic planning", "legal documents", "nuance",
      "gpt-4o", "model picker", "artificial intelligence", "language model", "ai transformation",
      "multimodal", "image analysis", "audio processing", "business ai", "enterprise ai",
      "axios", "botpress", "toms guide", "techradar", "bacs", "rubyroid labs", "financial content",
      "opentools ai", "techtarget", "chi software", "business applications", "enterprise adoption"
    ],
    
    "mcp-autonomous-development-experience": [
      "model context protocol", "autonomous development", "claude code", "claude", "concept to deployment", 
      "development workflows", "anthropic", "ai agent", "code generation", "testing", "deployment",
      "developer productivity", "software engineering", "automation", "ai-assisted coding",
      "supabase", "aws", "cloudfront", "s3", "database optimization", "real-time development",
      "infrastructure provisioning", "cdn configuration", "ssl setup", "deployment pipeline"
    ],
    
    "seo-strategy-modern-businesses": [
      "ai search", "chatgpt", "perplexity", "google search", "conversational search", "blue links",
      "ai overviews", "search revolution", "3.7 billion visits", "80 million visits", "780 million queries",
      "googling", "asking", "search engine optimization", "ai mode", "gemini", "claude", 
      "business discovery", "digital marketing", "search behavior", "organic search", "seo apocalypse",
      "prompt engineering", "content strategy", "authoritative content", "multi-platform presence",
      "youtube", "reddit", "forbes", "wikipedia", "tiktok", "linkedin", "x", "bluesky"
    ],
    
    "digital-transformation-roadmap": [
      "corporate ai mandate", "duolingo", "employee backlash", "mandatory ai use", "workplace ai",
      "digital transformation", "corporate strategy", "automation", "employee adoption",
      "change management", "ai integration", "business process", "organizational change"
    ],
    
    "ai-integration-enterprise": [
      "vertical ai", "harvey ai", "pathAI", "specialized ai", "horizontal platforms", "billion-dollar companies",
      "higher valuations", "industry-specific", "legal ai", "medical ai", "enterprise ai",
      "business models", "ai platforms", "domain expertise", "vertical solutions",
      "chatgpt", "claude", "gpt-4", "hebbia", "glean", "1.5 billion valuation", "4.6 billion valuation",
      "255 million funding", "700 million valuation", "financial services", "consulting firms",
      "document analysis", "pathology", "medical diagnosis", "legal workflows"
    ],
    
    "top-5-ai-skills-2030": [
      "prompt engineering", "context engineering", "ai communication", "adaptive communication",
      "tech professionals", "ai skills", "career development", "ai literacy", "ai revolution",
      "professional skills", "workforce transformation", "skill requirements", "future of work",
      "ai competencies", "technical skills", "communication skills"
    ],
    
    "ai-board-communication-guide": [
      "board communication", "ai strategy", "executive", "kpis", "prove framework", "board skepticism",
      "ai investment", "business case", "stakeholder management", "roi measurement", "ai governance",
      "strategic ai", "board meetings", "ai presentations", "executive leadership", "ai adoption",
      "organizational ai", "ai metrics", "performance indicators"
    ],
    
    "consumer-code-ai-revolution": [
      "loveable", "replit", "freelancer market", "developer market", "ai code generation", "no-code",
      "consumer ai", "development platforms", "freelance development", "ai tools", "code automation",
      "developer productivity", "low-code", "visual development", "citizen developers", "democratization"
    ]
  };

  return contentKeywords[slug]?.join(" ") || "";
};

export const searchArticles = (searchTerm: string): Article[] => {
  if (!searchTerm.trim()) return allArticles;
  
  const term = searchTerm.toLowerCase().trim();
  
  return allArticles.filter((article) => {
    // Standard field searches (always checked for all articles)
    const titleMatch = article.title.toLowerCase().includes(term);
    const descriptionMatch = article.description.toLowerCase().includes(term);
    const categoryMatch = article.category.toLowerCase().includes(term);
    const authorMatch = article.author?.toLowerCase().includes(term);
    
    // Enhanced search fields (when available)
    let enhancedKeywordsMatch = false;
    let enhancedExcerptMatch = false;
    
    if (article.searchKeywords) {
      enhancedKeywordsMatch = article.searchKeywords.some(keyword => 
        keyword.toLowerCase().includes(term)
      );
    }
    
    if (article.contentExcerpt) {
      enhancedExcerptMatch = article.contentExcerpt.toLowerCase().includes(term);
    }
    
    // Legacy keyword search (always checked as additional content search)
    const legacyKeywords = getArticleContent(article.slug).toLowerCase();
    const legacyContentMatch = legacyKeywords.includes(term);
    
    return titleMatch || descriptionMatch || categoryMatch || authorMatch || 
           enhancedKeywordsMatch || enhancedExcerptMatch || legacyContentMatch;
  });
};

// Helper function to extract text content from HTML string
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
};
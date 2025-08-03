import { useRoute } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

interface ArticleData {
  title: string;
  content: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
}

const articles: Record<string, ArticleData> = {
  "seo-strategy-modern-businesses": {
    title: "The End of Googling: How AI Search is Redefining Business Discovery",
    category: "Digital Marketing",
    readTime: "12 min read",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    content: `
      <div class="prose prose-lg max-w-none">
        <h2>The Search Revolution is Here—And It's Not What You Think</h2>
        <p>Remember the last time you asked a question and had to click through seven different websites to find a decent answer? That frustration is becoming a relic of the past. We're witnessing the end of an era—not just the end of traditional search, but the fundamental transformation of how humans discover information.</p>
        
        <p>ChatGPT now sees over 3.7 billion visits a month, hitting a record-breaking 80 million visits in a single day. Perplexity processed 780 million queries in May 2025 alone, experiencing more than 20% month-over-month growth. These aren't just impressive numbers—they represent a seismic shift in human behavior that's about to reshape every business strategy on the planet.</p>
        
        <p>The era of "Googling" is giving way to the age of "asking"—and if your business isn't prepared for this transition, you're about to become invisible to an entirely new generation of searchers.</p>
        
        <h2>From Blue Links to Direct Answers: The Great Unbundling</h2>
        <p>For over two decades, Google's formula was simple: show you ten blue links and let you figure out the rest. This created an entire industry—SEO—built around the art and science of ranking #1 in those links. But Google's own AI Mode presents a "re-imagining of Search" that eliminates the traditional 10 blue links entirely.</p>
        
        <p>The shift is profound. Instead of navigating to multiple websites, users now get comprehensive, cited answers in a single interface. AI search visitors convert 4.4 times better than traditional organic search visitors because they arrive at websites already equipped with the information they need to make decisions.</p>
        
        <p>This isn't just a minor interface update—it's the complete restructuring of how information flows from businesses to consumers. 65% of users now cite Perplexity as their preferred search engine, with 82% saying its interface is cleaner and easier to use than Google or Bing.</p>
        
        <h2>The New Search Landscape: Beyond Google</h2>
        <p>While Google scrambles to integrate AI features, an entirely new ecosystem of search experiences is emerging:</p>
        
        <p><strong>ChatGPT as Search Engine</strong>: People aren't replacing Google entirely—they're replacing Google for specific types of queries, particularly top-of-funnel informational searches. When someone wants to understand a complex topic, compare options, or learn something new, they're increasingly turning to conversational AI.</p>
        
        <p><strong>Perplexity's Rise</strong>: Valued at $18 billion and processing 30 million queries daily, Perplexity has positioned itself as the "answer engine" that provides cited, real-time responses. Unlike ChatGPT's training data cutoffs, Perplexity searches the live web and provides sources—making it increasingly attractive for current information.</p>
        
        <p><strong>Claude's Professional Focus</strong>: Anthropic's Claude has carved out a niche among professionals and researchers who need thoughtful, well-reasoned responses. Its strength in analysis and writing makes it particularly valuable for business applications.</p>
        
        <p><strong>Gemini's Integration</strong>: Google's own Gemini is being integrated across its ecosystem, representing the company's bet on conversational search within its existing products.</p>
        
        <h2>The SEO Apocalypse? Not Exactly.</h2>
        <p>Here's where most analysis gets it wrong. Traditional SEO isn't dying—it's evolving into something much more complex and, frankly, more interesting.</p>
        
        <p>Current AI search still drives less than 1% of traffic to most sites, with Google Search remaining the dominant traffic source. But the trends are unmistakable: digital marketing and SEO-related topics may start driving more visitors from AI search than traditional search by early 2028.</p>
        
        <p>The key insight is that when ChatGPT search cites webpages, the pages it cites rank in traditional organic search positions 21+ almost 90% of the time. This means AI systems aren't just rewarding the same pages that rank #1 in Google—they're drawing from a much broader pool of content.</p>
        
        <h2>What This Means for Business Discovery</h2>
        <p>The implications for how businesses get discovered are staggering:</p>
        
        <p><strong>Citation Over Clicks</strong>: Citation frequency in AI responses becomes a key indicator, measured by regularly testing your expertise topics on ChatGPT, Claude, and Perplexity. Getting mentioned is becoming as important as getting clicked.</p>
        
        <p><strong>Authority Over Rankings</strong>: Thematic authority is now measured by the ability to be cited as an expertise source, with mentions in specialized publications and sector reports strengthening credibility in the eyes of AI algorithms.</p>
        
        <p><strong>Quality Over Quantity</strong>: Expert content that never appears in AI responses signals a visibility or credibility problem. The bar for quality is higher because AI systems can access and compare vast amounts of content instantly.</p>
        
        <p><strong>Platform Diversification</strong>: Different LLMs cite different sources most frequently—OpenAI cites Wikipedia most often, Perplexity frequently cites Reddit and YouTube, Google's AI Overviews cite YouTube, and Microsoft Copilot cites Forbes and Gartner.</p>
        
        <h2>The Three Pillars of AI Search Optimization</h2>
        <p>Smart businesses are already adapting by focusing on three key areas:</p>
        
        <h3>1. Expertise and Authority</h3>
        <p>AI systems prioritize content that demonstrates deep expertise and clear authority. This means:</p>
        <ul>
          <li>Creating comprehensive, well-researched content that covers topics in depth</li>
          <li>Building relationships with authoritative publications and industry sources</li>
          <li>Developing proprietary research and data that becomes citable</li>
          <li>Establishing thought leadership through consistent, high-quality output</li>
        </ul>
        
        <h3>2. Multi-Platform Presence</h3>
        <p>Search has become cross-platform, with users starting their searches across social platforms like TikTok, LinkedIn, YouTube, X and Bluesky. Successful businesses are:</p>
        <ul>
          <li>Creating content optimized for multiple AI platforms simultaneously</li>
          <li>Building presence across the platforms most frequently cited by different AI systems</li>
          <li>Developing content strategies that work across both traditional search and AI responses</li>
        </ul>
        
        <h3>3. Transparency and Credibility</h3>
        <p>AI systems value transparent, well-sourced information. This requires:</p>
        <ul>
          <li>Clear attribution and sourcing in all content</li>
          <li>Transparent methodologies and data collection processes</li>
          <li>Building digital credentials that AI systems can easily identify and trust</li>
          <li>Creating content that other authoritative sources want to cite and reference</li>
        </ul>
        
        <h2>The Business Impact: Winners and Losers</h2>
        <p>This transformation is creating clear winners and losers:</p>
        
        <p><strong>Winners</strong>: Businesses that create authoritative, well-sourced content and build genuine expertise. Companies that adapt their discovery strategies to multiple AI platforms. Organizations that focus on being helpful rather than just ranking well.</p>
        
        <p><strong>Losers</strong>: Businesses that relied primarily on gaming traditional SEO. Companies that created thin, derivative content. Organizations that built their discovery strategy around a single platform or ranking factor.</p>
        
        <p><strong>The Surprising Middle Ground</strong>: Sites dealing with easily commoditized information (general news, basic definitions) are more vulnerable, while sites providing documented expertise, clear methodologies, and concrete examples become indispensable partners in the AI ecosystem.</p>
        
        <h2>Preparing for the Post-Google Future</h2>
        <p>The most forward-thinking businesses are taking a three-pronged approach:</p>
        
        <p><strong>Immediate Actions</strong>:</p>
        <ul>
          <li>Audit current content for AI citation potential by testing key topics across ChatGPT, Claude, and Perplexity</li>
          <li>Identify and strengthen relationships with authoritative sources in your industry</li>
          <li>Begin creating more comprehensive, well-sourced content that demonstrates expertise</li>
        </ul>
        
        <p><strong>Medium-term Strategy</strong>:</p>
        <ul>
          <li>Develop content strategies optimized for both traditional search and AI responses</li>
          <li>Build presence across multiple platforms where your audience might discover information</li>
          <li>Create proprietary research and data that becomes inherently citable</li>
        </ul>
        
        <p><strong>Long-term Positioning</strong>:</p>
        <ul>
          <li>Establish your business as the definitive authority in your niche</li>
          <li>Build partnerships with other authoritative sources and platforms</li>
          <li>Develop direct relationships with your audience that don't depend on any single discovery mechanism</li>
        </ul>
        
        <h2>The Paradox of AI Search</h2>
        <p>Here's the fascinating paradox: as AI search becomes more sophisticated, the value of genuinely authoritative, expert content increases dramatically. AI systems need high-quality sources to provide accurate answers, creating opportunities for businesses that invest in real expertise and authority.</p>
        
        <p>Google actively collates content from various websites and summarizes it using Gemini, with guidelines emphasizing creating "content that fulfills people's needs" and "unique, non-commodity content that visitors from Search will find helpful and satisfying".</p>
        
        <p>This isn't about gaming new algorithms—it's about becoming genuinely useful and authoritative in ways that both humans and AI systems recognize and value.</p>
        
        <h2>The Road Ahead</h2>
        <p>We're still in the early stages of this transformation. AI search engagement is expected to increase as the technology becomes more familiar and accessible, and the shift is from search engine optimization to search everywhere optimization—or OmniSEO.</p>
        
        <p>The businesses that thrive in this new era won't be those that master the latest AI search tactics, but those that genuinely solve problems, create valuable content, and build real authority in their fields. The age of shortcuts is ending; the age of authentic expertise is beginning.</p>
        
        <p>The question isn't whether this transformation will happen—it's already underway. The question is whether your business will be part of the conversation when millions of people ask AI systems about your industry, your products, or your services.</p>
        
        <p>The era of Googling is ending. The era of asking has begun. And in this new world, being found isn't about ranking #1—it's about being the answer that matters.</p>
        
        <blockquote>
          <em>The search revolution is here. The only question is: will you be part of it?</em>
        </blockquote>
      </div>
    `
  },
  "digital-transformation-roadmap": {
    title: "The Corporate AI Mandate: When \"Optional\" Becomes \"Essential\"",
    category: "Strategy",
    readTime: "10 min read",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    content: `
      <div class="prose prose-lg max-w-none">
        <h2>The New Reality: AI is No Longer a Choice</h2>
        <p>The memo that landed in every Duolingo employee's inbox on April 28th was unambiguous: artificial intelligence was now a company priority. Contractors would be phased out if AI could handle their work. New hires would only be approved if teams could prove the work couldn't be automated. AI proficiency would become part of performance reviews.</p>
        
        <p>The backlash was immediate and brutal. "AI first means people last," wrote one critic. Social media erupted with threats to cancel subscriptions and accusations of corporate callousness. But here's what the outrage missed: Duolingo wasn't announcing a new trend—it was simply saying out loud what dozens of companies are quietly implementing across the corporate world.</p>
        
        <p>Welcome to the era of mandatory AI productivity.</p>
        
        <h2>The Numbers Tell the Story</h2>
        <p>The shift is already underway, whether companies announce it or not. According to recent research, 75% of knowledge workers now use AI at work, with 46% having started in just the last six months. More telling: 78% of AI users are bringing their own tools to work without official approval, creating what experts call "shadow AI" adoption.</p>
        
        <p>But 2025 marks a turning point. Companies are moving from tolerating grassroots AI adoption to actively mandating it. Yahoo Japan represents the most aggressive example, requiring all 11,000 employees to use generative AI tools daily with a company-wide goal of doubling productivity by 2030. The policy includes mandatory AI training and usage tracking—making AI proficiency as essential as email literacy once was.</p>
        
        <p>The data shows why executives are pushing this transition. Workers using generative AI report saving 5.4% of their work hours weekly, translating to a 1.1% productivity increase for entire workforces. At scale, these numbers represent billions in potential cost savings and competitive advantage.</p>
        
        <h2>The Executive Imperative: Adapt or Fall Behind</h2>
        <p>For corporate leaders, the math is compelling. Among executives surveyed, 96% expect AI tools to increase their company's overall productivity levels. Nearly 40% of companies now require employees to use AI tools, with an additional 46% encouraging their use. The writing is on the wall: AI integration has moved from experimental to essential.</p>
        
        <p>Box CEO Aaron Levie captured the sentiment perfectly: "In engineering, we're probably in the final generation where you can go into a company with no AI coding expertise." At his company, AI isn't just encouraged—it's becoming a baseline expectation for competitive employment.</p>
        
        <p>This urgency stems from competitive pressure. As one executive put it, 79% of leaders agree their company needs to adopt AI to stay competitive, but 60% worry their organization lacks a clear implementation plan. The result? Companies are mandating AI use first and figuring out strategy second.</p>
        
        <h2>The Great Divide: Leadership Vision vs. Employee Reality</h2>
        <p>Here's where the corporate AI mandate hits a wall: the gap between executive expectations and employee experience. While leaders trumpet productivity gains, the reality on the ground is more complex.</p>
        
        <p>Nearly half (47%) of employees using AI say they have no idea how to achieve the productivity gains their employers expect. More surprisingly, 77% report that AI tools have actually decreased their productivity and added to their workload. This contradiction reveals a fundamental problem: companies are mandating AI use without providing adequate training or clear use cases.</p>
        
        <p>The human cost is significant. Thirty percent of employees who use AI tools worry their job may be cut, while 27% experience "AI-fueled imposter syndrome"—anxiety about whether their contributions are genuinely their own. Most tellingly, 32% of employees using AI keep it secret from their employers, either because they enjoy the "secret advantage" or fear job security implications.</p>
        
        <h2>The Backlash: When \"AI-First\" Meets Human-First Expectations</h2>
        <p>Duolingo's experience illustrates the delicate balance companies must strike. CEO Luis von Ahn's initial memo triggered such intense criticism that he was forced to clarify his position three weeks later, emphasizing that AI would "accelerate what we do" rather than replace employees. The damage was done, however—users threatened boycotts, social media erupted with criticism, and the company's carefully cultivated brand image took a significant hit.</p>
        
        <p>The pattern is repeating across corporate America. Klarna, after publicly celebrating its AI chatbot's success and implementing a hiring freeze, quietly began recruiting human workers again when the "lower quality" of AI interactions became apparent. Shopify faced similar criticism after internal memos suggested AI-driven productivity would replace new hires.</p>
        
        <h2>The Strategic Challenge: Implementation vs. Innovation</h2>
        <p>The corporate AI mandate reveals a deeper strategic challenge. Companies are caught between the need for competitive advantage and the reality of human organizational dynamics. The most successful implementations share common characteristics:</p>
        
        <p><strong>Clear Communication</strong>: Companies that frame AI as augmentation rather than replacement see better adoption rates and less resistance.</p>
        
        <p><strong>Training Investment</strong>: Only 39% of people using AI at work have received company training, creating a massive skills gap that undermines productivity goals.</p>
        
        <p><strong>Gradual Integration</strong>: Organizations that start with specific use cases—document creation, data analysis, customer service—see more sustainable adoption than those mandating broad AI use immediately.</p>
        
        <p><strong>Employee Agency</strong>: Workers want autonomy over how they integrate AI into their workflows rather than top-down mandates about specific tools or methods.</p>
        
        <h2>The Path Forward: Strategic AI Adoption</h2>
        <p>The most forward-thinking companies are taking a more nuanced approach. Rather than blanket mandates, they're identifying specific workflows where AI delivers clear value, providing comprehensive training, and giving employees agency over how they integrate these tools.</p>
        
        <p>Google, for instance, now gives software engineering candidates access to AI tools during interviews—not to replace human judgment, but to assess how effectively candidates can collaborate with AI. This approach recognizes that the future of work isn't about humans versus AI, but about humans working effectively with AI.</p>
        
        <h2>Conclusion: The Inevitable Transformation</h2>
        <p>The corporate AI mandate isn't a question of if, but when and how. Every company will eventually require some level of AI fluency from its workforce—the technology's competitive advantages are too significant to ignore. The question is whether organizations will learn from early adopters' mistakes or repeat them.</p>
        
        <p>For employees, the message is clear: AI literacy is becoming as fundamental as computer literacy was in the 1990s. Those who embrace this reality and develop AI collaboration skills will thrive; those who resist risk being left behind.</p>
        
        <p>For executives, the lesson is equally clear: mandating AI use without addressing employee concerns, providing adequate training, and maintaining human-centered values will likely backfire. The companies that succeed will be those that make AI adoption feel like empowerment rather than replacement.</p>
        
        <blockquote>
          <em>The transformation is inevitable. How companies navigate it will determine whether AI becomes a productivity superpower or a source of organizational disruption. The choice—and the consequences—remain firmly in human hands.</em>
        </blockquote>
      </div>
    `
  },
  "ai-integration-enterprise": {
    title: "Beyond Chatbots: How Vertical AI is Creating the Next Wave of Billion-Dollar Companies",
    category: "Technology",
    readTime: "11 min read",
    publishDate: "August 2025",
    author: "Peter Jamieson",
    content: `
      <div class="prose prose-lg max-w-none">
        <p>While the world fixates on ChatGPT and Claude, a quieter revolution is unfolding in law firms, hospitals, and laboratories. Specialized AI companies targeting specific industries are achieving growth rates and valuations that dwarf their horizontal counterparts, creating what experts are calling the "vertical AI gold rush."</p>
        
        <p>The numbers tell a compelling story. Harvey AI, focused exclusively on legal workflows, reached a $1.5 billion valuation in just two years. Glean, building enterprise search for knowledge workers, commands a $4.6 billion valuation. Meanwhile, PathAI, applying artificial intelligence to pathology, has attracted over $255 million in funding from investors betting on AI's potential to transform medical diagnosis.</p>
        
        <p>These aren't isolated success stories. They represent a fundamental shift in how AI value is being created and captured in the economy.</p>
        
        <h2>The Vertical Advantage: Why Specialization Wins</h2>
        <p>General-purpose AI models like GPT-4 and Claude are remarkable technological achievements, but they face a crucial limitation: they must be all things to all people. Vertical AI companies, by contrast, can optimize every aspect of their solution for specific use cases, creating defensible moats that horizontal players struggle to replicate.</p>
        
        <p>Consider Hebbia, an AI research platform that reached a $700 million valuation by focusing exclusively on complex document analysis for financial services and consulting firms. While ChatGPT can summarize documents, Hebbia can navigate intricate financial models, understand regulatory nuances, and generate investment committee-ready analyses. This specialization allows them to charge premium prices while maintaining customer loyalty that generic tools cannot match.</p>
        
        <p>The data supports this thesis. Vertical AI companies are achieving net retention rates of 120-150%, compared to 110-130% for horizontal SaaS tools. Their customers aren't just satisfied—they're expanding usage as the AI becomes integral to core business processes.</p>
        
        <h2>Industry-Specific Breakthroughs Driving Growth</h2>
        
        <h3>Legal Technology Revolution</h3>
        <p>The legal industry, traditionally resistant to technological change, is experiencing unprecedented AI adoption. Harvey AI has partnered with elite law firms including Allen & Overy and PwC, automating everything from contract review to regulatory compliance. The company processes millions of legal documents monthly, with lawyers reporting 40-60% time savings on routine tasks.</p>
        
        <p>What makes Harvey's approach powerful isn't just the time savings—it's the domain expertise embedded in the AI. The system understands legal precedent, jurisdictional differences, and the subtle language patterns that determine case outcomes. This level of specialization would be impossible to achieve in a general-purpose model.</p>
        
        <h3>Healthcare's AI Transformation</h3>
        <p>Healthcare represents perhaps the largest vertical AI opportunity, with companies like Tempus and PathAI leading the charge. Tempus, valued at $8.1 billion, has built an AI platform that analyzes clinical and molecular data to personalize cancer treatment. Their approach combines patient data, genomic sequencing, and treatment outcomes to recommend therapy options with unprecedented precision.</p>
        
        <p>PathAI focuses on an even more specific niche: computational pathology. By training AI models exclusively on tissue samples and diagnostic patterns, they've achieved accuracy rates that exceed human pathologists in certain cancer detection scenarios. This specialization has attracted partnerships with major pharmaceutical companies and healthcare systems worldwide.</p>
        
        <h3>Manufacturing and Industrial Applications</h3>
        <p>Industrial AI companies are achieving remarkable results by focusing on specific operational challenges. C3 AI, despite facing public market volatility, continues to win major enterprise contracts by offering AI solutions tailored to energy, manufacturing, and supply chain optimization.</p>
        
        <p>Newer entrants like Palantir's commercial division are achieving growth by building AI solutions for specific industrial use cases rather than generic analytics platforms. Their manufacturing clients report 15-25% improvements in operational efficiency through AI-driven predictive maintenance and quality control.</p>
        
        <h2>The Economics of Vertical AI</h2>
        <p>The financial metrics of vertical AI companies reveal why investors are paying premium valuations. Unlike horizontal SaaS companies that compete primarily on price and features, vertical AI companies compete on outcomes. When Harvey AI saves a law firm 1,000 hours of associate time per month, the ROI calculation is straightforward and compelling.</p>
        
        <p>This outcome-based value proposition enables different pricing models. Many vertical AI companies are moving beyond traditional SaaS subscriptions to usage-based or outcome-sharing arrangements. Some legal AI companies charge based on contracts processed or compliance issues identified. Healthcare AI firms earn revenue sharing based on cost savings or improved patient outcomes.</p>
        
        <p>These models create more predictable, sustainable revenue streams while aligning vendor incentives with customer success.</p>
        
        <h2>The Moat-Building Playbook</h2>
        <p>Successful vertical AI companies follow a consistent playbook for building defensible competitive advantages:</p>
        
        <p><strong>Data Network Effects</strong>: Companies like Tempus and PathAI become more valuable as they process more industry-specific data. Each additional customer strengthens their models, creating competitive barriers that generic AI providers cannot easily overcome.</p>
        
        <p><strong>Regulatory Expertise</strong>: Industries like healthcare and financial services have complex regulatory requirements. Vertical AI companies that master these compliance challenges build significant switching costs and entry barriers.</p>
        
        <p><strong>Integration Depth</strong>: Rather than offering standalone tools, leading vertical AI companies integrate deeply into existing workflows and systems. Harvey AI doesn't just analyze contracts—it integrates with legal practice management systems, billing platforms, and client communication tools.</p>
        
        <p><strong>Domain Expert Teams</strong>: The most successful companies combine AI expertise with deep industry knowledge. PathAI's team includes practicing pathologists, while Harvey AI employs former BigLaw attorneys. This domain expertise is difficult for horizontal players to replicate at scale.</p>
        
        <h2>The Next Wave: Emerging Opportunities</h2>
        <p>Several industries appear ripe for vertical AI disruption. Agriculture, construction, and education represent massive markets with fragmented technology adoption and clear use cases for AI optimization.</p>
        
        <p>In agriculture, companies like Climate Corporation (acquired by Monsanto for $1.1 billion) demonstrated the potential for AI-driven crop optimization. New entrants are building on this foundation with more sophisticated models that incorporate weather data, soil analysis, and market pricing to optimize farming decisions.</p>
        
        <p>Construction, a $12 trillion global industry, remains largely analog despite obvious opportunities for AI optimization in project management, safety monitoring, and resource allocation. Early-stage companies like Built Robotics and Dusty Robotics are beginning to capture this opportunity.</p>
        
        <h2>Investment Implications and Market Dynamics</h2>
        <p>The venture capital community has taken notice of vertical AI's superior metrics. Despite overall AI funding becoming more selective, vertical AI companies continue to raise substantial rounds at premium valuations. The key insight driving this investment thesis: vertical AI companies can achieve both scale and profitability more reliably than horizontal platforms.</p>
        
        <p>However, the window for establishing market position is narrowing. As industries become more educated about AI capabilities, they're becoming more sophisticated buyers. First-mover advantages in vertical AI are proving durable, making early market entry crucial for long-term success.</p>
        
        <h2>The Future of Specialized Intelligence</h2>
        <p>The vertical AI revolution represents more than just a business model shift—it signals the maturation of artificial intelligence from experimental technology to essential business infrastructure. As AI capabilities continue advancing, the companies that will capture the most value are those that understand their customers' specific problems deeply enough to build truly specialized solutions.</p>
        
        <p>For entrepreneurs, the opportunity is clear: identify an industry with complex, repetitive processes and build AI solutions that don't just automate tasks, but enhance human capabilities in ways that create measurable business value. For investors, the lesson is equally straightforward: depth beats breadth in the AI economy.</p>
        
        <blockquote>
          <em>The next wave of billion-dollar AI companies won't be built by creating better chatbots. They'll be built by solving specific, valuable problems for specific industries better than anyone else—and that's exactly what's happening right now.</em>
        </blockquote>
      </div>
    `
  }
};

export default function Article() {
  const [match, params] = useRoute("/article/:slug");
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  if (!match || !params?.slug) {
    return <div>Article not found</div>;
  }

  const article = articles[params.slug];
  
  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      
      <article className="max-w-4xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-apple-blue hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Articles
        </Link>
        
        {/* Article header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-apple-gray mb-6">
            <div className="flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              {article.category}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {article.readTime}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {article.publishDate}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex items-center">
            <div className="text-apple-gray">
              By <span className="font-semibold text-apple-text">{article.author}</span>
            </div>
          </div>
        </header>
        
        {/* Article content */}
        <div 
          className="prose prose-lg prose-blue max-w-none
                     prose-headings:text-apple-text prose-headings:font-bold prose-headings:tracking-tight
                     prose-p:text-apple-text prose-p:leading-relaxed
                     prose-li:text-apple-text
                     prose-blockquote:border-l-apple-blue prose-blockquote:bg-blue-50 prose-blockquote:italic
                     prose-strong:text-apple-text
                     prose-a:text-apple-blue hover:prose-a:text-blue-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        {/* Author bio section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-apple-text mb-4">About the Author</h3>
            <p className="text-apple-gray leading-relaxed">
              Peter Jamieson is a Chief Information Officer and Digital Transformation Leader with extensive experience 
              across retail, real estate, government, and construction sectors. Based in Dubai, UAE, he specializes in 
              enterprise architecture, cloud strategy, and platform integration.
            </p>
            <div className="mt-4">
              <Link href="/" className="text-apple-blue hover:text-blue-700 font-semibold">
                Connect with Peter →
              </Link>
            </div>
          </div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
}
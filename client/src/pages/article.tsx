import { useRoute } from "wouter";
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
    title: "SEO Strategy for Modern Businesses",
    category: "Digital Marketing",
    readTime: "8 min read",
    publishDate: "March 2024",
    author: "Peter Jamieson",
    content: `
      <div class="prose prose-lg max-w-none">
        <h2>Understanding Modern SEO Landscape</h2>
        <p>Search Engine Optimization has evolved significantly in recent years, moving beyond simple keyword stuffing to encompass user experience, content quality, and technical excellence. Today's SEO strategy requires a holistic approach that balances search engine requirements with genuine user value.</p>
        
        <h3>Core SEO Principles</h3>
        <p>Modern SEO is built on three fundamental pillars:</p>
        <ul>
          <li><strong>Technical SEO:</strong> Ensuring your website is crawlable, fast, and mobile-friendly</li>
          <li><strong>Content Strategy:</strong> Creating valuable, relevant content that addresses user intent</li>
          <li><strong>Authority Building:</strong> Establishing credibility through quality backlinks and expertise</li>
        </ul>
        
        <h3>Implementation Strategy</h3>
        <p>Successful SEO implementation requires a systematic approach:</p>
        
        <h4>1. Technical Foundation</h4>
        <p>Start by ensuring your website meets modern technical standards. This includes optimizing page speed, implementing proper URL structures, and ensuring mobile responsiveness. Google's Core Web Vitals have become increasingly important ranking factors.</p>
        
        <h4>2. Keyword Research and Content Planning</h4>
        <p>Move beyond traditional keyword research to understand user intent. Focus on topics and themes rather than individual keywords, and create content clusters that comprehensively cover subject areas.</p>
        
        <h4>3. Content Creation and Optimization</h4>
        <p>Develop content that genuinely helps your audience while incorporating SEO best practices. This means writing for humans first, search engines second, while still following technical optimization guidelines.</p>
        
        <h3>Measuring Success</h3>
        <p>Track meaningful metrics beyond just rankings:</p>
        <ul>
          <li>Organic traffic growth and quality</li>
          <li>User engagement metrics (time on page, bounce rate)</li>
          <li>Conversion rates from organic traffic</li>
          <li>Brand visibility and awareness metrics</li>
        </ul>
        
        <h3>Future Considerations</h3>
        <p>SEO continues to evolve with advancing technology. Prepare for trends like AI-powered search, voice search optimization, and the increasing importance of user experience signals in search rankings.</p>
        
        <blockquote>
          "The best SEO strategy is one that focuses on creating genuine value for users while meeting the technical requirements that help search engines understand and rank your content." - Peter Jamieson
        </blockquote>
      </div>
    `
  },
  "digital-transformation-roadmap": {
    title: "Digital Transformation Roadmap",
    category: "Strategy",
    readTime: "12 min read",
    publishDate: "February 2024",
    author: "Peter Jamieson",
    content: `
      <div class="prose prose-lg max-w-none">
        <h2>Building a Comprehensive Digital Transformation Strategy</h2>
        <p>Digital transformation is not just about adopting new technologies—it's about fundamentally changing how organizations operate, deliver value, and engage with customers in the digital age.</p>
        
        <h3>Assessment and Planning Phase</h3>
        <p>Before embarking on any transformation journey, organizations must thoroughly assess their current state and define clear objectives for where they want to be.</p>
        
        <h4>Current State Analysis</h4>
        <ul>
          <li>Technology infrastructure audit</li>
          <li>Process mapping and efficiency analysis</li>
          <li>Skills gap assessment</li>
          <li>Cultural readiness evaluation</li>
        </ul>
        
        <h3>Strategy Development</h3>
        <p>Successful digital transformation requires a comprehensive strategy that aligns with business objectives and considers organizational capabilities.</p>
        
        <h4>Key Components</h4>
        <ul>
          <li><strong>Vision and Goals:</strong> Clear articulation of the desired future state</li>
          <li><strong>Technology Roadmap:</strong> Prioritized implementation plan for new systems</li>
          <li><strong>Change Management:</strong> Structured approach to managing organizational change</li>
          <li><strong>Skills Development:</strong> Training and development programs for staff</li>
        </ul>
        
        <h3>Implementation Framework</h3>
        <p>Execute transformation in phases to manage risk and ensure sustainable change:</p>
        
        <h4>Phase 1: Foundation Building</h4>
        <p>Establish the technical and organizational foundation for transformation, including infrastructure modernization and initial team training.</p>
        
        <h4>Phase 2: Process Digitization</h4>
        <p>Digitize core business processes, implementing automation where appropriate and establishing new digital workflows.</p>
        
        <h4>Phase 3: Innovation and Optimization</h4>
        <p>Leverage advanced technologies like AI and machine learning to create new value propositions and optimize operations.</p>
        
        <h3>Success Metrics</h3>
        <p>Measure transformation success across multiple dimensions:</p>
        <ul>
          <li>Operational efficiency improvements</li>
          <li>Customer satisfaction and engagement</li>
          <li>Employee productivity and satisfaction</li>
          <li>Revenue growth and cost reduction</li>
          <li>Time-to-market for new products/services</li>
        </ul>
        
        <blockquote>
          "Digital transformation is a journey, not a destination. It requires continuous adaptation and learning to stay ahead in an increasingly digital world." - Peter Jamieson
        </blockquote>
      </div>
    `
  },
  "ai-integration-enterprise": {
    title: "AI Integration in Enterprise",
    category: "Technology",
    readTime: "15 min read",
    publishDate: "January 2024",
    author: "Peter Jamieson",
    content: `
      <div class="prose prose-lg max-w-none">
        <h2>Strategic AI Implementation for Enterprise Organizations</h2>
        <p>Artificial Intelligence is transforming how enterprises operate, make decisions, and deliver value to customers. However, successful AI integration requires careful planning, proper governance, and a clear understanding of both opportunities and limitations.</p>
        
        <h3>AI Readiness Assessment</h3>
        <p>Before implementing AI solutions, organizations must evaluate their readiness across several key areas:</p>
        
        <h4>Data Infrastructure</h4>
        <ul>
          <li>Data quality and accessibility</li>
          <li>Storage and processing capabilities</li>
          <li>Data governance frameworks</li>
          <li>Privacy and security measures</li>
        </ul>
        
        <h4>Organizational Capabilities</h4>
        <ul>
          <li>Technical skills and expertise</li>
          <li>Change management capabilities</li>
          <li>Leadership support and vision</li>
          <li>Cultural readiness for innovation</li>
        </ul>
        
        <h3>AI Implementation Strategy</h3>
        <p>Develop a phased approach to AI adoption that balances innovation with risk management:</p>
        
        <h4>Start with High-Impact, Low-Risk Use Cases</h4>
        <p>Begin with applications that can deliver quick wins while building organizational confidence and expertise. Examples include:</p>
        <ul>
          <li>Customer service chatbots</li>
          <li>Document processing automation</li>
          <li>Predictive maintenance</li>
          <li>Fraud detection</li>
        </ul>
        
        <h4>Build AI Governance Framework</h4>
        <p>Establish clear guidelines for AI development and deployment:</p>
        <ul>
          <li>Ethical AI principles and guidelines</li>
          <li>Model validation and testing procedures</li>
          <li>Risk assessment and mitigation strategies</li>
          <li>Performance monitoring and evaluation</li>
        </ul>
        
        <h3>Technology Architecture</h3>
        <p>Design a flexible, scalable architecture that can support various AI applications:</p>
        
        <h4>Core Components</h4>
        <ul>
          <li><strong>Data Platform:</strong> Centralized data lake or warehouse</li>
          <li><strong>ML Operations:</strong> Tools for model development and deployment</li>
          <li><strong>Integration Layer:</strong> APIs and middleware for system integration</li>
          <li><strong>Monitoring System:</strong> Real-time performance and anomaly detection</li>
        </ul>
        
        <h3>Change Management</h3>
        <p>Successfully integrating AI requires significant organizational change:</p>
        
        <h4>Skills Development</h4>
        <p>Invest in training programs to develop AI literacy across the organization:</p>
        <ul>
          <li>Executive education on AI strategy</li>
          <li>Technical training for development teams</li>
          <li>Data literacy for business users</li>
          <li>Ethics and governance training</li>
        </ul>
        
        <h3>ROI Measurement</h3>
        <p>Establish clear metrics to measure AI investment returns:</p>
        <ul>
          <li>Process efficiency improvements</li>
          <li>Cost reduction and savings</li>
          <li>Revenue growth from new capabilities</li>
          <li>Quality improvements and error reduction</li>
          <li>Customer satisfaction enhancements</li>
        </ul>
        
        <h3>Future Considerations</h3>
        <p>Prepare for the evolving AI landscape:</p>
        <ul>
          <li>Regulatory compliance and governance</li>
          <li>Emerging AI technologies and capabilities</li>
          <li>Industry-specific AI applications</li>
          <li>Partnership and vendor ecosystem</li>
        </ul>
        
        <blockquote>
          "AI integration is not just about technology—it's about reimagining how work gets done and creating new possibilities for value creation." - Peter Jamieson
        </blockquote>
      </div>
    `
  }
};

export default function Article() {
  const [match, params] = useRoute("/article/:slug");
  
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
        <Link href="/#articles" className="inline-flex items-center text-apple-blue hover:text-blue-700 mb-8 transition-colors">
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
              <Link href="/#contact" className="text-apple-blue hover:text-blue-700 font-semibold">
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
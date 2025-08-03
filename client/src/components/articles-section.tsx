import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import seoIcon from "@assets/generated_images/AI_search_transformation_3df5ca17.png";
import transformationIcon from "@assets/generated_images/Corporate_AI_strategy_e4b084f5.png";
import aiIcon from "@assets/generated_images/Vertical_AI_industries_ea3b30fd.png";

export default function ArticlesSection() {
  const articles = [
    {
      title: "The End of Googling: How AI Search is Redefining Business Discovery",
      description: "Exploring how ChatGPT, Perplexity, and other AI search engines are transforming business discovery and what companies need to do to stay visible in the age of conversational search.",
      icon: seoIcon,
      slug: "seo-strategy-modern-businesses",
      readTime: "12 min read",
      category: "Digital Marketing"
    },
    {
      title: "The Corporate AI Mandate: When \"Optional\" Becomes \"Essential\"",
      description: "Examining how companies like Duolingo are mandating AI use, the employee backlash, and what this means for the future of work and corporate strategy.",
      icon: transformationIcon,
      slug: "digital-transformation-roadmap",
      readTime: "10 min read",
      category: "Strategy"
    },
    {
      title: "Beyond Chatbots: How Vertical AI is Creating Billion-Dollar Companies",
      description: "Why specialized AI companies like Harvey AI and PathAI are achieving higher valuations than horizontal platforms, and what this means for the future of AI business models.",
      icon: aiIcon,
      slug: "ai-integration-enterprise",
      readTime: "11 min read",
      category: "Technology"
    }
  ];

  return (
    <section id="articles" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 section-fade">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-4">Articles &amp; Publications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-apple-blue mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-apple-gray max-w-2xl mx-auto leading-relaxed">
            Insights and thought leadership on technology, digital transformation, and business strategy
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {articles.map((article, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 p-8 h-full flex flex-col border border-gray-100/50">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-gray-50 to-white border border-gray-100">
                    <img src={article.icon} alt={`${article.title} icon`} className="w-16 h-16 object-cover rounded-2xl" />
                  </div>
                  <div className="mb-6">
                    <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-apple-blue/10 to-blue-500/10 text-apple-blue rounded-full text-sm font-semibold mb-3 border border-apple-blue/20">
                      {article.category}
                    </span>
                    <div className="text-sm text-apple-gray font-medium">{article.readTime}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-apple-text mb-4 tracking-tight leading-tight">{article.title}</h3>
                  <p className="text-apple-gray text-base leading-relaxed font-medium line-height-loose">{article.description}</p>
                </div>
                
                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link href={`/article/${article.slug}`} className="inline-flex items-center justify-center w-full text-apple-blue font-semibold hover:text-blue-700 transition-colors duration-200 group/link">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
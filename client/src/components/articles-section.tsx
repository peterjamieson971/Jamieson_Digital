import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import seoIcon from "@assets/generated_images/SEO_article_icon_880cff46.png";
import transformationIcon from "@assets/generated_images/Digital_transformation_icon_9991c8b9.png";
import aiIcon from "@assets/generated_images/AI_technology_icon_e226a11c.png";

export default function ArticlesSection() {
  const articles = [
    {
      title: "SEO Strategy for Modern Businesses",
      description: "A comprehensive guide to implementing effective SEO strategies that drive organic growth and improve search engine visibility in today's competitive digital landscape.",
      icon: seoIcon,
      slug: "seo-strategy-modern-businesses",
      readTime: "8 min read",
      category: "Digital Marketing"
    },
    {
      title: "Digital Transformation Roadmap",
      description: "Essential frameworks and methodologies for leading successful digital transformation initiatives across enterprise organizations and emerging businesses.",
      icon: transformationIcon,
      slug: "digital-transformation-roadmap",
      readTime: "12 min read",
      category: "Strategy"
    },
    {
      title: "AI Integration in Enterprise",
      description: "Practical approaches to implementing artificial intelligence solutions in large-scale operations, with focus on ROI measurement and change management.",
      icon: aiIcon,
      slug: "ai-integration-enterprise",
      readTime: "15 min read",
      category: "Technology"
    }
  ];

  return (
    <section id="articles" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 section-fade relative">
      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-apple-blue"></div>
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
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-8 h-full flex flex-col border border-gray-100">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-white border-2 border-gray-100">
                    <img src={article.icon} alt={`${article.title} icon`} className="w-12 h-12 object-contain" />
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium mb-3">
                      {article.category}
                    </span>
                    <div className="text-sm text-apple-gray">{article.readTime}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-apple-text mb-4 tracking-tight">{article.title}</h3>
                  <p className="text-apple-gray text-base leading-relaxed font-medium">{article.description}</p>
                </div>
                
                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-gray-100">
                  <Link href={`/article/${article.slug}`} className="inline-flex items-center justify-center w-full text-apple-blue font-semibold hover:text-blue-700 transition-colors duration-200 group/link">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
                
                {/* Subtle accent */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-purple-500 to-apple-blue rounded-b-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
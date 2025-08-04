import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { featuredArticles } from "@/data/articles";

export default function ArticlesSection() {

  return (
    <section id="articles" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 section-fade">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-4">Articles &amp; Publications</h2>
          <p className="text-xl text-apple-gray max-w-2xl mx-auto leading-relaxed">
            Insights and thought leadership on technology, digital transformation, and business strategy
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {featuredArticles.map((article, index) => (
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
        
        {/* View All Articles Button */}
        <div className="text-center mt-16">
          <Link 
            href="/articles"
            className="inline-flex items-center px-8 py-4 bg-apple-blue hover:bg-blue-700 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
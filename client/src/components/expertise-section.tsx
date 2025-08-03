import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@shared/schema";

export default function ExpertiseSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const expertiseAreas = [
    {
      title: "Business Impact",
      subtitle: "Driving measurable value through strategic technology investments",
      bullets: [
        "Cost optimization and vendor negotiation expertise",
        "C-suite stakeholder engagement and board-level strategy",
        "Digital innovation that creates competitive advantage",
        "Global team leadership across diverse sectors"
      ]
    },
    {
      title: "Transformation Execution", 
      subtitle: "Leading complex modernization journeys from legacy to cloud-native",
      bullets: [
        "Enterprise application modernization (ERP, CRM, HR systems)",
        "Cloud strategy and multi-platform integration",
        "Agile delivery and CI/CD implementation",
        "Large-scale infrastructure transformations"
      ]
    },
    {
      title: "Technology Leadership",
      subtitle: "Building high-performing teams through transparency and collaboration",
      bullets: [
        "Enterprise architecture and IT governance",
        "Digital strategy development and execution",
        "Change management across complex initiatives",
        "Emerging technology adoption and AI readiness"
      ]
    }
  ];

  return (
    <section id="expertise" className="py-32 px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 section-fade">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-6">Core Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-apple-blue to-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-apple-gray max-w-2xl mx-auto leading-relaxed">
            Transforming organizations through strategic technology leadership and innovation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {expertiseAreas.map((area, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-8 h-full flex flex-col border border-gray-100">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-apple-blue to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="w-8 h-8 bg-white rounded-lg opacity-90"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-apple-text mb-4 tracking-tight">{area.title}</h3>
                  <p className="text-apple-gray text-base leading-relaxed font-medium">{area.subtitle}</p>
                </div>
                
                {/* Content */}
                <div className="flex-grow mb-8">
                  <ul className="space-y-4">
                    {area.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start group/item">
                        <div className="w-2 h-2 bg-apple-blue rounded-full mr-4 mt-2.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></div>
                        <span className="text-apple-text text-sm leading-relaxed font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Footer */}
                <div className="pt-6 border-t border-gray-100">
                  <a href="#" className="inline-flex items-center justify-center w-full text-apple-blue font-semibold hover:text-blue-700 transition-colors duration-200 group/link">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
                
                {/* Subtle accent */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-apple-blue to-blue-600 rounded-b-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

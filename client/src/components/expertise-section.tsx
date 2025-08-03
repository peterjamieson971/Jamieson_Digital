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
    <section id="expertise" className="py-24 px-6 lg:px-8 bg-white section-fade">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text tracking-apple mb-6">Core Expertise</h2>
          <div className="w-12 h-0.5 bg-apple-text mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-16">
          {expertiseAreas.map((area, index) => (
            <div key={index} className="group">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-apple-text mb-4 tracking-apple">{area.title}</h3>
                <div className="w-12 h-0.5 bg-apple-blue mx-auto mb-6"></div>
                <p className="text-apple-gray text-base font-medium leading-relaxed px-4">{area.subtitle}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 mb-8 hover:bg-gray-100 transition-colors duration-200">
                <ul className="space-y-4">
                  {area.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start text-apple-text">
                      <div className="w-2 h-2 bg-apple-blue rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <a href="#" className="inline-flex items-center text-apple-blue font-medium hover:opacity-75 transition-opacity group-hover:translate-x-1 transform duration-200">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

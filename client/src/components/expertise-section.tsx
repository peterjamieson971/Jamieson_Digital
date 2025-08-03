import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";
import businessIcon from "@assets/generated_images/Business_impact_trending_chart_icon_de5fc6d1.png";
import transformationIcon from "@assets/generated_images/Digital_transformation_cloud_icon_3f4c1dc5.png";
import leadershipIcon from "@assets/generated_images/Technology_leadership_network_icon_7f4adcd2.png";

export default function ExpertiseSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const expertiseAreas = [
    {
      title: "Business Impact",
      subtitle: "Driving measurable value through strategic technology investments",
      icon: businessIcon,
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
      icon: transformationIcon,
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
      icon: leadershipIcon,
      bullets: [
        "Enterprise architecture and IT governance",
        "Digital strategy development and execution",
        "Change management across complex initiatives",
        "Emerging technology adoption and AI readiness"
      ]
    }
  ];

  return (
    <section id="expertise" className="py-20 px-6 lg:px-8 bg-white section-fade relative">
      {/* Bottom gradient separator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-apple-blue via-blue-500 to-purple-600"></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-4">Core Expertise</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-apple-blue to-blue-600 mx-auto mb-6 rounded-full"></div>
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
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-white border-2 border-gray-100">
                    <img src={area.icon} alt={`${area.title} icon`} className="w-12 h-12 object-contain" />
                  </div>
                  <h3 className="text-2xl font-bold text-apple-text mb-4 tracking-tight">{area.title}</h3>
                  <p className="text-apple-gray text-base leading-relaxed font-medium">{area.subtitle}</p>
                </div>
                
                {/* Content */}
                <div className="flex-grow">
                  <ul className="space-y-4">
                    {area.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start group/item">
                        <div className="w-2 h-2 bg-apple-blue rounded-full mr-4 mt-2.5 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></div>
                        <span className="text-apple-text text-sm leading-relaxed font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
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

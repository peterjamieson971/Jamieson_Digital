import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@shared/schema";

export default function ExpertiseSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const expertiseAreas = [
    {
      title: "TECHNOLOGY LEADERSHIP",
      content: profile?.humanistExpertise || "Digital Strategy | Enterprise Architecture | IT Governance | Budget Oversight | Change Management. Experienced in leading lean, high-performing teams through complex change initiatives while maintaining focus on transparency, collaboration, and agility across diverse organizational cultures."
    },
    {
      title: "TRANSFORMATION EXECUTION", 
      content: profile?.visionaryExpertise || "Cloud (Azure, OCI) | Oracle & SAP | AI/ML | CRM & ERP | CI/CD | Agile Delivery | Smart Infrastructure. Proven success in transforming legacy applications into modern, scalable platforms spanning ERP, CRM, HR, and data ecosystems with embedded governance and service excellence."
    },
    {
      title: "BUSINESS IMPACT",
      content: profile?.galvanizerExpertise || "Cost Optimization | Digital Innovation | Stakeholder Engagement | Vendor Negotiation | Global Team Leadership. Known for working closely with boards and C-suite stakeholders to enable innovation and growth, delivering over $15M in cost optimizations and managing multi-million dollar technology portfolios."
    }
  ];

  return (
    <section id="expertise" className="py-24 px-6 lg:px-8 bg-white section-fade">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text tracking-apple mb-6">Core Expertise</h2>
          <div className="w-12 h-0.5 bg-apple-text mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {expertiseAreas.map((area, index) => (
            <div key={index} className="text-center group">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-apple-text mb-4 tracking-apple">{area.title}</h3>
                <div className="w-8 h-0.5 bg-apple-blue mx-auto mb-6"></div>
              </div>
              <div className="text-apple-gray leading-relaxed mb-6">
                <p>{area.content}</p>
              </div>
              <a href="#" className="inline-flex items-center text-apple-blue font-medium hover:opacity-75 transition-opacity">
                Learn more
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

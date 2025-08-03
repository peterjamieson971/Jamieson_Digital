import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@shared/schema";

export default function ExpertiseSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const expertiseAreas = [
    {
      title: "HUMANIST",
      content: profile?.humanistExpertise || "Creates a culture that sees the individual, hears their voice, respects their values and knowledge, and puts human interest and welfare at the heart of everything. Uses digital technology to unlock the hidden potential of the human spirit, not replace it."
    },
    {
      title: "VISIONARY", 
      content: profile?.visionaryExpertise || "Sees how the next generation of technology and innovation will positively impact the lives of people and then gives that vision a voice and makes it believable through compelling narratives and strategic implementation."
    },
    {
      title: "GALVANIZER",
      content: profile?.galvanizerExpertise || "Builds an inclusive and aligned ecosystem across employees, customers, and shareholders that shifts our mindset from vision and ideas to reality and action plans; from rethinking to creating and executing the art of the possible."
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

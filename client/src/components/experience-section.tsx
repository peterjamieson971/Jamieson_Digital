import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";

export default function ExperienceSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const parseRole = (roleText: string) => {
    const parts = roleText.split(' - ');
    const titleAndCompany = parts[0];
    const description = parts[1] || '';
    
    // Extract title and company
    const titleParts = titleAndCompany.split(' at ');
    const title = titleParts[0];
    const company = titleParts[1] || '';
    
    return { title, company, description };
  };

  const currentRole = parseRole(profile?.currentRole || "Senior Director Group Technology at Seddiqi Holding - Developed and executed the 'Unity' enterprise tech strategy across luxury retail, real estate, and investment divisions. Managing a $10M+ tech portfolio spanning 60+ stores and three group companies.");
  const previousRole1 = parseRole(profile?.previousRole1 || "Director of Information Technology at NEOM - Directed digital infrastructure and IT operations for NEOM, the $500B smart city flagship of Vision 2030. Delivered smart infrastructure foundations including cloud-native ERP, WAN, and data center architecture.");
  const previousRole2 = parseRole(profile?.previousRole2 || "Chief Technology Officer at Department of Culture & Tourism (DCT) Abu Dhabi - Spearheaded digital government strategy implementation for 2,000+ employees. Delivered Abu Dhabi's first full Azure and M365 migration.");
  const microsoftRole = parseRole(profile?.microsoftRole || "Public Sector Chief Technology Officer at Microsoft Scotland - Led Microsoft's engagement with Scottish public sector clients, including health, local government, and education. Developed digital transformation strategies leveraging Azure and Power Platform.");
  const ibmRole = parseRole(profile?.ibmRole || "Chief Architect at IBM UK - Served as architecture lead for major UK public sector and financial services clients. Directed technology strategy and architecture governance across transformation programs valued at £100M+.");

  return (
    <section id="experience" className="py-24 px-6 lg:px-8 section-fade">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text tracking-apple mb-6">Experience</h2>
          <div className="w-12 h-0.5 bg-apple-text mx-auto"></div>
        </div>
        
        <div className="space-y-12">
          {/* Current Role */}
          <div className="border-l-2 border-apple-blue pl-8 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-apple-blue rounded-full"></div>
            <h3 className="text-xl font-semibold text-apple-text mb-2">{currentRole.title}</h3>
            <p className="text-apple-blue font-medium mb-3">
              {currentRole.company}
            </p>
            <p className="text-apple-gray leading-relaxed">
              {currentRole.description}
            </p>
          </div>
          
          {/* Previous Role 1 */}
          <div className="border-l-2 border-gray-200 pl-8 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full"></div>
            <h3 className="text-xl font-semibold text-apple-text mb-2">{previousRole1.title}</h3>
            <p className="text-apple-gray font-medium mb-3">
              {previousRole1.company}
            </p>
            <p className="text-apple-gray leading-relaxed">
              {previousRole1.description}
            </p>
          </div>
          
          {/* Previous Role 2 */}
          <div className="border-l-2 border-gray-200 pl-8 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full"></div>
            <h3 className="text-xl font-semibold text-apple-text mb-2">{previousRole2.title}</h3>
            <p className="text-apple-gray font-medium mb-3">
              {previousRole2.company}
            </p>
            <p className="text-apple-gray leading-relaxed">
              {previousRole2.description}
            </p>
          </div>
          
          {/* Microsoft Role */}
          <div className="border-l-2 border-gray-200 pl-8 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full"></div>
            <h3 className="text-xl font-semibold text-apple-text mb-2">{microsoftRole.title}</h3>
            <p className="text-apple-gray font-medium mb-3">
              {microsoftRole.company}
            </p>
            <p className="text-apple-gray leading-relaxed">
              {microsoftRole.description}
            </p>
          </div>
          
          {/* IBM Role */}
          <div className="border-l-2 border-gray-200 pl-8 relative">
            <div className="absolute -left-2 top-0 w-4 h-4 bg-gray-300 rounded-full"></div>
            <h3 className="text-xl font-semibold text-apple-text mb-2">{ibmRole.title}</h3>
            <p className="text-apple-gray font-medium mb-3">
              {ibmRole.company}
            </p>
            <p className="text-apple-gray leading-relaxed">
              {ibmRole.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

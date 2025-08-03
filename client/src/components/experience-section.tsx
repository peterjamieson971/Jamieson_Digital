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
    
    // Try to extract company and dates from title
    const titleParts = titleAndCompany.split(' at ');
    const title = titleParts[0];
    const companyAndDates = titleParts[1] || '';
    
    // Check for dates in parentheses
    const dateMatch = companyAndDates.match(/\(([^)]+)\)$/);
    const company = dateMatch ? companyAndDates.replace(/\s*\([^)]+\)$/, '') : companyAndDates;
    const dates = dateMatch ? dateMatch[1] : '';
    
    return { title, company, dates, description };
  };

  const currentRole = parseRole(profile?.currentRole || "Chief Executive Officer at Current Organization - Leading the vision and delivery of cutting-edge technology ecosystems, building foundations for next-generation digital transformation and innovation initiatives.");
  const previousRole1 = parseRole(profile?.previousRole1 || "Previous Executive Role at Previous Organization (2018-2023) - Drove strategic initiatives and digital transformation across multiple business units, delivering measurable impact and sustainable growth.");
  const previousRole2 = parseRole(profile?.previousRole2 || "Senior Leadership Role at Technology Company (2015-2018) - Led cross-functional teams in developing innovative solutions that bridged technology and business objectives, consistently exceeding performance targets.");

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
              {currentRole.company} {currentRole.dates && `• ${currentRole.dates}`}
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
              {previousRole1.company} {previousRole1.dates && `• ${previousRole1.dates}`}
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
              {previousRole2.company} {previousRole2.dates && `• ${previousRole2.dates}`}
            </p>
            <p className="text-apple-gray leading-relaxed">
              {previousRole2.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

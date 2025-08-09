import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";
const profileImage = "/profile-image.jpg";

export default function AboutSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  const formatBio = (bio: string) => {
    return bio.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-6 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  return (
    <section id="about" className="py-20 px-6 lg:px-8 section-fade">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-apple-text tracking-tight mb-4">About</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-apple-blue to-blue-600 mx-auto rounded-full"></div>
        </div>
        
        {/* Responsive Layout */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <img 
                src={profileImage} 
                alt="Peter Jamieson - Professional Headshot" 
                className="w-64 md:w-72 lg:w-full mx-auto rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
              />
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-apple-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Bio Content */}
          <div className="lg:col-span-2 text-apple-text leading-relaxed text-lg space-y-6">
            {profile?.bio ? (
              <div className="space-y-6">
                {formatBio(profile.bio)}
              </div>
            ) : (
              <>
                <p className="first-letter:text-4xl md:first-letter:text-6xl first-letter:font-bold first-letter:text-apple-blue first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  I've spent the last 15 years designing the resilient digital frameworks that empower businesses to reinvent themselves and grow sustainably. My experience spans retail, real estate, government, and construction, and I've consistently steered agile teams through the intricate choreography of modernization—from unwieldy legacy systems to nimble, cloud-first infrastructures that deliver operational excellence.
                </p>
                <p>
                  I lead with a philosophy of openness, teamwork, and a constant pulse on operational reality. I still code—not as a relic of the past, but as a strategic practice that keeps me in close contact with both the latest opportunities and the daily challenges my teams encounter. This hands-on involvement allows me to bridge the gap between intricate technical detail and clear business impact, forging genuine connections across the entire organization.
                </p>
                <p>
                  I care deeply about widening access to AI knowledge. I speak and write on enterprise AI adoption to help executives see its strategic advantage, stripped of jargon and complexity. My goal is to make AI both understandable and actionable, designing governance structures and cultivating the cultural shifts that enable organizations to wield AI's capability responsibly and to full effect.
                </p>
                <p>
                  Across my career—first, creating future cities powered by AI at NEOM, later driving digital transformation for luxury retail at Seddiqi Holding—I have delivered lasting results by anchoring every technology decision in people and in purpose. My mission is to cultivate ecosystems where innovation flourishes, teams tackle complexity with confidence, and every digital dollar generates enduring value for customers and for stakeholders.
                </p>
                <p>
                  This focus on technology infused with purpose has been honored by the CIO50 Middle East (IDC, 2021) and awarded with BCS Fellowship (2022). Each recognition strengthens my resolve to foster settings where creative solutions multiply, talent flourishes, and digital investments resonate with lasting impact.
                </p>
              </>
            )}
          </div>
        </div>
          
          {/* Professional Highlights */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-apple-blue mb-2">CIO50</div>
                <p className="text-apple-gray text-sm">Middle East Recognition (IDC, 2021)</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-apple-blue mb-2">$15M+</div>
                <p className="text-apple-gray text-sm">Technology Budget Management</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-apple-blue mb-2">Fellow BCS</div>
                <p className="text-apple-gray text-sm">Distinguished IT Contribution (2022)</p>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
}
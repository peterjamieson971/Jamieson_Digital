import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";
import profileImage from "@assets/Alison&Pete111edit_1754207312658.jpg";

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
        
        <div className="relative">
          {/* Floating Profile Image */}
          <div className="float-left mr-8 mb-6 md:mr-12 md:mb-8 lg:mr-16">
            <div className="relative group">
              <img 
                src={profileImage} 
                alt="Peter Jamieson - Professional Headshot" 
                className="w-72 md:w-80 rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
              />
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-apple-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
          
          {/* Flowing Bio Content */}
          <div className="text-apple-text leading-relaxed text-lg space-y-6">
            {profile?.bio ? (
              <div className="space-y-6">
                {formatBio(profile.bio)}
              </div>
            ) : (
              <>
                <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-apple-blue first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
                  I'm a technology leader with over 15 years of experience building resilient digital foundations that fuel business transformation and sustainable growth. With a proven track record across retail, real estate, government, and construction sectors, I specialize in guiding high-performing teams through complex modernization journeys—transforming legacy systems into agile, cloud-native platforms that drive operational excellence.
                </p>
                <p>
                  My leadership philosophy centers on transparency, collaboration, and staying connected to the frontlines of technology. I maintain a hands-on approach to coding and development—not just as a technical skill, but as a leadership tool that keeps me attuned to emerging possibilities and the challenges my teams face daily. This direct engagement enables me to translate complex technical concepts into clear business outcomes while building authentic relationships across all levels of the organization.
                </p>
                <p>
                  I'm passionate about democratizing AI knowledge, actively sharing insights on enterprise AI adoption and helping leadership teams understand its strategic potential beyond the technical complexity. My focus is on making AI accessible and actionable—developing governance frameworks and fostering the cultural shifts needed for organizations to harness AI's power responsibly and effectively.
                </p>
                <p>
                  Throughout my career, from building new cities powered by AI at NEOM to leading digital transformation across luxury retail at Seddiqi Holding, I've consistently delivered results by putting people and purpose at the center of every technology decision. My mission is to create environments where innovation thrives, teams are empowered to solve complex problems, and every digital investment creates lasting value for customers and stakeholders.
                </p>
                <p>
                  This commitment to purposeful technology leadership has been recognized through CIO50 Middle East (IDC, 2021) and my Fellowship of BCS (2022). These achievements fuel my mission to create environments where innovation thrives, teams are empowered to solve complex problems, and every digital investment creates lasting value for customers and stakeholders.
                </p>
              </>
            )}
          </div>
          
          {/* Clear float */}
          <div className="clear-both"></div>
          
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
      </div>
    </section>
  );
}
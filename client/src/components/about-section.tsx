import { useQuery } from "@tanstack/react-query";
import type { Profile } from "@shared/schema";

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
    <section id="about" className="py-24 px-6 lg:px-8 section-fade">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-apple-text tracking-apple mb-6">About</h2>
          <div className="w-12 h-0.5 bg-apple-text mx-auto"></div>
        </div>
        
        <div className="prose prose-lg mx-auto text-apple-text leading-relaxed">
          <div className="text-apple-text leading-relaxed">
            {profile?.bio ? formatBio(profile.bio) : (
              <>
                <p className="mb-6">
                  I am a trailblazing thought leader redefining what's possible in the age of AI and digital transformation. 
                  As a business executive and innovation strategist, I have shaped the future of organizations, cities, and 
                  individuals by reimagining what they can become.
                </p>
                <p className="mb-6">
                  Known as a captivating storyteller and visionary thinker, I inspire audiences to embrace innovation, 
                  unlock hidden potential, and take bold leaps into the future. My work focuses on the intersection of 
                  technology and human potential, creating meaningful impact in an increasingly digital world.
                </p>
                <p>
                  Through my experience across multiple industries and geographies, I've developed a unique perspective 
                  on how emerging technologies can enhance rather than replace human capabilities, fostering growth and 
                  transformation at both individual and organizational levels.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

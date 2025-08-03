import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@shared/schema";
import heroBackground from "@assets/image_1754206514764.png";
import whiteLogo from "@assets/White logo - no background_1754209764924.png";

export default function HeroSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  return (
    <section 
      className="pt-28 pb-20 px-6 lg:px-8 relative bg-cover bg-center bg-no-repeat min-h-[75vh] flex items-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
        <img 
          src={whiteLogo} 
          alt="Peter Jamieson" 
          className="h-24 md:h-32 w-auto mx-auto mb-6 drop-shadow-lg"
        />
        
        <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-md">
          {profile?.tagline || "Technologist | Technology Leader | AI Advocate"}
        </p>
        
        
        </div>
      </div>
    </section>
  );
}

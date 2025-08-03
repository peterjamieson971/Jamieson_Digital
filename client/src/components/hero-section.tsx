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
      className="pt-20 md:pt-28 pb-16 md:pb-20 px-4 md:px-6 lg:px-8 relative bg-cover bg-no-repeat min-h-[60vh] md:min-h-[75vh] flex items-center hero-bg-mobile"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
        <img 
          src={whiteLogo} 
          alt="Peter Jamieson" 
          className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto mx-auto mb-4 md:mb-6 drop-shadow-lg"
        />
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed mb-6 md:mb-12 max-w-3xl mx-auto drop-shadow-md px-4">
          {profile?.tagline || "Technologist, Digital Transformation Leader, AI Advocate"}
        </p>
        
        
        </div>
      </div>
    </section>
  );
}

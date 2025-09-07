import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@shared/schema";

const heroBackgroundWebP = "/hero-background.webp";
const heroBackgroundMobileWebP = "/hero-background-mobile.webp";
const whiteLogo = "/logo-white.png";

export default function HeroSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  return (
    <section 
      className="pt-24 md:pt-32 pb-8 md:pb-20 px-4 md:px-6 lg:px-8 relative min-h-[60vh] md:min-h-[75vh] flex items-center overflow-hidden"
      role="banner"
      aria-label="Hero section with professional technology background"
    >
      {/* Optimized background image with fetchpriority */}
      <picture className="absolute inset-0 w-full h-full">
        <source media="(max-width: 768px)" srcSet={heroBackgroundMobileWebP} />
        <img 
          src={heroBackgroundWebP}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high"
          loading="eager"
          aria-hidden="true"
        />
      </picture>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="max-w-4xl mx-auto">
        <img 
          src={whiteLogo} 
          alt="Peter Jamieson - Digital Transformation Leader" 
          className="h-16 sm:h-20 md:h-24 lg:h-32 w-auto mx-auto mb-4 md:mb-6 drop-shadow-lg"
        />
        
        <h1 className="sr-only">Peter Jamieson - Digital Transformation Leader</h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 font-light leading-relaxed mb-6 md:mb-12 max-w-3xl mx-auto drop-shadow-md px-4">
          {profile?.tagline || "Technologist | Digital Transformation Leader | AI Advocate"}
        </p>
        
        
        </div>
      </div>
    </section>
  );
}

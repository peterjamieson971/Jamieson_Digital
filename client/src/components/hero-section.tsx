import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@shared/schema";
import heroBackground from "@assets/image_1754206514764.png";

export default function HeroSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  return (
    <section 
      className="pt-32 pb-24 px-6 lg:px-8 relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-apple mb-6 leading-tight drop-shadow-lg">
          {profile?.name || "Peter Jamieson"}
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed mb-12 max-w-3xl mx-auto drop-shadow-md">
          {profile?.tagline || "Technologist | Technology Leader | AI Advocate"}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#about" className="inline-flex items-center text-white bg-apple-blue/90 backdrop-blur-sm px-6 py-3 rounded-full font-medium hover:bg-apple-blue transition-all duration-200 shadow-lg">
            Learn more about my work
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}

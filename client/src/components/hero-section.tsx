import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import type { Profile } from "@shared/schema";

export default function HeroSection() {
  const { data: profile } = useQuery<Profile>({
    queryKey: ["/api/profile"],
  });

  return (
    <section className="pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-apple-text tracking-apple mb-6 leading-tight">
          {profile?.name || "Your Full Name"}
        </h1>
        
        <p className="text-xl md:text-2xl text-apple-gray font-light leading-relaxed mb-12 max-w-3xl mx-auto">
          {profile?.tagline || "Applied Futurist and Innovation Leader – Bridging Technology and Human Potential"}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#about" className="inline-flex items-center text-apple-blue font-medium hover:opacity-75 transition-opacity">
            Learn more about my work
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}

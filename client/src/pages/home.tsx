import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ArticlesSection from "@/components/articles-section";
import ExpertiseSection from "@/components/expertise-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling behavior
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const element = document.querySelector(target.getAttribute('href')!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  useEffect(() => {
    // Section fade-in animation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.section-fade').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-apple-bg font-sans">
      <Navigation />
      <main id="main-content" role="main">
        <HeroSection />
        <AboutSection />
        <ArticlesSection />
        <ExpertiseSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

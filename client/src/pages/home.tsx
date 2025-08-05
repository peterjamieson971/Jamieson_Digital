import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ArticlesSection from "@/components/articles-section";
import ExpertiseSection from "@/components/expertise-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Handle URL hash navigation (e.g., coming from /#contact)
    const hash = window.location.hash.substring(1); // Remove the '#'
    if (hash) {
      // Use setTimeout to ensure the page has loaded and elements are available
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

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
      <Helmet>
        <title>Peter Jamieson - Digital Transformation Leader</title>
        <meta name="description" content="Digital Transformation Leader Peter Jamieson: 15+ years transforming enterprises through AI, cloud strategy, and digital modernization. CIO50 Middle East, Fellow BCS. Based in Dubai, UAE." />
        <meta name="keywords" content="CIO Dubai, Digital Transformation Leader UAE, AI Implementation Consultant, Enterprise Architecture Dubai, Cloud Strategy, Peter Jamieson, Technology Leadership" />
        <link rel="canonical" href="https://jamieson.digital/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Peter Jamieson - Digital Transformation Leader" />
        <meta property="og:description" content="Digital Transformation Leader with 15+ years transforming enterprises through AI, cloud strategy, and digital modernization. CIO50 Middle East, Fellow BCS." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jamieson.digital/" />
        <meta property="og:site_name" content="Peter Jamieson" />
        <meta property="og:image" content="https://jamieson.digital/profile-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Peter Jamieson - Digital Transformation Leader" />
        
        {/* Twitter Cards */}  
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@digitaljamieson" />
        <meta name="twitter:creator" content="@digitaljamieson" />
        <meta name="twitter:title" content="Peter Jamieson - Digital Transformation Leader" />
        <meta name="twitter:description" content="Digital Transformation Leader with 15+ years transforming enterprises through AI, cloud strategy, and digital modernization. CIO50 Middle East, Fellow BCS." />
        <meta name="twitter:image" content="https://jamieson.digital/profile-image.jpg" />
      </Helmet>

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

import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import LoadingSkeleton from "@/components/loading-skeleton";
import { Helmet } from "react-helmet-async";
import { useEffect, lazy, Suspense } from "react";

// Lazy load heavy components to improve initial page load
const AboutSection = lazy(() => import("@/components/about-section"));
const ArticlesSection = lazy(() => import("@/components/articles-section"));
const PodcastsSection = lazy(() => import("@/components/podcasts-section"));
const ExpertiseSection = lazy(() => import("@/components/expertise-section"));
const ExperienceSection = lazy(() => import("@/components/experience-section"));
const ContactSection = lazy(() => import("@/components/contact-section"));
const Footer = lazy(() => import("@/components/footer"));

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
        <meta property="og:image" content="https://jamieson.digital/profile-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Peter Jamieson - Digital Transformation Leader" />
        
        {/* Twitter Cards */}  
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@digitaljamieson" />
        <meta name="twitter:creator" content="@digitaljamieson" />
        <meta name="twitter:title" content="Peter Jamieson - Digital Transformation Leader" />
        <meta name="twitter:description" content="Digital Transformation Leader with 15+ years transforming enterprises through AI, cloud strategy, and digital modernization. CIO50 Middle East, Fellow BCS." />
        <meta name="twitter:image" content="https://jamieson.digital/profile-image.webp" />
        
        {/* Resource Preloading */}
        <link rel="preload" href="/logo-white.png" as="image" />
        <link rel="preload" href="/hero-background-mobile.webp" as="image" media="(max-width: 768px)" />
        <link rel="preload" href="/hero-background.webp" as="image" media="(min-width: 769px)" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.jamieson.digital" />
      </Helmet>

      <Navigation />
      <main id="main-content" role="main">
        <HeroSection />
        <Suspense fallback={<LoadingSkeleton />}>
          <AboutSection />
          <ArticlesSection />
          <PodcastsSection />
          <ExpertiseSection />
          <ExperienceSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<div className="h-20 bg-gray-50"></div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
const logoImage = "/logo-black.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Function to handle navigation to homepage sections
  const navigateToSection = (sectionId: string) => {
    if (location === '/') {
      // Already on homepage, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to homepage with hash
      setLocation(`/#${sectionId}`);
    }
    setIsMenuOpen(false); // Close mobile menu
  };

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-apple-blue text-white px-4 py-2 z-[60] rounded-br transition-all"
      >
        Skip to main content
      </a>
      
      <nav 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-safari bg-white/80 border-b border-gray-200/50"
        role="navigation"
        aria-label="Main navigation"
      >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src={logoImage} 
              alt="Peter Jamieson - Digital Transformation Leader" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="hidden md:flex space-x-8" role="menubar">
            <button onClick={() => navigateToSection('about')} className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">About</button>
            <button onClick={() => navigateToSection('articles')} className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">Articles</button>
            <button onClick={() => navigateToSection('expertise')} className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">Expertise</button>
            <button onClick={() => navigateToSection('experience')} className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">Experience</button>
            <button onClick={() => navigateToSection('contact')} className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">Contact</button>
          </div>
          
          <button 
            className="md:hidden text-apple-text focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded-md p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200" role="menu">
              <button onClick={() => navigateToSection('about')} className="block w-full text-left px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">About</button>
              <button onClick={() => navigateToSection('articles')} className="block w-full text-left px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">Articles</button>
              <button onClick={() => navigateToSection('expertise')} className="block w-full text-left px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">Expertise</button>
              <button onClick={() => navigateToSection('experience')} className="block w-full text-left px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">Experience</button>
              <button onClick={() => navigateToSection('contact')} className="block w-full text-left px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">Contact</button>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}

import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/Black logo - no background_1754205300727.png";

import Black_logo___no_background from "@assets/Black logo - no background.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              src={Black_logo___no_background} 
              alt="Personal Brand Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="hidden md:flex space-x-8" role="menubar">
            <a href="#about" className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">About</a>
            <a href="#articles" className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">Articles</a>
            <a href="#expertise" className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">Expertise</a>
            <a href="#experience" className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">Experience</a>
            <a href="#contact" className="text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded px-2 py-1 transition-colors duration-200" role="menuitem">Contact</a>
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
              <a href="#about" className="block px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">About</a>
              <a href="#articles" className="block px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">Articles</a>
              <a href="#expertise" className="block px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">Expertise</a>
              <a href="#experience" className="block px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">Experience</a>
              <a href="#contact" className="block px-3 py-2 text-apple-text hover:text-apple-blue focus:text-apple-blue focus:outline-none focus:ring-2 focus:ring-apple-blue focus:ring-offset-2 rounded transition-colors" role="menuitem">Contact</a>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}

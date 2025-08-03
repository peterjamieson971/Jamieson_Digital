import logoImage from "@assets/Black logo - no background_1754205300727.png";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-8 border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoImage} 
                alt="Peter Jamieson - Chief Information Officer" 
                className="h-8 w-auto"
              />
              <span className="text-apple-text font-bold text-lg tracking-apple">Peter Jamieson</span>
            </div>
            <p className="text-apple-gray text-sm leading-relaxed mb-4">
              Chief Information Officer and Digital Transformation Leader specializing in enterprise architecture, 
              cloud strategy, and AI integration across retail, real estate, government, and construction sectors.
            </p>
            <p className="text-apple-gray text-sm">
              <strong>Location:</strong> Dubai, UAE
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-apple-text mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <a href="#about" className="block text-apple-gray hover:text-apple-blue transition-colors text-sm">About</a>
              <a href="#articles" className="block text-apple-gray hover:text-apple-blue transition-colors text-sm">Articles</a>
              <a href="#expertise" className="block text-apple-gray hover:text-apple-blue transition-colors text-sm">Expertise</a>
              <a href="#experience" className="block text-apple-gray hover:text-apple-blue transition-colors text-sm">Experience</a>
              <a href="#contact" className="block text-apple-gray hover:text-apple-blue transition-colors text-sm">Contact</a>
            </nav>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="font-semibold text-apple-text mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://linkedin.com/in/pjamieson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 hover:bg-apple-blue hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com/digitaljamieson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 hover:bg-apple-blue hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Follow on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/peterjamieson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-100 hover:bg-apple-blue hover:text-white rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm text-apple-gray">
          <p>© 2025 Peter Jamieson. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            CIO | Digital Transformation Leader | AI Advocate
          </p>
        </div>
      </div>
    </footer>
  );
}

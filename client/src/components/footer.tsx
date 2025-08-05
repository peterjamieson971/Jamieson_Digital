const logoImage = "/logo-black.png";
import { Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-20 px-6 lg:px-8 border-t border-gray-100 bg-gradient-to-b from-gray-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                src={logoImage} 
                alt="Peter Jamieson - Digital Transformation Leader" 
                className="h-10 w-auto"
              />
              <div>
                <h2 className="text-apple-text font-bold text-xl tracking-apple mb-1">Peter Jamieson</h2>
                <p className="text-sm font-medium text-[#000205]">Technologist, Digital Transformation Leader, AI Advocate</p>
              </div>
            </div>
            <p className="text-apple-gray text-base leading-relaxed mb-6 max-w-md">Digital Transformation Leader specializing in enterprise architecture, cloud strategy, and AI integration across retail, real estate, government, and construction sectors. Based in Dubai, United Arab Emirates.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-apple-text text-lg mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <a href="#about" className="block text-apple-gray hover:text-apple-blue transition-all duration-200 text-sm hover:translate-x-1 font-medium">About</a>
              <a href="#articles" className="block text-apple-gray hover:text-apple-blue transition-all duration-200 text-sm hover:translate-x-1 font-medium">Articles</a>
              <a href="#expertise" className="block text-apple-gray hover:text-apple-blue transition-all duration-200 text-sm hover:translate-x-1 font-medium">Expertise</a>
              <a href="#experience" className="block text-apple-gray hover:text-apple-blue transition-all duration-200 text-sm hover:translate-x-1 font-medium">Experience</a>
              <a href="#contact" className="block text-apple-gray hover:text-apple-blue transition-all duration-200 text-sm hover:translate-x-1 font-medium">Contact</a>
            </nav>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="font-bold text-apple-text text-lg mb-6">Connect</h3>
            <div className="flex space-x-3 mb-6">
              <a 
                href="https://linkedin.com/in/pjamieson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-white hover:bg-apple-blue border border-gray-200 hover:border-apple-blue rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105"
                aria-label="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </a>
              <a 
                href="https://twitter.com/digitaljamieson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-white hover:bg-apple-blue border border-gray-200 hover:border-apple-blue rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105"
                aria-label="Follow on Twitter"
              >
                <Twitter className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </a>
              <a 
                href="https://instagram.com/peterjamieson" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group w-12 h-12 bg-white hover:bg-apple-blue border border-gray-200 hover:border-apple-blue rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:scale-105"
                aria-label="Follow on Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-apple-gray text-sm font-medium">© 2025 Peter Jamieson. All rights reserved.</p>
          <p className="text-apple-gray text-sm font-medium mt-3 md:mt-0">Technologist | Digital Transformation Leader | AI Advocate</p>
        </div>
      </div>
    </footer>
  );
}

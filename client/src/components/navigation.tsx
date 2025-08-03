import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoImage from "@assets/Black logo - no background_1754205300727.png";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handlePremiumClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const modal = document.getElementById('premium-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-safari bg-white/80 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img 
              src={logoImage} 
              alt="Personal Brand Logo" 
              className="h-12 w-auto"
            />
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-apple-text hover:text-apple-blue transition-colors duration-200">About</a>
            <a href="#expertise" className="text-apple-text hover:text-apple-blue transition-colors duration-200">Expertise</a>
            <a href="#experience" className="text-apple-text hover:text-apple-blue transition-colors duration-200">Experience</a>
            <a href="#contact" className="text-apple-text hover:text-apple-blue transition-colors duration-200">Contact</a>
            <button 
              onClick={handlePremiumClick}
              className="text-apple-blue font-medium hover:opacity-75 transition-opacity"
            >
              Premium
            </button>
          </div>
          
          <button 
            className="md:hidden text-apple-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              <a href="#about" className="block px-3 py-2 text-apple-text hover:text-apple-blue transition-colors">About</a>
              <a href="#expertise" className="block px-3 py-2 text-apple-text hover:text-apple-blue transition-colors">Expertise</a>
              <a href="#experience" className="block px-3 py-2 text-apple-text hover:text-apple-blue transition-colors">Experience</a>
              <a href="#contact" className="block px-3 py-2 text-apple-text hover:text-apple-blue transition-colors">Contact</a>
              <button 
                onClick={handlePremiumClick}
                className="block px-3 py-2 text-apple-blue font-medium hover:opacity-75 transition-opacity"
              >
                Premium
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

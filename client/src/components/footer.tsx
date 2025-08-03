import { Lock } from "lucide-react";
import logoImage from "@assets/Black logo - no background_1754205300727.png";

export default function Footer() {
  const handlePremiumClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const modal = document.getElementById('premium-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  };

  return (
    <footer className="py-12 px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <img 
            src={logoImage} 
            alt="Personal Brand Logo" 
            className="h-6 w-auto"
          />
          <span className="text-apple-text font-medium tracking-apple">Your Name</span>
        </div>
        
        <p className="text-apple-gray text-sm mb-6">
          © 2024 Your Name. All rights reserved.
        </p>
        
        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={handlePremiumClick}
            className="inline-flex items-center text-apple-blue font-medium hover:opacity-75 transition-opacity"
          >
            Access Premium Content
            <Lock className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </footer>
  );
}

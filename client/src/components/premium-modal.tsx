import { useState } from "react";
import { Lock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PremiumModal() {
  const [isVisible, setIsVisible] = useState(false);

  // Listen for modal show events
  useState(() => {
    const checkModal = () => {
      const modal = document.getElementById('premium-modal');
      if (modal && !modal.classList.contains('hidden')) {
        setIsVisible(true);
      }
    };

    const observer = new MutationObserver(checkModal);
    const modal = document.getElementById('premium-modal');
    if (modal) {
      observer.observe(modal, { attributes: true, attributeFilter: ['class'] });
    }

    return () => observer.disconnect();
  });

  const handleClose = () => {
    setIsVisible(false);
    const modal = document.getElementById('premium-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };

  return (
    <div 
      id="premium-modal" 
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm hidden z-50"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-apple-gray hover:text-apple-text"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-apple-blue rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-apple-text mb-4">Premium Content</h3>
            <p className="text-apple-gray mb-6">
              Access exclusive courses, in-depth insights, and premium resources to accelerate your growth.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-left">
                <Check className="w-5 h-5 text-apple-blue mr-3" />
                <span className="text-apple-gray">Exclusive video courses</span>
              </div>
              <div className="flex items-center text-left">
                <Check className="w-5 h-5 text-apple-blue mr-3" />
                <span className="text-apple-gray">Downloadable resources</span>
              </div>
              <div className="flex items-center text-left">
                <Check className="w-5 h-5 text-apple-blue mr-3" />
                <span className="text-apple-gray">Direct access for Q&A</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full bg-apple-blue hover:bg-apple-blue/90 text-white">
                Subscribe Now
              </Button>
              <Button
                variant="ghost"
                className="w-full text-apple-gray hover:text-apple-text"
                onClick={handleClose}
              >
                Not now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

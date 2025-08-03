import logoImage from "@assets/Black logo - no background_1754205300727.png";

export default function Footer() {

  return (
    <footer className="py-12 px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <img 
            src={logoImage} 
            alt="Personal Brand Logo" 
            className="h-6 w-auto"
          />
          <span className="text-apple-text font-medium tracking-apple">Peter Jamieson</span>
        </div>
        
        <p className="text-apple-gray text-sm mb-6">
          © 2024 Peter Jamieson. All rights reserved.
        </p>
        
      </div>
    </footer>
  );
}

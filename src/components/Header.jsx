
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`w-full py-4 px-6 md:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-200">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div className="font-display font-bold text-xl tracking-tight text-slate-800">
            GeneCrypt
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;

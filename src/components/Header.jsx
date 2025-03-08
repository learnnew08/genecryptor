
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "About", href: "#" }
  ];

  return (
    <header 
      className={`w-full py-4 px-6 md:px-8 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-700 hover:text-blue-600 transition-colors duration-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#crypto-tools" 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-lg text-sm font-medium transition-colors duration-300"
          >
            Try Encryption
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-700 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-sm animate-fade-in">
          <div className="py-4 px-6 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-slate-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#crypto-tools"
              onClick={() => setMobileMenuOpen(false)} 
              className="block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors text-center mt-4"
            >
              Try Encryption
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

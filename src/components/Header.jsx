
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-8 fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-50 border-b border-gene-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gene-accent/10 flex items-center justify-center transition-all duration-300 group-hover:bg-gene-accent/20">
            <Shield className="w-5 h-5 text-gene-accent" />
          </div>
          <div className="font-display font-semibold text-xl tracking-tight">
            GeneCrypt
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-gene-primary/80 hover:text-gene-primary transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            to="/" 
            className="text-gene-primary/80 hover:text-gene-primary transition-colors duration-300"
          >
            About
          </Link>
          <Link 
            to="/" 
            className="text-gene-primary/80 hover:text-gene-primary transition-colors duration-300"
          >
            Documentation
          </Link>
        </nav>
        
        <Link 
          to="/" 
          className="gene-button-primary text-sm bg-gene-accent hover:bg-gene-accent/90"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;

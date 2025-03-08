
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 md:px-8 fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-200">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <div className="font-semibold text-xl tracking-tight">
            GeneCrypt
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            Home
          </Link>
          <Link 
            to="/" 
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            About
          </Link>
          <Link 
            to="/" 
            className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
          >
            Documentation
          </Link>
        </nav>
        
        <Link 
          to="/" 
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors duration-300"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;

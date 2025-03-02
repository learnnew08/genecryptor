
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import EncryptionCard from '../components/EncryptionCard';
import DecryptionCard from '../components/DecryptionCard';
import { ChevronUp } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Encryption/Decryption Section */}
        <section className="w-full py-16 px-6 md:px-8 bg-gradient-to-b from-white to-gene-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-gene-border bg-white shadow-sm text-sm font-medium text-gene-muted mb-4">
                Secure Your Files
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Encrypt & Decrypt with DNA Cryptography
              </h2>
              <p className="text-gene-muted max-w-3xl mx-auto">
                GeneCrypt uses advanced DNA-based encryption techniques combined with evolutionary algorithms to provide unparalleled security for your sensitive data.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EncryptionCard />
              <DecryptionCard />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="w-full py-16 px-6 md:px-8 bg-gene-bg">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-gene-border bg-white shadow-sm text-sm font-medium text-gene-muted mb-4">
                The Technology
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                How GeneCrypt Works
              </h2>
              <p className="text-gene-muted max-w-3xl mx-auto">
                Our advanced encryption system combines DNA cryptography with evolutionary algorithms
              </p>
            </div>
            
            <div className="grid gap-12 mt-12">
              {[
                {
                  step: "01",
                  title: "DNA Sequence Encoding",
                  description: "Your data is converted into DNA sequences (A, T, G, C) creating a biological representation that's difficult to break.",
                },
                {
                  step: "02",
                  title: "Adaptive Genetic Algorithm",
                  description: "The encryption process uses evolutionary principles to optimize encryption keys, making them stronger with each generation.",
                },
                {
                  step: "03",
                  title: "Secure Transmission",
                  description: "The encrypted data can be safely transmitted or stored, protected by multiple layers of biological computation principles.",
                },
                {
                  step: "04",
                  title: "Authorized Decryption",
                  description: "Only with the correct secret key can the original data be recovered through the reverse DNA decoding process.",
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col md:flex-row gap-6 items-start gene-card animate-slide-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 rounded-xl bg-gene-accent/10 flex items-center justify-center shrink-0 font-display font-bold text-xl text-gene-accent">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-gene-muted">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-8 bg-gene-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="font-display font-semibold text-xl tracking-tight">
                  GeneCrypt
                </div>
              </div>
              <p className="text-white/70 max-w-md">
                Secure your data with advanced DNA-based cryptography and evolutionary algorithms.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2">
                  {['Features', 'Security', 'Technology', 'Pricing'].map((item) => (
                    <li key={item}><a href="#" className="text-white/70 hover:text-white transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                    <li key={item}><a href="#" className="text-white/70 hover:text-white transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Legal</h4>
                <ul className="space-y-2">
                  {['Privacy', 'Terms', 'Cookies', 'Licenses'].map((item) => (
                    <li key={item}><a href="#" className="text-white/70 hover:text-white transition-colors">{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} GeneCrypt. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((item) => (
                <a key={item} href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gene-accent shadow-lg flex items-center justify-center text-white transition-all hover:bg-gene-accent/90 animate-fade-in z-50"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Index;

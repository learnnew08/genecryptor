
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import EncryptionCard from '../components/EncryptionCard';
import DecryptionCard from '../components/DecryptionCard';
import { ChevronUp, Shield, Lock, FileCode, Server } from 'lucide-react';

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
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
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Encryption/Decryption Section */}
        <section id="crypto-tools" className="py-20 px-6 md:px-8 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-medium inline-block mb-4">
                Secure Your Data
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                DNA-Based Cryptography Tools
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Use our advanced genetic algorithms and DNA encoding to protect your sensitive information with encryption that evolves beyond traditional methods.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <EncryptionCard />
              <DecryptionCard />
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-24 px-6 md:px-8 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium inline-block mb-4">
                The Technology
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
                How GeneCrypt Works
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Our revolutionary encryption system combines principles from DNA sequencing with evolutionary algorithms
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[
                {
                  icon: <FileCode className="w-7 h-7 text-indigo-600" />,
                  step: "01",
                  title: "DNA Sequence Encoding",
                  description: "Your data is converted into DNA base pairs (A, T, G, C) creating a biological representation that's highly secure and complex.",
                },
                {
                  icon: <Server className="w-7 h-7 text-indigo-600" />,
                  step: "02",
                  title: "Adaptive Genetic Algorithm",
                  description: "The encryption process uses evolutionary principles to optimize encryption keys, making them stronger with each generation.",
                },
                {
                  icon: <Shield className="w-7 h-7 text-indigo-600" />,
                  step: "03",
                  title: "Secure Transmission",
                  description: "The encrypted data can be safely transmitted or stored, protected by multiple layers of biological computation principles.",
                },
                {
                  icon: <Lock className="w-7 h-7 text-indigo-600" />,
                  step: "04",
                  title: "Authorized Decryption",
                  description: "Only with the correct secret key can the original data be recovered through the reverse DNA decoding process.",
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-mono text-sm font-medium text-indigo-600 mb-2">Step {item.step}</div>
                      <h3 className="text-xl font-bold mb-3 text-slate-800">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-12 px-6 md:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-xl font-bold tracking-tight">GeneCrypt</span>
            </div>
            
            <p className="text-slate-400 text-sm text-center md:text-right">
              © {new Date().getFullYear()} GeneCrypt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 shadow-lg flex items-center justify-center text-white transition-all hover:bg-blue-700 animate-fade-in z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Index;

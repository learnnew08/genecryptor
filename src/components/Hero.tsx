
import React from 'react';
import { Lock, KeyRound, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="w-full pt-32 pb-20 px-6 md:px-8 dna-bg">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-gene-border bg-white shadow-sm text-sm font-medium text-gene-muted">
            DNA-Based Cryptography
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gene-primary animate-slide-up">
            Secure Your Data with <span className="text-gene-accent">Genetic</span> Algorithms
          </h1>
          
          <p className="text-lg text-gene-secondary/80 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '150ms' }}>
            GeneCrypt enhances security by leveraging biological computation principles to optimize encryption keys, making your data protection more robust using DNA Cryptography and the Adaptive Genetic Algorithm.
          </p>
          
          <div className="pt-6 flex flex-wrap gap-4 justify-center" style={{ animationDelay: '300ms' }}>
            <button className="gene-button-primary bg-gene-primary hover:bg-gene-secondary flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>Try Encryption</span>
            </button>
            <button className="gene-button-outline flex items-center gap-2">
              <KeyRound className="w-5 h-5" />
              <span>Learn More</span>
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="w-6 h-6 text-gene-accent" />,
              title: "Enhanced Security",
              description: "Advanced DNA-based cryptography for stronger protection than traditional methods."
            },
            {
              icon: <Lock className="w-6 h-6 text-gene-accent" />,
              title: "Multiple File Types",
              description: "Support for text, images, and audio encryption with optimized algorithms."
            },
            {
              icon: <KeyRound className="w-6 h-6 text-gene-accent" />,
              title: "Evolutionary Optimization",
              description: "Adaptive Genetic Algorithm ensures the highest level of encryption key optimization."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="gene-card hover:translate-y-[-5px] animate-slide-up"
              style={{ animationDelay: `${200 + (index * 100)}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gene-accent/10 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-gene-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

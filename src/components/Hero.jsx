
import React from 'react';
import { Lock, KeyRound, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="w-full pt-32 pb-20 px-6 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-gray-200 bg-white shadow-sm text-sm font-medium text-gray-600">
            DNA-Based Cryptography
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Secure Your Data with <span className="text-blue-600">Genetic</span> Algorithms
          </h1>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            GeneCrypt enhances security by leveraging biological computation principles to optimize encryption keys, making your data protection more robust using DNA Cryptography and the Adaptive Genetic Algorithm.
          </p>
          
          <div className="pt-6 flex flex-wrap gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl flex items-center gap-2 transition-colors duration-300">
              <Lock className="w-5 h-5" />
              <span>Try Encryption</span>
            </button>
            <button className="bg-white text-blue-600 border border-blue-600 py-3 px-6 rounded-xl flex items-center gap-2 hover:bg-blue-50 transition-colors duration-300">
              <KeyRound className="w-5 h-5" />
              <span>Learn More</span>
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Shield className="w-6 h-6 text-blue-600" />,
              title: "Enhanced Security",
              description: "Advanced DNA-based cryptography for stronger protection than traditional methods."
            },
            {
              icon: <Lock className="w-6 h-6 text-blue-600" />,
              title: "Multiple File Types",
              description: "Support for text, images, and audio encryption with optimized algorithms."
            },
            {
              icon: <KeyRound className="w-6 h-6 text-blue-600" />,
              title: "Evolutionary Optimization",
              description: "Adaptive Genetic Algorithm ensures the highest level of encryption key optimization."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:translate-y-[-5px] transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

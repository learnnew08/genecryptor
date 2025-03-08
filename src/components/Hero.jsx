
import React from 'react';
import { Shield, Lock, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 md:px-8 bg-gradient-to-b from-white via-indigo-50/30 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-200 bg-indigo-50 shadow-sm text-sm font-medium text-indigo-700 mb-2">
              <Shield className="w-4 h-4 mr-2" />
              <span>Next-Gen Data Protection</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Secure Your Data with <span className="text-gradient">DNA Cryptography</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600">
              GeneCrypt transforms traditional encryption with genetic algorithms and DNA encoding, providing security that evolves and adapts to protect your most sensitive information.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <a 
                href="#crypto-tools" 
                className="gene-button-primary"
              >
                <Lock className="w-5 h-5" />
                <span>Start Encrypting</span>
              </a>
              <a 
                href="#how-it-works" 
                className="gene-button-outline"
              >
                <span>How It Works</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="pt-6 flex items-center text-sm text-slate-600">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              <span>Military-grade encryption for text, images, and audio files</span>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            
            <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">DNA Encryption</h3>
                  <p className="text-sm text-slate-600">Powered by genetic algorithms</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="h-10 bg-slate-100 rounded-lg animate-pulse-slow"></div>
                <div className="h-24 bg-slate-100 rounded-lg animate-pulse-slow" style={{ animationDelay: '0.2s' }}></div>
                <div className="grid grid-cols-4 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div 
                      key={i}
                      className="h-6 bg-indigo-100 rounded-md animate-pulse-slow"
                      style={{ animationDelay: `${i * 0.1 + 0.4}s` }}
                    ></div>
                  ))}
                </div>
                <div className="h-10 bg-blue-500 rounded-lg"></div>
              </div>
              
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                New
              </div>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-center text-sm text-slate-500 mb-6">Trusted by security professionals worldwide</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
            {['Company A', 'Company B', 'Company C', 'Company D', 'Company E'].map((company, index) => (
              <div key={index} className="text-slate-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

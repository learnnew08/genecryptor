
import React from 'react';
import { Dna } from 'lucide-react';

const ProcessingAnimation = ({ type }) => {
  const colorClass = type === 'encrypt' ? 'text-gene-accent' : 'text-gene-primary';
  const bgColorClass = type === 'encrypt' ? 'bg-gene-accent/10' : 'bg-gene-primary/10';
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className={`w-16 h-16 rounded-full ${bgColorClass} flex items-center justify-center mb-4`}>
        <Dna className={`w-8 h-8 ${colorClass} animate-pulse`} />
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${type === 'encrypt' ? 'bg-gene-accent' : 'bg-gene-primary'} animate-pulse-slow`}
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </div>
      
      <p className="text-gene-secondary font-medium">
        {type === 'encrypt' ? 'Encrypting Your Data' : 'Decrypting Your Data'}
      </p>
      <p className="text-sm text-gene-muted mt-1 text-center">
        {type === 'encrypt' 
          ? 'Applying DNA cryptography and genetic algorithms...' 
          : 'Processing genetic sequences to recover your data...'}
      </p>
    </div>
  );
};

export default ProcessingAnimation;

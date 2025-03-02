
import React from 'react';

const ProcessingAnimation = ({ type }) => {
  const colorClass = type === 'encrypt' ? 'bg-gene-accent' : 'bg-gene-primary';
  
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex items-center space-x-2 mb-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${colorClass} animate-pulse-slow`}
            style={{ animationDelay: `${index * 150}ms` }}
          />
        ))}
      </div>
      <p className="text-gene-muted text-sm">
        {type === 'encrypt' ? 'Encrypting' : 'Decrypting'}...
      </p>
      <p className="text-xs text-gene-muted mt-1">
        {type === 'encrypt' 
          ? 'Applying genetic algorithms to secure your data' 
          : 'Processing DNA sequences to recover your data'}
      </p>
    </div>
  );
};

export default ProcessingAnimation;


import React from 'react';
import { Dna } from 'lucide-react';

const ProcessingAnimation = ({ type }) => {
  const isEncrypt = type === 'encrypt';
  const baseColor = isEncrypt ? 'green' : 'blue';
  
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className={`w-20 h-20 rounded-full bg-${baseColor}-100 flex items-center justify-center mb-6 animate-pulse-slow`}>
        <Dna className={`w-10 h-10 text-${baseColor}-600 animate-dna-float`} />
      </div>
      
      <div className="flex items-center space-x-3 mb-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full bg-${baseColor}-500 animate-pulse-slow`}
            style={{ animationDelay: `${index * 200}ms` }}
          />
        ))}
      </div>
      
      <h3 className={`text-xl font-semibold text-${baseColor}-700 mb-2`}>
        {isEncrypt ? 'Encrypting Your Data' : 'Decrypting Your Data'}
      </h3>
      <p className="text-gray-600 max-w-md text-center">
        {isEncrypt 
          ? 'Transforming your data into DNA sequences and applying genetic algorithms...' 
          : 'Analyzing genetic sequences and reconstructing your original data...'}
      </p>
    </div>
  );
};

export default ProcessingAnimation;


import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

interface KeyInputProps {
  onChange: (key: string) => void;
  value: string;
}

const KeyInput: React.FC<KeyInputProps> = ({ onChange, value }) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="w-full">
      <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gene-secondary">
        <Key className="w-4 h-4" />
        Secret Key
      </label>
      
      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your secret key"
          className="gene-input pr-10"
        />
        
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gene-muted hover:text-gene-primary transition-colors"
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <p className="mt-2 text-xs text-gene-muted">
        Your key should be complex and unique. Never share your secret key with anyone.
      </p>
    </div>
  );
};

export default KeyInput;

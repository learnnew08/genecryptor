
import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

const KeyInput = ({ onChange, value }) => {
  const [showKey, setShowKey] = useState(false);

  return (
    <div className="w-full">
      <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700">
        <Key className="w-4 h-4" />
        Secret Key
      </label>
      
      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your secret key"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pr-10"
        />
        
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setShowKey(!showKey)}
        >
          {showKey ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <p className="mt-2 text-xs text-gray-500">
        Your key should be complex and unique. Never share your secret key with anyone.
      </p>
    </div>
  );
};

export default KeyInput;

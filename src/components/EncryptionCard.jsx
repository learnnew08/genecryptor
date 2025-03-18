
import React, { useState } from 'react';
import { Lock, Check, Info, AlertTriangle } from 'lucide-react';
import FileUpload from './FileUpload';
import KeyInput from './KeyInput';
import ProcessingAnimation from './ProcessingAnimation';
import { processFile } from '../utils/dna-crypto';
import { downloadFile, validateFileType } from '../utils/fileHelpers';
import { toast } from 'sonner';

const EncryptionCard = () => {
  const [selectedFileType, setSelectedFileType] = useState('text');
  const [selectedFile, setSelectedFile] = useState(null);
  const [secretKey, setSecretKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);

  const handleEncrypt = async () => {
    if (!selectedFile || !secretKey) {
      toast.error("Please select a file and enter a secret key");
      return;
    }
    
    if (!validateFileType(selectedFile, selectedFileType)) {
      toast.error(`Selected file is not a valid ${selectedFileType} file`);
      return;
    }
    
    setIsProcessing(true);
    setIsComplete(false);
    setError(null);
    
    try {
      // Process the file with DNA cryptography
      const result = await processFile(selectedFile, secretKey, true, selectedFileType);
      
      // Download the encrypted file
      downloadFile(result.data, result.filename, result.type, result.isBase64, result.isBinary);
      
      setIsProcessing(false);
      setIsComplete(true);
      toast.success("File encrypted successfully!");
      
      // Reset complete status after a delay
      setTimeout(() => {
        setIsComplete(false);
      }, 3000);
    } catch (err) {
      console.error("Encryption error:", err);
      setIsProcessing(false);
      setError(err.message || "Failed to encrypt file");
      toast.error("Failed to encrypt file: " + err.message);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
          <Lock className="w-5 h-5 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold">Encrypt Your Data</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block mb-3 text-sm font-medium text-gray-700">File Type</label>
          <div className="flex space-x-2">
            {[
              { type: 'text', label: 'Text' },
              { type: 'image', label: 'Image' },
              { type: 'audio', label: 'Audio' }
            ].map((item) => (
              <button
                key={item.type}
                className={`flex-1 px-4 py-2 rounded-xl border text-sm transition-all duration-300 
                ${selectedFileType === item.type 
                  ? 'border-green-500 bg-green-50 text-green-700' 
                  : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                onClick={() => {
                  setSelectedFileType(item.type);
                  setSelectedFile(null);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block mb-3 text-sm font-medium text-gray-700">Upload File</label>
          <FileUpload 
            fileType={selectedFileType} 
            onFileSelect={setSelectedFile} 
          />
        </div>
        
        <KeyInput 
          value={secretKey} 
          onChange={setSecretKey} 
        />
        
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-700 font-medium">Encryption Failed</p>
              <p className="text-xs text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}
        
        {isProcessing ? (
          <ProcessingAnimation type="encrypt" />
        ) : isComplete ? (
          <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-medium text-gray-900">Encryption Complete!</p>
            <p className="text-sm text-gray-500 mt-1">Your file has been securely encrypted and downloaded</p>
          </div>
        ) : (
          <button
            onClick={handleEncrypt}
            disabled={!selectedFile || !secretKey}
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300 ${
              !selectedFile || !secretKey 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700'
            }`}
          >
            Encrypt File
          </button>
        )}
        
        <div className="p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700 font-medium">Enhanced Security</p>
            <p className="text-xs text-gray-500 mt-1">
              Your file will be encrypted using DNA Cryptography and Adaptive Genetic Algorithm, providing superior protection compared to traditional methods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionCard;

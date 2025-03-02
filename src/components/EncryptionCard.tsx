
import React, { useState } from 'react';
import { Lock, Check, Info } from 'lucide-react';
import FileUpload from './FileUpload';
import KeyInput from './KeyInput';
import ProcessingAnimation from './ProcessingAnimation';

type FileType = 'text' | 'image' | 'audio';

const EncryptionCard: React.FC = () => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [secretKey, setSecretKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleEncrypt = () => {
    if (!selectedFile || !secretKey) return;
    
    setIsProcessing(true);
    setIsComplete(false);
    
    // Simulate encryption process
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // Reset complete status after a delay
      setTimeout(() => {
        setIsComplete(false);
      }, 3000);
    }, 2500);
  };

  return (
    <div className="gene-card w-full h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gene-accent/10 flex items-center justify-center">
          <Lock className="w-5 h-5 text-gene-accent" />
        </div>
        <h3 className="text-xl font-display font-semibold">Encrypt Your Data</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block mb-3 text-sm font-medium text-gene-secondary">File Type</label>
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
                  ? 'border-gene-accent bg-gene-accent/5 text-gene-accent' 
                  : 'border-gene-border text-gene-muted hover:bg-gene-border/20'}`}
                onClick={() => {
                  setSelectedFileType(item.type as FileType);
                  setSelectedFile(null);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block mb-3 text-sm font-medium text-gene-secondary">Upload File</label>
          <FileUpload 
            fileType={selectedFileType} 
            onFileSelect={setSelectedFile} 
          />
        </div>
        
        <KeyInput 
          value={secretKey} 
          onChange={setSecretKey} 
        />
        
        {isProcessing ? (
          <ProcessingAnimation type="encrypt" />
        ) : isComplete ? (
          <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-medium text-gene-primary">Encryption Complete!</p>
            <p className="text-sm text-gene-muted mt-1">Your file has been securely encrypted</p>
            <button 
              className="mt-4 px-4 py-2 bg-gene-accent text-white rounded-xl text-sm hover:bg-gene-accent/90 transition-colors"
            >
              Download Encrypted File
            </button>
          </div>
        ) : (
          <button
            onClick={handleEncrypt}
            disabled={!selectedFile || !secretKey}
            className={`w-full gene-button-primary ${
              !selectedFile || !secretKey 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gene-secondary'
            }`}
          >
            Encrypt File
          </button>
        )}
        
        <div className="p-4 rounded-xl bg-gene-accent/5 border border-gene-accent/10 flex items-start gap-3">
          <Info className="w-5 h-5 text-gene-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gene-secondary font-medium">Enhanced Security</p>
            <p className="text-xs text-gene-muted mt-1">
              Your file will be encrypted using DNA Cryptography and Adaptive Genetic Algorithm, providing superior protection compared to traditional methods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncryptionCard;

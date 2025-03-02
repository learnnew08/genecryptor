
import React, { useState } from 'react';
import { KeyRound, Check, Info } from 'lucide-react';
import FileUpload from './FileUpload';
import KeyInput from './KeyInput';
import ProcessingAnimation from './ProcessingAnimation';

type FileType = 'text' | 'image' | 'audio';

const DecryptionCard: React.FC = () => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [secretKey, setSecretKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleDecrypt = () => {
    if (!selectedFile || !secretKey) return;
    
    setIsProcessing(true);
    setIsComplete(false);
    
    // Simulate decryption process
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
        <div className="w-10 h-10 rounded-xl bg-gene-primary/10 flex items-center justify-center">
          <KeyRound className="w-5 h-5 text-gene-primary" />
        </div>
        <h3 className="text-xl font-display font-semibold">Decrypt Your Data</h3>
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
                  ? 'border-gene-primary bg-gene-primary/5 text-gene-primary' 
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
          <label className="block mb-3 text-sm font-medium text-gene-secondary">Upload Encrypted File</label>
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
          <ProcessingAnimation type="decrypt" />
        ) : isComplete ? (
          <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-medium text-gene-primary">Decryption Complete!</p>
            <p className="text-sm text-gene-muted mt-1">Your file has been successfully decrypted</p>
            <button 
              className="mt-4 px-4 py-2 bg-gene-primary text-white rounded-xl text-sm hover:bg-gene-secondary transition-colors"
            >
              Download Original File
            </button>
          </div>
        ) : (
          <button
            onClick={handleDecrypt}
            disabled={!selectedFile || !secretKey}
            className={`w-full gene-button-primary ${
              !selectedFile || !secretKey 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-gene-secondary'
            }`}
          >
            Decrypt File
          </button>
        )}
        
        <div className="p-4 rounded-xl bg-gene-primary/5 border border-gene-primary/10 flex items-start gap-3">
          <Info className="w-5 h-5 text-gene-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gene-secondary font-medium">Secure Decryption</p>
            <p className="text-xs text-gene-muted mt-1">
              Only files encrypted with GeneCrypt can be decrypted here. Ensure you use the same secret key that was used for encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecryptionCard;


import React, { useState } from 'react';
import { KeyRound, Check, Info, AlertTriangle } from 'lucide-react';
import FileUpload from './FileUpload';
import KeyInput from './KeyInput';
import ProcessingAnimation from './ProcessingAnimation';
import { processFile, decodeEncryptedString } from '../utils/dnaCrypto';
import { downloadFile } from '../utils/fileHelpers';
import { toast } from 'sonner';

const DecryptionCard = () => {
  const [selectedFileType, setSelectedFileType] = useState('text');
  const [selectedFile, setSelectedFile] = useState(null);
  const [secretKey, setSecretKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState(null);
  const [directDecrypt, setDirectDecrypt] = useState(false);
  const [encryptedString, setEncryptedString] = useState('');
  const [decryptedResult, setDecryptedResult] = useState(null);

  const handleDecrypt = async () => {
    if (directDecrypt) {
      if (!encryptedString || !secretKey) {
        toast.error("Please enter the encrypted string and a secret key");
        return;
      }
      
      setIsProcessing(true);
      setIsComplete(false);
      setError(null);
      setDecryptedResult(null);
      
      try {
        console.log("Direct decryption of string:", encryptedString);
        const result = decodeEncryptedString(encryptedString, secretKey);
        setDecryptedResult(result);
        setIsProcessing(false);
        setIsComplete(true);
        toast.success("String decrypted successfully!");
        
        setTimeout(() => {
          setIsComplete(false);
        }, 3000);
      } catch (err) {
        console.error("Decryption error:", err);
        setIsProcessing(false);
        setError(err.message || "Failed to decrypt string");
        toast.error("Failed to decrypt: " + (err.message || "Invalid secret key or format"));
      }
      return;
    }
    
    if (!selectedFile || !secretKey) {
      toast.error("Please select a file and enter a secret key");
      return;
    }
    
    setIsProcessing(true);
    setIsComplete(false);
    setError(null);
    setDecryptedResult(null);
    
    try {
      console.log("Decryption started with file type:", selectedFileType);
      console.log("File:", selectedFile.name, "Size:", selectedFile.size);
      
      // Process the file with DNA cryptography
      const result = await processFile(selectedFile, secretKey, false, selectedFileType);
      
      console.log("Decryption complete. Result type:", result.type);
      
      // Download the decrypted file
      downloadFile(result.data, result.filename, result.type, result.isBase64);
      
      setIsProcessing(false);
      setIsComplete(true);
      toast.success("File decrypted successfully!");
      
      // Reset complete status after a delay
      setTimeout(() => {
        setIsComplete(false);
      }, 3000);
    } catch (err) {
      console.error("Decryption error:", err);
      setIsProcessing(false);
      setError(err.message || "Failed to decrypt file. Make sure you're using the correct secret key and that this is a valid encrypted file.");
      toast.error("Failed to decrypt file: " + (err.message || "Invalid secret key or file format"));
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm w-full h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
          <KeyRound className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold">Decrypt Your Data</h3>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <button
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
              ${!directDecrypt 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            onClick={() => setDirectDecrypt(false)}
          >
            File Decryption
          </button>
          <button
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
              ${directDecrypt 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            onClick={() => setDirectDecrypt(true)}
          >
            String Decryption
          </button>
        </div>
        
        {!directDecrypt ? (
          <>
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
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
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
              <label className="block mb-3 text-sm font-medium text-gray-700">Upload Encrypted File</label>
              <FileUpload 
                fileType={selectedFileType} 
                onFileSelect={setSelectedFile} 
              />
            </div>
          </>
        ) : (
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">Encrypted String</label>
            <textarea
              value={encryptedString}
              onChange={(e) => setEncryptedString(e.target.value)}
              placeholder="Paste the encrypted string here"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              rows={4}
            />
          </div>
        )}
        
        <KeyInput 
          value={secretKey} 
          onChange={setSecretKey} 
        />
        
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-700 font-medium">Decryption Failed</p>
              <p className="text-xs text-red-600 mt-1">{error}</p>
            </div>
          </div>
        )}
        
        {decryptedResult && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-sm font-medium text-gray-700 mb-2">Decrypted Result:</p>
            <div className="bg-white p-3 rounded-lg border border-green-100 text-gray-800 font-mono text-sm break-all">
              {decryptedResult}
            </div>
          </div>
        )}
        
        {isProcessing ? (
          <ProcessingAnimation type="decrypt" />
        ) : isComplete ? (
          <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-medium text-gray-900">Decryption Complete!</p>
            <p className="text-sm text-gray-500 mt-1">
              {directDecrypt 
                ? "Your string has been successfully decrypted" 
                : "Your file has been successfully decrypted and downloaded"}
            </p>
          </div>
        ) : (
          <button
            onClick={handleDecrypt}
            disabled={(!selectedFile && !directDecrypt) || (!encryptedString && directDecrypt) || !secretKey}
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-300 ${
              (!selectedFile && !directDecrypt) || (!encryptedString && directDecrypt) || !secretKey
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:bg-blue-700'
            }`}
          >
            Decrypt {directDecrypt ? 'String' : 'File'}
          </button>
        )}
        
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-700 font-medium">Secure Decryption</p>
            <p className="text-xs text-gray-500 mt-1">
              Only files encrypted with GeneCrypt can be decrypted here. Ensure you use the same secret key that was used for encryption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecryptionCard;

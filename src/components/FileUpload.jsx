
import React, { useState, useRef } from 'react';
import { FileUp, File, Image, Music, X, Lock } from 'lucide-react';
import { validateFileType } from '../utils/fileHelpers';
import { toast } from 'sonner';

const FileUpload = ({ fileType, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const acceptMap = {
    text: '.txt,.doc,.docx,.pdf,.encrypted',
    image: 'image/*,.encrypted',
    audio: 'audio/*,.encrypted'
  };

  const iconMap = {
    text: <File className="w-10 h-10 text-gray-400" />,
    image: <Image className="w-10 h-10 text-gray-400" />,
    audio: <Music className="w-10 h-10 text-gray-400" />,
    encrypted: <Lock className="w-10 h-10 text-blue-500" />
  };

  const typeText = {
    text: 'text file',
    image: 'image',
    audio: 'audio file'
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    
    // Check if file is valid for the selected type (unless it's an encrypted file)
    if (!file.name.endsWith('.encrypted') && !validateFileType(file, fileType)) {
      toast.error(`Selected file is not a valid ${fileType} file`);
      return;
    }
    
    setSelectedFile(file);
    onFileSelect(file);
    
    // Create preview for images
    if (fileType === 'image' && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          className={`w-full h-40 flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-gray-50 cursor-pointer transition-colors px-6 py-8 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-100'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <FileUp className="w-10 h-10 text-gray-400 mb-3" />
          <p className="text-gray-500 mb-1">
            Drag and drop your {typeText[fileType]} here
          </p>
          <p className="text-gray-500 text-sm">
            or <span className="text-blue-500">browse files</span>
          </p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept={acceptMap[fileType]}
            className="hidden"
          />
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col items-center">
          {preview && fileType === 'image' ? (
            <div className="relative w-full h-36 mb-4">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ) : (
            <div className="mb-4">
              {selectedFile.name.endsWith('.encrypted') 
                ? iconMap.encrypted
                : iconMap[fileType]}
            </div>
          )}
          
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 truncate">
              <p className="font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

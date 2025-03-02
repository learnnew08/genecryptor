
import React, { useState, useRef } from 'react';
import { FileUp, File, Image, Music, X } from 'lucide-react';

type FileType = 'text' | 'image' | 'audio';

interface FileUploadProps {
  fileType: FileType;
  onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ fileType, onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptMap = {
    text: '.txt,.doc,.docx,.pdf',
    image: 'image/*',
    audio: 'audio/*'
  };

  const iconMap = {
    text: <File className="w-10 h-10 text-gene-muted" />,
    image: <Image className="w-10 h-10 text-gene-muted" />,
    audio: <Music className="w-10 h-10 text-gene-muted" />
  };

  const typeText = {
    text: 'text file',
    image: 'image',
    audio: 'audio file'
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    onFileSelect(file);
    
    // Create preview for images
    if (fileType === 'image' && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else if (fileType === 'audio' && file.type.startsWith('audio/')) {
      // For audio files, we could create an audio element preview if needed
      setPreview(null);
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
          className={`file-drop-area ${isDragging ? 'active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <FileUp className="w-10 h-10 text-gene-muted mb-3" />
          <p className="text-gene-muted mb-1">
            Drag and drop your {typeText[fileType]} here
          </p>
          <p className="text-gene-muted text-sm">
            or <span className="text-gene-accent">browse files</span>
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
        <div className="gene-card flex flex-col items-center justify-center p-4 animate-slide-up">
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
              {iconMap[fileType]}
            </div>
          )}
          
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1 truncate">
              <p className="font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-gene-muted">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              className="p-1 rounded-full hover:bg-gene-border/50 transition-colors"
            >
              <X className="w-5 h-5 text-gene-muted" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

import { encryptData, decryptData } from './encryption.js';

// Process files for encryption and decryption
const processTextFile = async (file, secretKey, isEncrypt) => {
  console.log("Processing text file...");
  
  try {
    // For text files, we can handle them directly
    const text = await file.text();
    
    if (isEncrypt) {
      console.log("Encrypting text with length:", text.length);
      const encryptedDNA = encryptData(text, secretKey);
      console.log("Encrypted data length:", encryptedDNA.length);
      
      // Store file type in metadata
      const metadata = { type: file.type || 'text/plain' };
      const encodedMetadata = btoa(JSON.stringify(metadata));
      const dataWithMetadata = `META:${encodedMetadata}:${encryptedDNA}`;
      
      return { 
        data: dataWithMetadata, 
        type: 'text/plain', 
        filename: `${file.name}.encrypted` 
      };
    } else {
      console.log("Decrypting text with length:", text.length);
      
      // Check if the file has metadata
      let actualData = text;
      let originalType = 'text/plain';
      
      if (text.startsWith('META:')) {
        // Extract metadata and content
        const parts = text.split(':', 3);
        if (parts.length >= 3) {
          try {
            const metadataJson = atob(parts[1]);
            const metadata = JSON.parse(metadataJson);
            originalType = metadata.type || originalType;
            actualData = parts.slice(2).join(':');
          } catch (e) {
            console.warn("Failed to parse metadata:", e);
            // If metadata parsing fails, use the whole content
            actualData = text;
          }
        }
      } else if (text.startsWith('GENECRYPT_V1:')) {
        // Old format without metadata
        actualData = text;
      }
      
      const decryptedText = decryptData(actualData, secretKey);
      console.log("Decrypted text length:", decryptedText.length);
      
      return { 
        data: decryptedText, 
        type: originalType, 
        filename: file.name.replace('.encrypted', '') 
      };
    }
  } catch (error) {
    console.error("Error processing text file:", error);
    throw error;
  }
};

// Process binary files (PDF, DOC, etc.)
const processBinaryFile = async (file, secretKey, isEncrypt) => {
  console.log("Processing binary file:", file.type);
  
  try {
    if (isEncrypt) {
      // Convert binary file to base64
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      console.log("Binary file base64 length before encryption:", base64.length);
      
      // Store the file's MIME type
      const originalType = file.type || 'application/octet-stream';
      console.log("Original file type:", originalType);
      
      const encryptedDNA = encryptData(base64, secretKey);
      console.log("Encrypted data length:", encryptedDNA.length);
      
      // Include metadata in the encrypted content
      const metadataString = JSON.stringify({ type: originalType });
      const encodedMetadata = btoa(metadataString);
      const dataWithMetadata = `META:${encodedMetadata}:${encryptedDNA}`;
      
      return { 
        data: dataWithMetadata, 
        type: 'text/plain', 
        filename: `${file.name}.encrypted`
      };
    } else {
      // For decryption, read the encrypted content with metadata
      const encryptedContent = await file.text();
      console.log("Decrypting binary file, encrypted length:", encryptedContent.length);
      
      // Parse metadata and encrypted data
      let metadata = { type: 'application/octet-stream' };
      let encryptedData = encryptedContent;
      
      if (encryptedContent.startsWith('META:')) {
        const parts = encryptedContent.split(':', 3);
        if (parts.length >= 3) {
          try {
            const metadataJson = atob(parts[1]);
            metadata = JSON.parse(metadataJson);
            encryptedData = parts.slice(2).join(':');
          } catch (e) {
            console.warn("Failed to parse metadata:", e);
            // If metadata parsing fails, use the whole content
            encryptedData = encryptedContent;
          }
        }
      } else if (encryptedContent.startsWith('GENECRYPT_V1:')) {
        // Old format
        encryptedData = encryptedContent;
      }
      
      console.log("Attempting to decrypt binary data");
      const decryptedBase64 = decryptData(encryptedData, secretKey);
      console.log("Decrypted base64 length:", decryptedBase64.length);
      
      return { 
        data: decryptedBase64, 
        type: metadata.type,
        filename: file.name.replace('.encrypted', ''),
        isBase64: true,
        isBinary: true
      };
    }
  } catch (error) {
    console.error("Error processing binary file:", error);
    throw new Error(`Failed to process binary file: ${error.message}`);
  }
};

const processImageFile = async (file, secretKey, isEncrypt) => {
  console.log("Processing image file...");
  
  if (isEncrypt) {
    // Convert image to base64 for processing
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    console.log("Image base64 length before encryption:", base64.length);
    
    // Store the image mime type
    const originalType = file.type;
    console.log("Original image type:", originalType);
    
    const encryptedDNA = encryptData(base64, secretKey);
    console.log("Encrypted image data length:", encryptedDNA.length);
    
    // Include metadata in the encrypted content
    const metadataString = JSON.stringify({ type: originalType });
    const encodedMetadata = btoa(metadataString);
    const dataWithMetadata = `${encodedMetadata}:${encryptedDNA}`;
    
    return { 
      data: dataWithMetadata, 
      type: 'text/plain', 
      filename: `${file.name}.encrypted`
    };
  } else {
    // For decryption, read the encrypted content with metadata
    const encryptedContent = await file.text();
    console.log("Decrypting image file, encrypted length:", encryptedContent.length);
    
    try {
      // Parse metadata and encrypted data
      const [encodedMetadata, encryptedData] = encryptedContent.includes(':') ? 
                                              encryptedContent.split(':', 2) : 
                                              [null, encryptedContent];
                                              
      let imageType = 'image/png'; // Default
      
      // Try to decode metadata if available
      if (encodedMetadata && !encodedMetadata.startsWith('GENECRYPT_V1')) {
        try {
          const metadataString = atob(encodedMetadata);
          const metadata = JSON.parse(metadataString);
          imageType = metadata.type || imageType;
          console.log("Extracted image type from metadata:", imageType);
        } catch (e) {
          console.warn("Could not parse metadata, using default image type:", imageType);
        }
      }
      
      // Handle case where there's no metadata but has GENECRYPT_V1 header
      const actualData = encryptedData && encryptedData.length > 0 ? 
                        encryptedData : 
                        encryptedContent.startsWith('GENECRYPT_V1') ? 
                        encryptedContent : 
                        `GENECRYPT_V1:${encryptedContent}`;
      
      console.log("Attempting to decrypt data:", actualData.substring(0, 50) + "...");
      const decryptedBase64 = decryptData(actualData, secretKey);
      console.log("Decrypted base64 length:", decryptedBase64.length);
      
      // Ensure the decrypted base64 is correctly formatted for the data URI
      const base64ForDataUri = decryptedBase64.indexOf(',') >= 0 ? 
                              decryptedBase64 : 
                              decryptedBase64;
      
      return { 
        data: base64ForDataUri, 
        type: imageType,
        filename: file.name.replace('.encrypted', ''),
        isBase64: true
      };
    } catch (error) {
      console.error("Error during image decryption:", error);
      throw new Error(`Failed to decrypt image: ${error.message}`);
    }
  }
};

const processAudioFile = async (file, secretKey, isEncrypt) => {
  console.log("Processing audio file...");
  
  if (isEncrypt) {
    // Convert audio to base64 for processing
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    console.log("Audio base64 length before encryption:", base64.length);
    
    const encryptedDNA = encryptData(base64, secretKey);
    console.log("Encrypted audio data length:", encryptedDNA.length);
    return { 
      data: encryptedDNA, 
      type: 'text/plain', 
      filename: `${file.name}.encrypted`,
      originalType: file.type  // Store original type for decryption
    };
  } else {
    // For decryption, read the encrypted content
    const encryptedContent = await file.text();
    console.log("Decrypting audio file, encrypted length:", encryptedContent.length);
    
    const decryptedBase64 = decryptData(encryptedContent, secretKey);
    console.log("Decrypted base64 length:", decryptedBase64.length);
    
    return { 
      data: decryptedBase64, 
      type: 'audio/mpeg', // Default to mp3, user can rename as needed
      filename: file.name.replace('.encrypted', ''),
      isBase64: true
    };
  }
};

export const processFile = async (file, secretKey, isEncrypt, fileType) => {
  if (!file || !secretKey) {
    throw new Error('File and secret key are required');
  }
  
  console.log(`Processing ${fileType} file for ${isEncrypt ? 'encryption' : 'decryption'}`);
  
  // Handle file based on type
  if (fileType === 'text') {
    // Check for PDF or DOC files which need binary processing
    const binaryTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (binaryTypes.includes(file.type) && !file.name.endsWith('.encrypted')) {
      return processBinaryFile(file, secretKey, isEncrypt);
    }
    
    // For text files and encrypted files being decrypted
    return processTextFile(file, secretKey, isEncrypt);
  } else if (fileType === 'image') {
    return processImageFile(file, secretKey, isEncrypt);
  } else if (fileType === 'audio') {
    return processAudioFile(file, secretKey, isEncrypt);
  } else {
    throw new Error('Unsupported file type');
  }
};

// Add the missing extractFileContent function
export const extractFileContent = async (file) => {
  try {
    if (!file) {
      throw new Error('No file provided');
    }
    
    const content = await file.text();
    return content;
  } catch (error) {
    console.error('Error extracting file content:', error);
    throw new Error('Failed to extract file content: ' + error.message);
  }
};

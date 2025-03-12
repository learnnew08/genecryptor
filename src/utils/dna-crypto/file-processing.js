import { encryptData, decryptData } from './encryption.js';

// Process files for encryption and decryption
const processTextFile = async (file, secretKey, isEncrypt) => {
  console.log("Processing text file...");
  const text = await file.text();
  
  if (isEncrypt) {
    console.log("Encrypting text with length:", text.length);
    const encryptedDNA = encryptData(text, secretKey);
    console.log("Encrypted data length:", encryptedDNA.length);
    return { data: encryptedDNA, type: 'text/plain', filename: `${file.name}.encrypted` };
  } else {
    console.log("Decrypting text with length:", text.length);
    const decryptedText = decryptData(text, secretKey);
    console.log("Decrypted text length:", decryptedText.length);
    return { data: decryptedText, type: 'text/plain', filename: file.name.replace('.encrypted', '') };
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
      const actualData = encryptedData && encryptedData.startsWith('GENECRYPT_V1') ? 
                        encryptedData : 
                        encryptedContent.startsWith('GENECRYPT_V1') ? 
                        encryptedContent : 
                        `GENECRYPT_V1:${encryptedContent}`;
      
      const decryptedBase64 = decryptData(actualData, secretKey);
      console.log("Decrypted base64 length:", decryptedBase64.length);
      
      return { 
        data: decryptedBase64, 
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
  
  // Process based on file type
  if (fileType === 'text') {
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

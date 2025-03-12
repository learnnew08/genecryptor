
// Main export file for DNA Cryptography utilities
import { encryptWithDNA, decryptWithDNA } from './encryption.js';
import { processFile, extractFileContent } from './file-processing.js';
import { asciiToDNA, dnaToAscii } from './conversion.js';

// Function to decode an encrypted string for direct string decryption
export const decodeEncryptedString = (encrypted, key) => {
  try {
    console.log("Decoding encrypted string:", encrypted);
    return decryptWithDNA(encrypted, key);
  } catch (error) {
    console.error("Error decoding string:", error);
    throw new Error('Failed to decode string: ' + error.message);
  }
};

// Export all necessary functions
export {
  encryptWithDNA,
  decryptWithDNA,
  processFile,
  extractFileContent,
  asciiToDNA,
  dnaToAscii
};

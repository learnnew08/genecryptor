
// Main entry point for DNA cryptography module
import { processFile } from './file-processing.js';
import { encryptData, decryptData } from './encryption.js';

// Export decoding utility for string decryption (for testing)
export const decodeEncryptedString = (encryptedString, secretKey) => {
  return decryptData(encryptedString, secretKey);
};

// Export main functions
export { processFile, encryptData, decryptData };

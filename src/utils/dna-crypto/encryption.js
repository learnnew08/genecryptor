
// DNA Encryption Algorithms
import { dnaToAscii, asciiToDNA } from './conversion.js';
import { applyGeneticAlgorithm } from './genetic.js';
import { dnaXOR } from './xor.js';
import { DNA_BASES, KEY_LENGTH_MIN } from './constants.js';

/**
 * Encrypts a string using DNA-based cryptography
 * @param {string} input - Plain text to encrypt
 * @param {string} key - Secret key
 * @returns {string} - Encrypted text
 */
export const encryptWithDNA = (input, key) => {
  if (!input || !key) {
    throw new Error('Input and key are required');
  }
  
  if (key.length < KEY_LENGTH_MIN) {
    throw new Error(`Key must be at least ${KEY_LENGTH_MIN} characters long`);
  }
  
  try {
    // Convert input to DNA sequence
    const dnaSequence = asciiToDNA(input);
    
    // Apply genetic algorithm to strengthen encryption
    const evolvedSequence = applyGeneticAlgorithm(dnaSequence, key);
    
    // Apply XOR with the key
    const encryptedSequence = dnaXOR(evolvedSequence, key);
    
    // Return base64 encoded result for safe transmission
    const safeEncoded = btoa(encryptedSequence);
    console.log("Successfully encrypted with DNA, base64 length:", safeEncoded.length);
    return safeEncoded;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Encryption failed: ' + error.message);
  }
};

/**
 * Decrypts a string using DNA-based cryptography
 * @param {string} encrypted - Encrypted text
 * @param {string} key - Secret key
 * @returns {string} - Decrypted plain text
 */
export const decryptWithDNA = (encrypted, key) => {
  if (!encrypted || !key) {
    throw new Error('Encrypted text and key are required');
  }
  
  try {
    // Check if it starts with protocol identifier
    let encryptedContent = encrypted;
    if (encrypted.startsWith('GENECRYPT_V1:')) {
      encryptedContent = encrypted.substring(12); // Remove the prefix
    }
    
    // Decode from base64, with error handling
    let encryptedSequence;
    try {
      encryptedSequence = atob(encryptedContent);
    } catch (e) {
      console.error('Base64 decoding failed:', e);
      // Check if string needs padding
      const padded = encryptedContent.padEnd(Math.ceil(encryptedContent.length / 4) * 4, '=');
      try {
        encryptedSequence = atob(padded);
      } catch (e2) {
        throw new Error('Invalid base64 encoding in encrypted data');
      }
    }
    
    // Reverse XOR with the key
    const evolvedSequence = dnaXOR(encryptedSequence, key);
    
    // Reverse genetic algorithm effects
    const dnaSequence = applyGeneticAlgorithm(evolvedSequence, key, true);
    
    // Convert DNA back to ASCII
    const decrypted = dnaToAscii(dnaSequence);
    
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Decryption failed: ' + error.message);
  }
};

// Add the missing encryptData and decryptData functions used in file-processing.js
export const encryptData = (data, key) => {
  return encryptWithDNA(data, key);
};

export const decryptData = (encryptedData, key) => {
  return decryptWithDNA(encryptedData, key);
};

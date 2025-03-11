
// XOR operation for DNA sequences
// This file provides utilities for XOR operations on DNA data

/**
 * Performs XOR operation on DNA sequences
 * @param {string} dnaSequence - DNA sequence (containing A, T, G, C)
 * @param {string} key - Key to XOR with
 * @returns {string} - XORed DNA sequence
 */
export const dnaXOR = (dnaSequence, key) => {
  let result = '';
  const keyLength = key.length;
  
  for (let i = 0; i < dnaSequence.length; i++) {
    // Use circular key for XOR
    const keyChar = key[i % keyLength];
    // XOR the ASCII values and convert back to character
    const xorValue = dnaSequence.charCodeAt(i) ^ keyChar.charCodeAt(0);
    result += String.fromCharCode(xorValue);
  }
  
  return result;
};

/**
 * Helper function to verify DNA sequence integrity
 * @param {string} sequence - DNA sequence to verify
 * @returns {boolean} - Whether the sequence is valid
 */
export const verifyDNASequence = (sequence) => {
  // Valid DNA sequence should only contain A, T, G, C
  const validChars = new Set(['A', 'T', 'G', 'C']);
  for (const char of sequence) {
    if (!validChars.has(char)) {
      return false;
    }
  }
  return true;
};

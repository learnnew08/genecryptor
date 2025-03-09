
import { ENCRYPTION_HEADER } from './constants.js';
import { textToBinary, binaryToDNA, dnaToBinary, binaryToText } from './conversion.js';
import { generateEncryptionKey } from './genetic.js';
import { dnaXOR, reverseXOR } from './xor.js';

// Encrypt data using DNA encryption
export const encryptData = (data, secretKey) => {
  console.log("Encrypting data with secret key, data length:", data.length);
  
  // Convert data to binary and then to DNA
  const binaryData = textToBinary(data);
  const dnaData = binaryToDNA(binaryData);
  console.log("DNA representation length:", dnaData.length);
  
  // Generate encryption key
  const encryptionKey = generateEncryptionKey(secretKey, dnaData.length);
  
  // DNA XOR encryption
  let encryptedDNA = '';
  for (let i = 0; i < dnaData.length; i++) {
    const dataNucleotide = dnaData[i];
    const keyNucleotide = encryptionKey[i % encryptionKey.length];
    
    if (dnaXOR[keyNucleotide] && dnaXOR[keyNucleotide][dataNucleotide]) {
      encryptedDNA += dnaXOR[keyNucleotide][dataNucleotide];
    } else {
      // Fallback if invalid nucleotides
      encryptedDNA += dataNucleotide;
    }
  }
  
  // Add header for verification during decryption
  return `${ENCRYPTION_HEADER}:${encryptedDNA}`;
};

// Decrypt data using DNA decryption
export const decryptData = (encryptedData, secretKey) => {
  console.log("Decrypting data with secret key");
  
  // Verify and remove header
  if (!encryptedData.startsWith(ENCRYPTION_HEADER)) {
    console.error("Invalid encrypted data format - missing header");
    throw new Error("Invalid encrypted data format");
  }
  
  const encryptedDNA = encryptedData.substring(ENCRYPTION_HEADER.length + 1);
  console.log("Encrypted DNA length:", encryptedDNA.length);
  
  // Generate the same encryption key using the secret key
  const encryptionKey = generateEncryptionKey(secretKey, encryptedDNA.length);
  console.log("Generated decryption key length:", encryptionKey.length);
  
  // DNA XOR decryption
  let decryptedDNA = '';
  for (let i = 0; i < encryptedDNA.length; i++) {
    const encryptedNucleotide = encryptedDNA[i];
    const keyNucleotide = encryptionKey[i % encryptionKey.length];
    
    if (reverseXOR[keyNucleotide] && reverseXOR[keyNucleotide][encryptedNucleotide]) {
      decryptedDNA += reverseXOR[keyNucleotide][encryptedNucleotide];
    } else {
      // Fallback if invalid nucleotides
      decryptedDNA += encryptedNucleotide;
    }
  }
  
  console.log("Decrypted DNA length:", decryptedDNA.length);
  
  // Convert DNA back to binary and then to text
  const decryptedBinary = dnaToBinary(decryptedDNA);
  const decryptedText = binaryToText(decryptedBinary);
  console.log("Decrypted text length:", decryptedText.length);
  
  return decryptedText;
};

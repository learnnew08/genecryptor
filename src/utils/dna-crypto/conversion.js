
import { nucleotideMap, reverseNucleotideMap } from './constants.js';

// Convert text to binary
export const textToBinary = (text) => {
  console.log("Converting text to binary, length:", text.length);
  return text.split('').map(char => {
    const binary = char.charCodeAt(0).toString(2);
    return binary.padStart(8, '0');
  }).join('');
};

// Convert binary to text
export const binaryToText = (binary) => {
  console.log("Converting binary to text, binary length:", binary.length);
  // Ensure binary string length is a multiple of 8
  const paddedBinary = binary.padEnd(Math.ceil(binary.length / 8) * 8, '0');
  
  const chunks = paddedBinary.match(/.{1,8}/g) || [];
  return chunks.map(chunk => {
    if (chunk.length === 8) {
      return String.fromCharCode(parseInt(chunk, 2));
    }
    return '';
  }).join('');
};

// Convert binary to DNA sequence
export const binaryToDNA = (binary) => {
  console.log("Converting binary to DNA, binary length:", binary.length);
  // Ensure binary length is even
  const paddedBinary = binary.length % 2 === 0 ? binary : binary + '0';
  
  const pairs = paddedBinary.match(/.{1,2}/g) || [];
  return pairs.map(pair => nucleotideMap[pair] || 'A').join('');
};

// Convert DNA sequence to binary
export const dnaToBinary = (dna) => {
  console.log("Converting DNA to binary, DNA length:", dna.length);
  return dna.split('').map(nucleotide => {
    // Return the binary representation or default to '00' if nucleotide is invalid
    return reverseNucleotideMap[nucleotide] || '00';
  }).join('');
};

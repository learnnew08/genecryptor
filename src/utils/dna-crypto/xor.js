
import { dnaXOR } from './constants.js';

// Build reverse XOR for decryption
export const buildReverseXOR = () => {
  const reverseXOR = {'A':{}, 'G':{}, 'C':{}, 'T':{}};
  
  for (const keyNucleotide in dnaXOR) {
    for (const dataNucleotide in dnaXOR[keyNucleotide]) {
      const result = dnaXOR[keyNucleotide][dataNucleotide];
      if (!reverseXOR[keyNucleotide][result]) {
        reverseXOR[keyNucleotide][result] = dataNucleotide;
      }
    }
  }
  
  return reverseXOR;
};

export const reverseXOR = buildReverseXOR();

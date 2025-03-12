
// DNA Cryptography constants

// DNA nucleotide mapping for binary conversion
export const nucleotideMap = {
  '00': 'A',
  '01': 'G',
  '10': 'C',
  '11': 'T'
};

export const reverseNucleotideMap = {
  'A': '00',
  'G': '01',
  'C': '10',
  'T': '11'
};

// DNA XOR encryption/decryption - direct nucleotide substitution
export const dnaXOR = {
  // Simple 1-to-1 substitution tables for each key nucleotide
  'A': {'A': 'A', 'G': 'G', 'C': 'C', 'T': 'T'},
  'G': {'A': 'G', 'G': 'A', 'C': 'T', 'T': 'C'},
  'C': {'A': 'C', 'G': 'T', 'C': 'A', 'T': 'G'},
  'T': {'A': 'T', 'G': 'C', 'C': 'G', 'T': 'A'}
};

// Add file format identifier for metadata
export const ENCRYPTION_HEADER = "GENECRYPT_V1";

// Add the missing constants
export const DNA_BASES = ['A', 'G', 'C', 'T'];
export const KEY_LENGTH_MIN = 8;

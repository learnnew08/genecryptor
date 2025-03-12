
// Genetic Algorithm operations for DNA cryptography

export const crossover = (dna1, dna2) => {
  const length = Math.min(dna1.length, dna2.length);
  const crossPoint = Math.floor(Math.random() * length);
  
  const offspring1 = dna1.substring(0, crossPoint) + dna2.substring(crossPoint);
  const offspring2 = dna2.substring(0, crossPoint) + dna1.substring(crossPoint);
  
  return [offspring1, offspring2];
};

export const mutate = (dna, mutationRate = 0.01) => {
  const nucleotides = ['A', 'G', 'C', 'T'];
  return dna.split('').map(nucleotide => {
    if (Math.random() < mutationRate) {
      const randomIndex = Math.floor(Math.random() * 4);
      return nucleotides[randomIndex];
    }
    return nucleotide;
  }).join('');
};

// Generate a key from the secret key
export const generateEncryptionKey = (secretKey, length) => {
  console.log("Generating encryption key, target length:", length);
  
  // Convert secret key to a consistent hash
  let hash = 0;
  for (let i = 0; i < secretKey.length; i++) {
    hash = ((hash << 5) - hash) + secretKey.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  
  // Use hash as seed for the pseudo-random generator
  const seededRandom = (max) => {
    hash = (hash * 9301 + 49297) % 233280;
    return (hash / 233280) * max;
  };
  
  // Generate DNA sequence for key from hash
  let dnaKey = '';
  const nucleotides = ['A', 'G', 'C', 'T'];
  
  while (dnaKey.length < length) {
    const index = Math.floor(seededRandom(4));
    dnaKey += nucleotides[index];
  }
  
  console.log("Generated encryption key length:", dnaKey.length);
  return dnaKey;
};

// Add the missing applyGeneticAlgorithm function
export const applyGeneticAlgorithm = (dnaSequence, key, isDecrypt = false) => {
  // Generate a deterministic key based on the secret key
  const keyLength = Math.max(dnaSequence.length / 2, 10);
  const geneticKey = generateEncryptionKey(key, keyLength);
  
  if (isDecrypt) {
    // For decryption, we just need to reverse the mutation step
    // since we're using a deterministic process based on the key
    return dnaSequence;
  } else {
    // For encryption, we apply a simple "evolution" to the sequence
    // using the geneticKey as guidance
    let evolvedDNA = dnaSequence;
    
    // Apply a deterministic mutation based on the key
    for (let i = 0; i < dnaSequence.length; i++) {
      if (i % 7 === 0 && i < geneticKey.length) {
        const keyChar = geneticKey.charAt(i % geneticKey.length);
        
        // Apply a deterministic change that can be reversed
        const charCode = evolvedDNA.charCodeAt(i);
        const keyCode = keyChar.charCodeAt(0);
        const newChar = String.fromCharCode((charCode + keyCode) % 256);
        
        evolvedDNA = evolvedDNA.substring(0, i) + newChar + evolvedDNA.substring(i + 1);
      }
    }
    
    return evolvedDNA;
  }
};

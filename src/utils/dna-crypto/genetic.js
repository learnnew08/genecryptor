
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

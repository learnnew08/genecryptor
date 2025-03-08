
// DNA Cryptography and Genetic Algorithm implementation

// DNA nucleotide mapping for binary conversion
const nucleotideMap = {
  '00': 'A',
  '01': 'G',
  '10': 'C',
  '11': 'T'
};

const reverseNucleotideMap = {
  'A': '00',
  'G': '01',
  'C': '10',
  'T': '11'
};

// Convert text to binary
const textToBinary = (text) => {
  return text.split('').map(char => {
    const binary = char.charCodeAt(0).toString(2);
    return binary.padStart(8, '0');
  }).join('');
};

// Convert binary to text
const binaryToText = (binary) => {
  // Ensure binary string length is a multiple of 8
  const paddedBinary = binary + '0'.repeat((8 - binary.length % 8) % 8);
  
  const chunks = paddedBinary.match(/.{1,8}/g) || [];
  return chunks.map(chunk => {
    if (chunk.length === 8) {
      return String.fromCharCode(parseInt(chunk, 2));
    }
    return '';
  }).join('');
};

// Convert binary to DNA sequence
const binaryToDNA = (binary) => {
  // Ensure binary length is even
  const paddedBinary = binary.length % 2 === 0 ? binary : binary + '0';
  
  const pairs = paddedBinary.match(/.{1,2}/g) || [];
  return pairs.map(pair => nucleotideMap[pair] || 'A').join('');
};

// Convert DNA sequence to binary
const dnaToBinary = (dna) => {
  return dna.split('').map(nucleotide => reverseNucleotideMap[nucleotide] || '00').join('');
};

// Genetic Algorithm operations
const crossover = (dna1, dna2) => {
  const length = Math.min(dna1.length, dna2.length);
  const crossPoint = Math.floor(Math.random() * length);
  
  const offspring1 = dna1.substring(0, crossPoint) + dna2.substring(crossPoint);
  const offspring2 = dna2.substring(0, crossPoint) + dna1.substring(crossPoint);
  
  return [offspring1, offspring2];
};

const mutate = (dna, mutationRate = 0.01) => {
  const nucleotides = ['A', 'G', 'C', 'T'];
  return dna.split('').map(nucleotide => {
    if (Math.random() < mutationRate) {
      const randomIndex = Math.floor(Math.random() * 4);
      return nucleotides[randomIndex];
    }
    return nucleotide;
  }).join('');
};

// Generate a key from the secret key using genetic algorithm
const generateEncryptionKey = (secretKey, length) => {
  // Convert secret key to initial DNA sequence
  const binaryKey = textToBinary(secretKey);
  let dnaKey = binaryToDNA(binaryKey);
  
  // Pad or truncate to desired length
  if (dnaKey.length < length) {
    while (dnaKey.length < length) {
      dnaKey += dnaKey;
    }
  }
  dnaKey = dnaKey.substring(0, length);
  
  // Apply genetic algorithm operations
  let population = [dnaKey];
  for (let i = 0; i < 10; i++) {
    // Generate new members through crossover
    const newMembers = [];
    for (let j = 0; j < population.length; j++) {
      for (let k = j + 1; k < population.length; k++) {
        const [offspring1, offspring2] = crossover(population[j], population[k]);
        newMembers.push(offspring1, offspring2);
      }
    }
    
    // Add new members to population
    population = [...population, ...newMembers];
    
    // Apply mutation
    population = population.map(dna => mutate(dna));
    
    // Select best members (simplified for this implementation)
    population = population.slice(0, 5);
  }
  
  // Use the "best" key (first one for simplicity)
  return population[0].substring(0, length);
};

// Encrypt data using DNA encryption and genetic algorithm
const encryptData = (data, secretKey) => {
  const binaryData = textToBinary(data);
  const dnaData = binaryToDNA(binaryData);
  
  // Generate encryption key
  const encryptionKey = generateEncryptionKey(secretKey, dnaData.length);
  
  // XOR-like operation for DNA (simplified)
  const encryptedDNA = dnaData.split('').map((nucleotide, index) => {
    const keyNucleotide = encryptionKey[index % encryptionKey.length];
    // Simple mapping rule for combining nucleotides
    const pairs = {
      'AA': 'A', 'AG': 'G', 'AC': 'C', 'AT': 'T',
      'GA': 'G', 'GG': 'A', 'GC': 'T', 'GT': 'C',
      'CA': 'C', 'CG': 'T', 'CC': 'A', 'CT': 'G',
      'TA': 'T', 'TG': 'C', 'TC': 'G', 'TT': 'A'
    };
    return pairs[nucleotide + keyNucleotide] || 'A';
  }).join('');
  
  // Add a verification header to ensure we can validate decryption later
  const salt = "_GENECRYPT_SALT_";
  return salt + encryptedDNA;
};

// Decrypt data using DNA decryption and genetic algorithm
const decryptData = (encryptedData, secretKey) => {
  // Check if the data has our verification header
  const salt = "_GENECRYPT_SALT_";
  let encryptedDNA = encryptedData;
  
  if (encryptedData.startsWith(salt)) {
    encryptedDNA = encryptedData.substring(salt.length);
  }
  
  // Generate the same encryption key
  const encryptionKey = generateEncryptionKey(secretKey, encryptedDNA.length);
  
  // Create the decryption mapping based on the encryption rules
  const decryptionMap = {};
  const pairs = {
    'A': { 'A': 'A', 'G': 'G', 'C': 'C', 'T': 'T' },
    'G': { 'A': 'G', 'G': 'A', 'C': 'T', 'T': 'C' },
    'C': { 'A': 'C', 'G': 'T', 'C': 'A', 'T': 'G' },
    'T': { 'A': 'T', 'G': 'C', 'C': 'G', 'T': 'A' }
  };
  
  // Pre-compute the reverse mapping for faster lookup
  for (const orig in pairs) {
    for (const key in pairs[orig]) {
      const encrypted = pairs[orig][key];
      if (!decryptionMap[encrypted]) {
        decryptionMap[encrypted] = {};
      }
      decryptionMap[encrypted][key] = orig;
    }
  }
  
  const decryptedDNA = encryptedDNA.split('').map((nucleotide, index) => {
    const keyNucleotide = encryptionKey[index % encryptionKey.length];
    
    // Use the pre-computed mapping to find the original nucleotide
    return (decryptionMap[nucleotide] && decryptionMap[nucleotide][keyNucleotide]) || 'A';
  }).join('');
  
  // Convert back to binary and then to text
  const decryptedBinary = dnaToBinary(decryptedDNA);
  return binaryToText(decryptedBinary);
};

// Process files for encryption and decryption
const processTextFile = async (file, secretKey, isEncrypt) => {
  console.log("Processing text file...");
  const text = await file.text();
  
  if (isEncrypt) {
    const encryptedDNA = encryptData(text, secretKey);
    return { data: encryptedDNA, type: 'text/plain', filename: `${file.name}.encrypted` };
  } else {
    console.log("Decrypting text with secret key: [secret]");
    console.log("File content length:", text.length);
    const decryptedText = decryptData(text, secretKey);
    console.log("Decrypted length:", decryptedText.length);
    return { data: decryptedText, type: 'text/plain', filename: file.name.replace('.encrypted', '') };
  }
};

const processImageFile = async (file, secretKey, isEncrypt) => {
  console.log("Processing image file...");
  
  if (isEncrypt) {
    // Convert image to base64 for processing
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    
    const encryptedDNA = encryptData(base64, secretKey);
    return { data: encryptedDNA, type: 'text/plain', filename: `${file.name}.encrypted` };
  } else {
    // For decryption, read the encrypted content
    const encryptedContent = await file.text();
    console.log("Decrypting image file...");
    const decryptedBase64 = decryptData(encryptedContent, secretKey);
    
    return { 
      data: decryptedBase64, 
      type: 'image/png', // Default to png, but ideally we should store the original type
      filename: file.name.replace('.encrypted', ''),
      isBase64: true
    };
  }
};

const processAudioFile = async (file, secretKey, isEncrypt) => {
  console.log("Processing audio file...");
  
  if (isEncrypt) {
    // Convert audio to base64 for processing
    const arrayBuffer = await file.arrayBuffer();
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    
    const encryptedDNA = encryptData(base64, secretKey);
    return { data: encryptedDNA, type: 'text/plain', filename: `${file.name}.encrypted` };
  } else {
    // For decryption, read the encrypted content
    const encryptedContent = await file.text();
    console.log("Decrypting audio file...");
    const decryptedBase64 = decryptData(encryptedContent, secretKey);
    
    return { 
      data: decryptedBase64, 
      type: 'audio/mpeg', // Default to mp3, but ideally we should store the original type
      filename: file.name.replace('.encrypted', ''),
      isBase64: true
    };
  }
};

export const processFile = async (file, secretKey, isEncrypt, fileType) => {
  if (!file || !secretKey) {
    throw new Error('File and secret key are required');
  }
  
  console.log(`Processing ${fileType} file for ${isEncrypt ? 'encryption' : 'decryption'}`);
  
  // Process based on file type
  if (fileType === 'text') {
    return processTextFile(file, secretKey, isEncrypt);
  } else if (fileType === 'image') {
    return processImageFile(file, secretKey, isEncrypt);
  } else if (fileType === 'audio') {
    return processAudioFile(file, secretKey, isEncrypt);
  } else {
    throw new Error('Unsupported file type');
  }
};

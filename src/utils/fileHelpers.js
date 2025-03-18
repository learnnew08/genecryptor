
// File handling utilities

// Create download link and trigger download
export const downloadFile = (data, filename, type, isBase64 = false, isBinary = false) => {
  let blob;
  
  if (isBase64) {
    // For base64 encoded data (images, audio, binary)
    try {
      if (isBinary) {
        // For binary data in base64 format (PDF, DOC, etc)
        const byteString = atob(data);
        const byteNumbers = new Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          byteNumbers[i] = byteString.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], { type });
        console.log("Created binary blob from base64, size:", blob.size);
      } else {
        // For images and audio with data URI
        const dataURI = data.startsWith('data:') ? 
                       data : 
                       `data:${type};base64,${data}`;
                     
        console.log("Creating blob from data URI, starts with:", dataURI.substring(0, 30) + "...");
        blob = dataURItoBlob(dataURI);
        console.log("Created blob from base64 data, size:", blob.size);
      }
    } catch (error) {
      console.error("Error creating blob from base64:", error);
      // Fallback to plain text if base64 conversion fails
      blob = new Blob([data], { type: 'text/plain' });
    }
  } else {
    // For regular text data
    blob = new Blob([data], { type });
    console.log("Created text blob, size:", blob.size);
  }
  
  const url = URL.createObjectURL(blob);
  console.log("Created object URL for download");
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  console.log("Download initiated for file:", filename);
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log("Cleaned up download resources");
  }, 100);
};

// Convert data URI to Blob
function dataURItoBlob(dataURI) {
  console.log("Converting data URI to blob, URI length:", dataURI.length);
  
  // Handle case when dataURI doesn't contain a comma
  if (!dataURI.includes(',')) {
    console.error("Invalid data URI format - missing comma");
    const safePart = dataURI.length > 50 ? dataURI.substring(0, 50) + "..." : dataURI;
    console.log("Data URI (partial):", safePart);
    
    // Try to fix the data URI by adding the comma if it's missing
    const fixedURI = `data:image/png;base64,${dataURI}`;
    return dataURItoBlob(fixedURI);
  }
  
  try {
    const parts = dataURI.split(',');
    const byteString = atob(parts[1]);
    console.log("Decoded base64 data, length:", byteString.length);
    
    const mimeString = parts[0].split(':')[1].split(';')[0];
    console.log("MIME type:", mimeString);
    
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    
    const blob = new Blob([ab], { type: mimeString });
    console.log("Created blob successfully, size:", blob.size);
    return blob;
  } catch (error) {
    console.error("Error in dataURItoBlob:", error);
    
    // Try a fallback approach for problematic base64 data
    try {
      console.log("Trying fallback blob creation");
      return new Blob([dataURI], { type: 'image/png' });
    } catch (fallbackError) {
      console.error("Fallback also failed:", fallbackError);
      throw error;
    }
  }
}

// Validate file type based on selected option
export const validateFileType = (file, selectedFileType) => {
  if (!file) return false;
  
  const textTypes = [
    'text/plain', 
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/csv',
    'application/rtf',
    'text/html',
    'application/json'
  ];
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'];
  
  console.log("Validating file type:", file.type, "for selected type:", selectedFileType);
  
  if (selectedFileType === 'text' && textTypes.includes(file.type)) {
    return true;
  } else if (selectedFileType === 'image' && imageTypes.includes(file.type)) {
    return true;
  } else if (selectedFileType === 'audio' && audioTypes.includes(file.type)) {
    return true;
  } else if (file.name.endsWith('.encrypted')) {
    // For encrypted files, we accept all types
    return true;
  }
  
  console.log("File type validation failed");
  return false;
};

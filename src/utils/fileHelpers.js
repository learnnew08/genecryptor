
// File handling utilities

// Create download link and trigger download
export const downloadFile = (data, filename, type, isBase64 = false) => {
  let blob;
  
  if (isBase64) {
    // For base64 encoded data (images, audio)
    try {
      blob = dataURItoBlob(`data:${type};base64,${data}`);
    } catch (error) {
      console.error("Error creating blob from base64:", error);
      // Fallback to plain text if base64 conversion fails
      blob = new Blob([data], { type: 'text/plain' });
    }
  } else {
    // For regular text data
    blob = new Blob([data], { type });
  }
  
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};

// Convert data URI to Blob
function dataURItoBlob(dataURI) {
  // Handle case when dataURI doesn't contain a comma
  if (!dataURI.includes(',')) {
    throw new Error('Invalid data URI format');
  }
  
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  return new Blob([ab], { type: mimeString });
}

// Validate file type based on selected option
export const validateFileType = (file, selectedFileType) => {
  if (!file) return false;
  
  const textTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  const audioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/webm'];
  
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
  
  return false;
};

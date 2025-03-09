
// File handling utilities

// Create download link and trigger download
export const downloadFile = (data, filename, type, isBase64 = false) => {
  let blob;
  
  if (isBase64) {
    // For base64 encoded data (images, audio)
    try {
      blob = dataURItoBlob(`data:${type};base64,${data}`);
      console.log("Created blob from base64 data, size:", blob.size);
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
    throw new Error('Invalid data URI format');
  }
  
  try {
    const byteString = atob(dataURI.split(',')[1]);
    console.log("Decoded base64 data, length:", byteString.length);
    
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
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
    throw error;
  }
}

// Validate file type based on selected option
export const validateFileType = (file, selectedFileType) => {
  if (!file) return false;
  
  const textTypes = ['text/plain', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
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

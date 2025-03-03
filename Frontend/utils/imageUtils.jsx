export const processImageUrl = (image) => {
  // Detailed image URL processing
  let processedImage = '/default-project-image.jpg';
  
  if (image) {
    // Full HTTP/HTTPS URLs
    if (image.startsWith('http://') || image.startsWith('https://')) {
      processedImage = image;
    } 
    // Relative paths with leading slash
    else if (image.startsWith('/uploads')) {
      processedImage = `http://localhost:5000${image}`;
    } 
    // Relative paths without leading slash
    else if (image.startsWith('uploads/')) {
      processedImage = `http://localhost:5000/${image}`;
    }
    // Other potential path formats
    else if (image.includes('uploads')) {
      processedImage = `http://localhost:5000/${image}`;
    }
  }

  return processedImage;
};
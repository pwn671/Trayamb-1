// Safely get environment variable
const getEnvVariable = (key, defaultValue) => {
  try {
    return import.meta.env[key] || defaultValue;
  } catch (error) {
    console.warn(`Error accessing environment variable ${key}:`, error);
    return defaultValue;
  }
};

const BASE_API_URL = getEnvVariable(
  "VITE_API_BASE_URL", 
  "http://localhost:5000"
);

export const processImageUrl = (image) => {
  // Detailed image URL processing
  let processedImage = "/default-project-image.jpg";

  if (image) {
    // Full HTTP/HTTPS URLs
    if (image.startsWith("http://") || image.startsWith("https://")) {
      processedImage = image;
    }
    // Relative paths with leading slash
    else if (image.startsWith("/uploads")) {
      processedImage = `${BASE_API_URL}${image}`;
    }
    // Relative paths without leading slash
    else if (image.startsWith("uploads/")) {
      processedImage = `${BASE_API_URL}/${image}`;
    }
    // Other potential path formats
    else if (image.includes("uploads")) {
      processedImage = `${BASE_API_URL}/${image}`;
    }
  }

  return processedImage;
};

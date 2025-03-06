import axios from "axios";

// Safely get environment variable
const getEnvVariable = (key, defaultValue) => {
  try {
    // First, check for window._env_ (custom runtime configuration)
    if (window._env_ && window._env_[key]) {
      return window._env_[key];
    }

    // Then check for process.env (build-time environment variables)
    if (typeof process !== "undefined" && process.env) {
      return process.env[key] || defaultValue;
    }

    // If no environment variable found, return default
    return defaultValue;
  } catch (error) {
    console.warn(`Error accessing environment variable ${key}:`, error);
    return defaultValue;
  }
};

const API_URL = "http://localhost:5000/api/about";
const BASE_API_URL = getEnvVariable(
  "REACT_APP_API_BASE_UR",
  "http://localhost:5000"
);

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication token here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.error || "An unexpected error occurred";
    console.error("API Error:", errorMessage);
    return Promise.reject(errorMessage);
  }
);

export const getAbout = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAbout = async (data) => {
  try {
    // Validate data before sending
    if (!data.title || !data.quote || !data.quoteAuthor || !data.sections) {
      throw new Error("Invalid input data");
    }

    const response = await apiClient.post("/", data);
    return response.data;
  } catch (error) {
    console.error("Create About Error:", error.response?.data || error.message);
    throw error;
  }
};

export const updateAbout = async (id, data) => {
  try {
    // Validate ID and data
    if (!id) {
      throw new Error("Content ID is required");
    }

    if (!data.title || !data.quote || !data.quoteAuthor || !data.sections) {
      throw new Error("Invalid input data");
    }

    const response = await apiClient.put(`/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update About Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteAbout = async (id) => {
  try {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await apiClient.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // Ensure the returned imageUrl is a full URL
    const imageUrl = response.data.imageUrl;

    // If the URL doesn't start with http or https, prepend the base URL
    const fullImageUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${BASE_API_URL}${imageUrl}`;

    return { imageUrl: fullImageUrl };
  } catch (error) {
    console.error("Image upload error:", error);

    // More detailed error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || "Image upload failed");
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response received from server");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up image upload");
    }
  }
};

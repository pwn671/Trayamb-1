import axios from "axios";

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

const BASE_URL = `${BASE_API_URL}/contact`;

export const submitContact = async (contactData) => {
  try {
    const response = await axios.post(`${BASE_URL}/submit`, contactData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact:", error);
    throw error;
  }
};

export const getAllContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

export const updateContactStatus = async (contactId, newStatus) => {
  try {
    const response = await axios.patch(`${BASE_URL}/status/${contactId}`, {
      status: newStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating contact status:", error);
    throw error;
  }
};

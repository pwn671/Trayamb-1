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

const API_URL = `${BASE_API_URL}/api/projects`;

// Get all projects
export const getAllProjects = () => {
  return axios.get(API_URL);
};

// Get projects by category
export const getProjectsByCategory = (category) => {
  return axios.get(`${API_URL}/category/${category}`);
};

// Create a new project
export const createProject = (projectData) => {
  return axios.post(API_URL, projectData);
};

// Update an existing project
export const updateProject = (projectId, projectData) => {
  return axios.put(`${API_URL}/${projectId}`, projectData);
};

// Delete a project
export const deleteProject = (projectId) => {
  return axios.delete(`${API_URL}/${projectId}`);
};

// Get project by ID
export const getProjectById = (projectId) => {
  return axios.get(`${API_URL}/${projectId}`);
};

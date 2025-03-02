import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects'; // Adjust to your backend URL

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
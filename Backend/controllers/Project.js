import Project from '../models/Project.js';
import fs from 'fs';
import path from 'path';

// Helper function to remove old image file
const removeOldImage = (imagePath) => {
  if (imagePath) {
    const fullPath = path.join(process.cwd(), imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }
};

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching projects", 
      error: error.message 
    });
  }
};

// Get projects by category
export const getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await Project.find({ category }).sort({ createdAt: -1 });
    
    if (projects.length === 0) {
      return res.status(404).json({ 
        message: `No projects found in category: ${category}` 
      });
    }
    
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching projects by category", 
      error: error.message 
    });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        message: "Project not found" 
      });
    }
    
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching project", 
      error: error.message 
    });
  }
};

// Create new project
export const createProject = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    
    console.log('Create Project Request:', {
      title,
      description,
      category,
      file: req.file
    });
    
    // Check if required fields are present
    if (!title || !description || !category) {
      return res.status(400).json({ 
        message: "Missing required fields: title, description, or category" 
      });
    }
    
    // Handle image upload (optional)
    const imagePath = req.file 
      ? `/uploads/projects/${path.basename(req.file.path)}` 
      : null;
    
    console.log('Stored Image Path:', imagePath);
    
    const newProject = new Project({
      title,
      description,
      category,
      image: imagePath
    });
    
    const savedProject = await newProject.save();
    
    console.log('Saved Project:', savedProject);
    
    res.status(201).json({
      ...savedProject.toObject(),
      image: savedProject.image 
        ? `http://localhost:5000${savedProject.image}` 
        : null
    });
  } catch (error) {
    console.error('Project creation error:', error);
    
    // Remove uploaded image if project creation fails
    if (req.file) {
      removeOldImage(req.file.path);
    }
    
    res.status(500).json({ 
      message: "Internal server error creating project", 
      error: error.message 
    });
  }
};

// Update existing project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    
    // Find existing project
    const existingProject = await Project.findById(id);
    
    if (!existingProject) {
      return res.status(404).json({ 
        message: "Project not found" 
      });
    }
    
    // Prepare update data
    const updateData = {
      title: title || existingProject.title,
      description: description || existingProject.description,
      category: category || existingProject.category
    };
    
    // Handle image update
    if (req.file) {
      // Remove old image if exists
      removeOldImage(existingProject.image);
      
      // Set new image path
      updateData.image = `/uploads/projects/${path.basename(req.file.path)}`;
    }
    
    // Update project
    const updatedProject = await Project.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true }
    );
    
    res.status(200).json(updatedProject);
  } catch (error) {
    // Remove newly uploaded image if update fails
    if (req.file) {
      removeOldImage(req.file.path);
    }
    
    res.status(400).json({ 
      message: "Error updating project", 
      error: error.message 
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find project to delete
    const projectToDelete = await Project.findById(id);
    
    if (!projectToDelete) {
      return res.status(404).json({ 
        message: "Project not found" 
      });
    }
    
    // Remove associated image
    removeOldImage(projectToDelete.image);
    
    // Delete project from database
    await Project.findByIdAndDelete(id);
    
    res.status(200).json({ 
      message: "Project deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error deleting project", 
      error: error.message 
    });
  }
};

export default {
  getAllProjects,
  getProjectsByCategory,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
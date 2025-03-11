import About from "../models/About.js";
import mongoose from "mongoose";

// Get About Page Content
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne().sort({ lastUpdated: -1 });
    if (!about) {
      return res.status(404).json({ message: "No about content found" });
    }
    res.json(about);
  } catch (error) {
    console.error("Error fetching about content:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Create About Page Content
export const createAbout = async (req, res) => {
  try {
    const { title, quote, quoteAuthor, sections } = req.body;
    
    // Validate input
    if (!title || !quote || !quoteAuthor || !sections || !Array.isArray(sections)) {
      return res.status(400).json({ error: "Invalid input data", details: "All fields are required" });
    }

    // Sanitize and validate sections
    const sanitizedSections = sections.map(section => ({
      title: section.title || '',
      text: section.text || '',
      imageUrl: section.imageUrl || '', // Ensure imageUrl is a string
      order: section.order || 0
    }));

    // Validate sections
    const invalidSection = sanitizedSections.find(section => 
      !section.title || !section.text || 
      typeof section.title !== 'string' || 
      typeof section.text !== 'string'
    );
    if (invalidSection) {
      return res.status(400).json({ 
        error: "Invalid section data", 
        details: "All sections must have a valid title and text" 
      });
    }

    // Check if content already exists
    const existingAbout = await About.findOne();
    if (existingAbout) {
      return res.status(400).json({ 
        error: "About content already exists", 
        details: "Use update method to modify existing content" 
      });
    }

    const newAbout = new About({ 
      title, 
      quote, 
      quoteAuthor, 
      sections: sanitizedSections,
      lastUpdated: new Date()
    });
    
    await newAbout.save();
    
    res.status(201).json(newAbout);
  } catch (error) {
    console.error("Error creating about content:", error);
    res.status(500).json({ 
      error: "Failed to create content", 
      details: error.message 
    });
  }
};

// Update About Page Content
export const updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, quote, quoteAuthor, sections } = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: "Invalid content ID", 
        details: "Provided ID is not a valid MongoDB ObjectId" 
      });
    }

    // Validate input
    if (!title || !quote || !quoteAuthor || !sections || !Array.isArray(sections)) {
      return res.status(400).json({ 
        error: "Invalid input data", 
        details: "All fields are required" 
      });
    }

    // Sanitize and validate sections
    const sanitizedSections = sections.map(section => ({
      title: section.title || '',
      text: section.text || '',
      imageUrl: section.imageUrl || '', // Ensure imageUrl is a string
      order: section.order || 0
    }));

    // Validate sections
    const invalidSection = sanitizedSections.find(section => 
      !section.title || !section.text || 
      typeof section.title !== 'string' || 
      typeof section.text !== 'string'
    );
    if (invalidSection) {
      return res.status(400).json({ 
        error: "Invalid section data", 
        details: "All sections must have a valid title and text" 
      });
    }

    const updatedAbout = await About.findByIdAndUpdate(
      id, 
      { 
        title, 
        quote, 
        quoteAuthor, 
        sections: sanitizedSections, 
        lastUpdated: new Date() 
      }, 
      { new: true, runValidators: true }
    );

    if (!updatedAbout) {
      return res.status(404).json({ 
        error: "About content not found", 
        details: "No content found with the provided ID" 
      });
    }

    res.json(updatedAbout);
  } catch (error) {
    console.error("Error updating about content:", error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        error: "Validation failed", 
        details: errors 
      });
    }

    res.status(500).json({ 
      error: "Failed to update content", 
      details: error.message 
    });
  }
};

// Delete About Page Content
export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid content ID" });
    }

    const deletedAbout = await About.findByIdAndDelete(id);

    if (!deletedAbout) {
      return res.status(404).json({ error: "About content not found" });
    }

    res.json({ message: "Content deleted successfully", deletedAbout });
  } catch (error) {
    console.error("Error deleting about content:", error);
    res.status(500).json({ error: "Failed to delete content", details: error.message });
  }
};

// Upload Image
export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Generate full URL for the uploaded image
    const baseUrl = process.env.BASE_URL || 'https://trayamb.onrender.com';
    const imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
    
    res.json({ imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Failed to upload image", details: error.message });
  }
};

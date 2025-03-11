import React, { useState, useEffect } from "react";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../Services/projectService";
import { processImageUrl } from "../../utils/imageUtils";
import Defaultimg from "../../images/default-project-image.jpg"
// Safely get environment variable
const getEnvVariable = (key, defaultValue) => {
  try {
    return window._env_ && window._env_[key]
      ? window._env_[key]
      : process.env[key] || defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    description: "",
    category: "Bedroom",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Define base API URL using the new method
  const BASE_API_URL = getEnvVariable(
    "VITE_API_BASE_URL",
    "http://localhost:5000"
  );

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();

        const processedProjects = response.data.map((project) => ({
          ...project,
          image: processImageUrl(project.image),
        }));

        setProjects(processedProjects);
      } catch (error) {
        setError(`Failed to fetch projects: ${error.message}`);
      }
    };

    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrentProject((prev) => ({
      ...prev,
      image: file,
    }));

    // Create image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!currentProject.title || !currentProject.description) {
      setError("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", currentProject.title);
    formData.append("description", currentProject.description);
    formData.append("category", currentProject.category);

    if (currentProject.image) {
      formData.append("image", currentProject.image);
    }

    try {
      if (isEditing) {
        // Update existing project
        await updateProject(currentProject._id, formData);
      } else {
        // Create new project
        await createProject(formData);
      }

      // Reset form and refresh projects
      setCurrentProject({
        title: "",
        description: "",
        category: "Bedroom",
        image: null,
      });
      setIsEditing(false);
      setImagePreview(null);

      // Refetch projects after successful creation/update
      const fetchProjects = async () => {
        try {
          const response = await getAllProjects();

          const processedProjects = response.data.map((project) => ({
            ...project,
            image: processImageUrl(project.image),
          }));

          setProjects(processedProjects);
        } catch (error) {
          setError(`Failed to refresh projects: ${error.message}`);
        }
      };

      fetchProjects();
    } catch (error) {
      setError(`Error saving project: ${error.message}`);
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setIsEditing(true);
    // Set image preview if project has an existing image
    setImagePreview(
      project.image ? `${BASE_API_URL}${project.image}` : null
    );
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(projectId);
        const fetchProjects = async () => {
          try {
            const response = await getAllProjects();

            const processedProjects = response.data.map((project) => ({
              ...project,
              image: processImageUrl(project.image),
            }));

            setProjects(processedProjects);
          } catch (error) {
            setError(`Failed to fetch projects: ${error.message}`);
          }
        };

        fetchProjects();
      } catch (error) {
        setError("Failed to delete project. Please try again.");
      }
    }
  };

  const handleCancelEdit = () => {
    setCurrentProject({
      title: "",
      description: "",
      category: "Bedroom",
      image: null,
    });
    setIsEditing(false);
    setImagePreview(null);
  };

  return (
    <div className="project-management-container">
      <div className="project-form-section">
        <h2>{isEditing ? "Edit Project" : "Create New Project"}</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label>Project Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter project title"
              value={currentProject.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Project Description</label>
            <textarea
              name="description"
              placeholder="Enter project description"
              value={currentProject.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={currentProject.category}
              onChange={handleInputChange}
            >
              <option value="Bedroom">Bedroom</option>
              <option value="Bathroom">Bathroom</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Living Area">Living Area</option>
            </select>
          </div>

          <div className="form-group">
            <label>Project Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Project Preview"
                  style={{ maxWidth: "200px", marginTop: "10px" }}
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {isEditing ? "Update Project" : "Create Project"}
            </button>
            {isEditing && (
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="project-list-section">
        <h2>Existing Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  onError={(e) => {
                    e.target.src = ${Defaultimg};
                  }}
                />
              )}
              <div className="project-details">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span className="category-badge">{project.category}</span>
                </div>
                <div className="project-actions">
                  <button
                    onClick={() => handleEdit(project)}
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectManagement;

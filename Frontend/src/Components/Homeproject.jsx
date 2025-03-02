
import React, { useEffect, useState } from "react";
import "../Pages/project/Project.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProjectCard from "../Pages/project/ProjectCard";
import { getAllProjects, getProjectsByCategory } from "../services/projectService"
import { processImageUrl } from '../utils/imageUtils';

function Homeproject() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(8);
  const [error, setError] = useState(null);

  // Fetch all projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        
        // Enhanced image URL processing
        const processedProjects = response.data.map(project => ({
          ...project,
          image: processImageUrl(project.image)
        }));
        
        setProjects(processedProjects);
        setFilteredProjects(processedProjects);
      } catch (error) {
        setError('Failed to fetch projects');
      }
    };
    fetchProjects();
  }, []);

  // Handle category filtering
  const handleCategoryFilter = async (category) => {
    try {
      // Update category selection styling
      const categoryElements = document.querySelectorAll('.p-ctg');
      categoryElements.forEach(el => {
        el.classList.remove('takenCategory');
        el.classList.add('notakenCategory');
      });
      
      // Style selected category
      const selectedEl = event.target;
      selectedEl.classList.remove('notakenCategory');
      selectedEl.classList.add('takenCategory');

      // Fetch projects by category
      if (category === selectedCategory) {
        // If same category clicked, show all projects
        setFilteredProjects(projects);
        setSelectedCategory(null);
      } else {
        const response = await getProjectsByCategory(category);
        setFilteredProjects(response.data);
        setSelectedCategory(category);
      }
      
      // Reset to first page when filtering
      setCurrentPage(1);
    } catch (error) {
      setError('Failed to filter projects');
    }
  };

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    
     

        {currentProjects.map((project, index) => (
              <div className="col-12 col-lg-4">
              
              <ProjectCard key={project._id || index} project={project} />
            
        
              </div>
      
        ))}
 
      
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default Homeproject;
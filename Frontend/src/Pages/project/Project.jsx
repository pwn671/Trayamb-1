// import React from "react";
// import "./project.css";
// import project1 from "../../images/project/project1.jpg";
// import project2 from "../../images/project/project2.jpg";
// import project3 from "../../images/project/project3.jpg";
// import project4 from "../../images/project/project4.jpg";
// import project5 from "../../images/project/project5.jpg";
// import project6 from "../../images/project/project6.jpg";
// import project7 from "../../images/project/project7.jpg";
// import project8 from "../../images/project/project8.jpg";
// import { Link } from "react-router-dom";
// import { IoIosArrowForward } from "react-icons/io";
// import ProjectCard from "./projectCard";
// import { useEffect, useState } from "react";
// import projects from "./project.json";

// function Project() {
//   const [data, setData] = useState("");
//   const [currentPage, setcurrentPage] = useState(1);
//   const [postPerPage, setpostPerPage] = useState(8);

//   const projectsData = projects;

//   const lastPostIndex = currentPage * postPerPage;
//   const firstPostIndex = lastPostIndex - postPerPage;
//   const currentPosts = data.slice(firstPostIndex, lastPostIndex);

//   const handleChange = (e) => {
//     const pClassList = e.target.parentElement;
//     if (e.target.classList.contains("notakenCategory")) {
//       for (let i = 0; i < pClassList.childNodes.length; i++) {
//         if (pClassList.childNodes[i].className === "p-ctg takenCategory") {
//           pClassList.childNodes[i].className = "p-ctg notakenCategory";
//         }
//       }
//       e.target.classList.remove("notakenCategory");
//       e.target.classList.add("takenCategory");
//     } else if (e.target.classList.contains("taken")) {
//       for (let i = 0; i < pClassList.childNodes.length; i++) {
//         if (pClassList.childNodes[i].className === "p-ctg takenCategory") {
//           pClassList.childNodes[i].className = "p-ctg notakenCategory";
//         }
//       }
//     }
//   };
//   return (
//     <div className="project">
//       <div className="project-header">
//         <h1>
//           Our Projects<p>Home / Project</p>
//         </h1>
//       </div>
//       <div className="project-categories">
//         <ul>
//           <ol className="p-ctg notakenCategory" onClick={handleChange}>
//             Bedroom
//           </ol>
//           <ol className="p-ctg notakenCategory" onClick={handleChange}>
//             Bathroom
//           </ol>
//           <ol className="p-ctg notakenCategory" onClick={handleChange}>
//             Kitchen
//           </ol>
//           <ol className="p-ctg notakenCategory" onClick={handleChange}>
//             Living Area
//           </ol>
//         </ul>
//       </div>
//       <div className="our-projects">
//         {projectsData !== undefined &&
//           !!projectsData.projects.length &&
//           projectsData.projects.map((pro, ind) => {
//             return <ProjectCard props={pro} key={ind} />;
//           })}
//       </div>
//     </div>
//   );
// }

// export default Project;


import React, { useEffect, useState } from "react";
import "./project.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProjectCard from "./projectCard";
import { getAllProjects, getProjectsByCategory } from "../../services/projectService";
import { processImageUrl } from '../../utils/imageUtils';

function Project() {
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
    <div className="project">
      <div className="project-header">
        <h1>
          Our Projects<p>Home / Project</p>
        </h1>
      </div>
      <div className="project-categories">
        <ul>
          {['Bedroom', 'Bathroom', 'Kitchen', 'Living Area'].map((category, index) => (
            <ol 
              key={index} 
              className="p-ctg notakenCategory" 
              onClick={() => handleCategoryFilter(category)}
            >
              {category}
            </ol>
          ))}
        </ul>
      </div>
      <div className="our-projects">
        {currentProjects.map((project, index) => (
          <ProjectCard key={project._id || index} project={project} />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Project;
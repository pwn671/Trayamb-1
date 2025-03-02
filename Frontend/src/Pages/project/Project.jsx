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

import React, { useState, useMemo } from "react";
import "./Project.css";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard";
import projects from "./project.json";

function Project() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 8;

  // Dynamic category extraction from projects
  const categories = useMemo(() => {
    const allCategories = projects.projects.map((project) => project.category);
    return [...new Set(allCategories)];
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    return selectedCategory
      ? projects.projects.filter(
          (project) => project.category === selectedCategory
        )
      : projects.projects;
  }, [selectedCategory]);

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  // Total pages calculation
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="project">
      <div className="project-header">
        <h1>
          Our Projects<p>Home / Project</p>
        </h1>
      </div>

      <div className="project-categories">
        <ul>
          {/* Dynamic category rendering */}
          <ol
            className={`p-ctg ${
              selectedCategory === null ? "takenCategory" : "notakenCategory"
            }`}
            onClick={() => handleCategoryChange(null)}
          >
            All
          </ol>
          {categories.map((category, index) => (
            <ol
              key={index}
              className={`p-ctg ${
                selectedCategory === category
                  ? "takenCategory"
                  : "notakenCategory"
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </ol>
          ))}
        </ul>
      </div>

      <div className="our-projects">
        {currentProjects.map((project, index) => (
          <ProjectCard key={index} props={project} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
          <button
            key={number}
            onClick={() => handlePageChange(number)}
            className={currentPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Project;

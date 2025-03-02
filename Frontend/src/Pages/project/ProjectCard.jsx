import React from "react";
import "./projectCard.css";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { processImageUrl } from "../../utils/imageUtils";

const ProjectCard = ({ project = {} }) => {
  const {
    title = "Untitled Project",
    category = "Uncategorized",
    image = null,
    _id = null,
  } = project;

  const projectImage = processImageUrl(image);

  if (!_id) {
    return null;
  }

  return (
    <div className="op-project">
      <div className="op-pro-img">
        <img
          src={projectImage}
          alt={title}
          onError={(e) => {
            console.error("Image load error:", {
              src: e.target.src,
              alt: e.target.alt,
              originalImage: image,
            });
            e.target.src = "/default-project-image.jpg";
          }}
        />
      </div>
      <div className="op-pro-detail">
        <div className="op-pro-info">
          <p className="op-prj-title">{title}</p>
          <p className="op-prj-path">{category}</p>
        </div>
        <div className="op-pro-btn">
          <Link to={`/project-details/${_id}`}>
            <button>
              <IoIosArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

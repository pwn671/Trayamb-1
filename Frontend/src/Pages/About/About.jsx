
import React, { useEffect, useState } from "react";
import { getAbout } from "../../services/AboutService";
import "./About.css";
import { BsArrowRight } from "react-icons/bs";

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    getAbout()
      .then((data) => setAboutData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!aboutData) return <p>Loading...</p>;

  return (
    <div className="about">
      {/* About Header */}
      <div className="about-header">
        <h1>
          {aboutData.title} <p>Home / About us</p>
        </h1>
      </div>

      {/* Quote Section */}
      <div className="quotes">
        <div className="pattern first">
          <p></p>
        </div>
        <div className="content">
          <h1>“</h1>
          <p className="comment">{aboutData.quote}</p>
          <p className="author">- {aboutData.quoteAuthor}</p>
        </div>
        <div className="pattern second"></div>
      </div>

      {/* About Concept Sections */}
      <div className="about-concept">
        {aboutData.sections.map((section, index) => (
          <div
            className={`con ${index % 2 === 0 ? "firstPart" : "secondPart"}`}
            key={index}
          >
            {index % 2 === 0 ? (
              <>
                <div className="c-text">
                  <h1>{section.title}</h1>
                  <p>{section.text}</p>
                  <button>
                    Our Concept
                    <BsArrowRight
                      style={{ color: "#CDA274", marginLeft: "3%" }}
                    />
                  </button>
                </div>
                <div className="concept-img">
                  {section.imageUrl && (
                    <img
                      src={section.imageUrl}
                      alt={section.title}
                      onError={(e) => {
                        e.target.style.display = "none";
                        console.warn(
                          `Image failed to load for section: ${section.title}`
                        );
                      }}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="concept-img">
                  {section.imageUrl && (
                    <img
                      src={section.imageUrl}
                      alt={section.title}
                      onError={(e) => {
                        e.target.style.display = "none";
                        console.warn(
                          `Image failed to load for section: ${section.title}`
                        );
                      }}
                    />
                  )}
                </div>
                <div className="c-text">
                  <h1>{section.title}</h1>
                  <p>{section.text}</p>
                  <button>
                    Our Concept
                    <BsArrowRight
                      style={{ color: "#CDA274", marginLeft: "3%" }}
                    />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;

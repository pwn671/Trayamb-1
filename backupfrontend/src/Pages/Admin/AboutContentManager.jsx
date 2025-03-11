// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import {
//   // getAbout,
//   // updateAbout,
//   // createAbout,
//   // uploadImage,
// } from "../../Services/AboutService";
// import { FaTrash, FaUpload } from "react-icons/fa";

// // Safely get environment variable
// const getEnvVariable = (key, defaultValue) => {
//   try {
//     return window._env_ && window._env_[key]
//       ? window._env_[key]
//       : process.env[key] || defaultValue;
//   } catch (error) {
//     // console.warn(`Error accessing environment variable ${key}:`, error);
//     return defaultValue;
//   }
// };

// const API_BASE_URL = getEnvVariable("VITE_API_BASE_URL", "https://trayamb.onrender.com");

// const fetchAboutData = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/about`);
//     console.log('api date:', response.data)
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching about data:', error);
//   }
// };

// const createAboutData = async (data) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/api/about`, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating about data:', error);
//   }
// };

// const updateAboutData = async (id, data) => {
//   try {
//     const response = await axios.put(`${API_BASE_URL}/api/about/${id}`, data);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating about data:', error);
//   }
// };

// const deleteAboutData = async (id) => {
//   try {
//     await axios.delete(`${API_BASE_URL}/api/about/${id}`);
//   } catch (error) {
//     console.error('Error deleting about data:', error);
//   }
// };

// const uploadImage = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append('image', file);
//     const response = await axios.post(`${API_BASE_URL}/upload-image`, formData);
//     return response.data;
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// };

// function AboutContentManager() {
//   const [aboutData, setAboutData] = useState({
//     title: "",
//     quote: "",
//     quoteAuthor: "",
//     sections: [{ title: "", text: "", imageUrl: "" }],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [imagePreview, setImagePreview] = useState({});

//   useEffect(() => {
//     fetchAboutData().then((data) => {
//         console.log('Fetched data:', response.data)
  
//       if (data) {
//         // Ensure all required fields exist
//         const formattedData = {
//           _id: data._id || null,
//           title: data.title || "",
//           quote: data.quote || "",
//           quoteAuthor: data.quoteAuthor || "",
//           sections:
//             data.sections && data.sections.length > 0
//               ? data.sections.map((section) => ({
//                   title: section.title || "",
//                   text: section.text || "",
//                   imageUrl: section.imageUrl || "",
//                 }))
//               : [{ title: "", text: "", imageUrl: "" }],
//         };

//         console.log('Formatted data:', formattedData); // Debugging log
//         setAboutData(formattedData);
//         setIsEditing(!!data._id);

//         // Initialize image previews
//         const previews = {};
//         formattedData.sections.forEach((section, index) => {
//           if (section.imageUrl) {
//             previews[index] = section.imageUrl;
//           }
//         });
//         setImagePreview(previews);
//       } else {
//         console.error('No data returned from fetch.');
//       }
//     });
//   }, []);

//   const handleInputChange = (e, sectionIndex = null) => {
//     const { name, value } = e.target;
//     setAboutData((prev) => {
//       if (sectionIndex === null) {
//         return { ...prev, [name]: value };
//       }
//       const updatedSections = [...prev.sections];
//       updatedSections[sectionIndex] = {
//         ...updatedSections[sectionIndex],
//         [name]: value,
//       };
//       return { ...prev, sections: updatedSections };
//     });
//   };

//   const handleImageUpload = async (e, sectionIndex) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type and size
//     const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
//     const maxSize = 5 * 1024 * 1024; // 5MB

//     if (!validTypes.includes(file.type)) {
//       setError(
//         "Invalid file type. Please upload JPEG, PNG, GIF, or WebP images."
//       );
//       return;
//     }

//     if (file.size > maxSize) {
//       setError("File is too large. Maximum size is 5MB.");
//       return;
//     }

//     try {
//       // Create local preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview((prev) => ({
//           ...prev,
//           [sectionIndex]: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);

//       // Upload to server
//       const { imageUrl } = await uploadImage(file);

//       // Ensure the imageUrl is a full URL
//       const fullImageUrl = imageUrl.startsWith("http")
//         ? imageUrl
//         : `${API_BASE_URL}${imageUrl}`;

//       setAboutData((prev) => {
//         const updatedSections = [...prev.sections];
//         updatedSections[sectionIndex].imageUrl = fullImageUrl;
//         return { ...prev, sections: updatedSections };
//       });
//     } catch (err) {
//       setError(err.message || "Image upload failed");
//       console.error(err);
//     }
//   };

//   const removeImage = (sectionIndex) => {
//     setAboutData((prev) => {
//       const updatedSections = [...prev.sections];
//       updatedSections[sectionIndex].imageUrl = "";
//       return { ...prev, sections: updatedSections };
//     });

//     setImagePreview((prev) => {
//       const newPreviews = { ...prev };
//       delete newPreviews[sectionIndex];
//       return newPreviews;
//     });
//   };

//   const addSection = () => {
//     setAboutData((prev) => ({
//       ...prev,
//       sections: [...prev.sections, { title: "", text: "", imageUrl: "" }],
//     }));
//   };

//   const removeSection = (indexToRemove) => {
//     setAboutData((prev) => ({
//       ...prev,
//       sections: prev.sections.filter((_, index) => index !== indexToRemove),
//     }));

//     setImagePreview((prev) => {
//       const newPreviews = { ...prev };
//       delete newPreviews[indexToRemove];
//       return newPreviews;
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Enhanced validation
//     if (!aboutData.title || !aboutData.quote || !aboutData.quoteAuthor) {
//       setError(
//         "Please fill in all required fields: Title, Quote, and Quote Author"
//       );
//       return;
//     }

//     if (aboutData.sections.length === 0) {
//       setError("Please add at least one section");
//       return;
//     }

//     // Validate sections
//     const invalidSection = aboutData.sections.find(
//       (section) => !section.title || !section.text
//     );
//     if (invalidSection) {
//       setError("All sections must have a title and text");
//       return;
//     }

//     try {
//       setLoading(true);
//       console.log("Submitting:", aboutData);

//       let result;
//       // Modify the logic to handle both create and update scenarios
//       if (aboutData._id) {
//         result = await updateAboutData(aboutData._id, {
//           title: aboutData.title,
//           quote: aboutData.quote,
//           quoteAuthor: aboutData.quoteAuthor,
//           sections: aboutData.sections,
//         });
//       } else {
//         result = await createAboutData({
//           title: aboutData.title,
//           quote: aboutData.quote,
//           quoteAuthor: aboutData.quoteAuthor,
//           sections: aboutData.sections,
//         });
//       }

//       console.log("API Response:", result);
//       alert("Content saved successfully!");
//       setError(null);

//       // Refresh data after successful save
//       await fetchAboutData();
//     } catch (err) {
//       console.error("Error saving data:", err);
//       // More detailed error handling
//       const errorMessage =
//         err.response?.data?.error ||
//         err.response?.data?.details ||
//         err.message ||
//         "Failed to save content";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="about-content-manager">
//       <h1>About Page Content Manager</h1>

//       {error && <div className="error-message">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Page Title</label>
//           <input
//             type="text"
//             name="title"
//             value={aboutData.title}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Quote</label>
//           <textarea
//             name="quote"
//             value={aboutData.quote}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Quote Author</label>
//           <input
//             type="text"
//             name="quoteAuthor"
//             value={aboutData.quoteAuthor}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         {aboutData.sections.map((section, index) => (
//           <div key={index} className="section-container">
//             <h3>Section {index + 1}</h3>
//             <input
//               type="text"
//               name="title"
//               placeholder="Section Title"
//               value={section.title}
//               onChange={(e) => handleInputChange(e, index)}
//               required
//             />
//             <textarea
//               name="text"
//               placeholder="Section Text"
//               value={section.text}
//               onChange={(e) => handleInputChange(e, index)}
//               required
//             />

//             <div className="image-upload-container">
//               <input
//                 type="file"
//                 id={`image-upload-${index}`}
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e, index)}
//                 hidden
//               />
//               <label
//                 htmlFor={`image-upload-${index}`}
//                 className="image-upload-label"
//               >
//                 <FaUpload /> Upload Image
//               </label>

//               {(imagePreview[index] || section.imageUrl) && (
//                 <div className="image-preview">
//                   <img
//                     src={imagePreview[index] || section.imageUrl}
//                     alt={`Section ${index + 1}`}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="remove-image-btn"
//                   >
//                     <FaTrash /> Remove
//                   </button>
//                 </div>
//               )}
//             </div>

//             <button
//               type="button"
//               onClick={() => removeSection(index)}
//               className="remove-section-btn"
//             >
//               Remove Section
//             </button>
//           </div>
//         ))}

//         <button type="button" onClick={addSection} className="add-section-btn">
//           Add New Section
//         </button>

//         <button type="submit" disabled={loading} className="submit-btn">
//           {isEditing ? "Update Content" : "Create Content"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AboutContentManager;


import React, { useState, useEffect } from "react";
import axios from "axios";
import // getAbout,
// updateAbout,
// createAbout,
// uploadImage,
"../../Services/AboutService";
import { FaTrash, FaUpload } from "react-icons/fa";

// Safely get environment variable
const getEnvVariable = (key, defaultValue) => {
  try {
    return window._env_ && window._env_[key]
      ? window._env_[key]
      : process.env[key] || defaultValue;
  } catch (error) {
    // console.warn(`Error accessing environment variable ${key}:`, error);
    return defaultValue;
  }
};

const API_BASE_URL = getEnvVariable(
  "VITE_API_BASE_URL",
  "https://trayamb.onrender.com"
);

const fetchAboutData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/about`);
    console.log("api date:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching about data:", error);
  }
};

const createAboutData = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/about`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating about data:", error);
  }
};

const updateAboutData = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/about/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating about data:", error);
  }
};

const deleteAboutData = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/api/about/${id}`);
  } catch (error) {
    console.error("Error deleting about data:", error);
  }
};

const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await axios.post(`${API_BASE_URL}/upload-image`, formData);
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

function AboutContentManager() {
  const [aboutData, setAboutData] = useState({
    title: "",
    quote: "",
    quoteAuthor: "",
    sections: [{ title: "", text: "", imageUrl: "" }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState({});

  // useEffect(() => {
  //   fetchAboutData().then((data) => {
  //     console.log("Fetched data:", response.data);

  //     if (data) {
  //       // Ensure all required fields exist
  //       const formattedData = {
  //         _id: data._id || null,
  //         title: data.title || "",
  //         quote: data.quote || "",
  //         quoteAuthor: data.quoteAuthor || "",
  //         sections:
  //           data.sections && data.sections.length > 0
  //             ? data.sections.map((section) => ({
  //                 title: section.title || "",
  //                 text: section.text || "",
  //                 imageUrl: section.imageUrl || "",
  //               }))
  //             : [{ title: "", text: "", imageUrl: "" }],
  //       };

  //       console.log("Formatted data:", formattedData); // Debugging log
  //       setAboutData(formattedData);
  //       setIsEditing(!!data._id);

  //       // Initialize image previews
  //       const previews = {};
  //       formattedData.sections.forEach((section, index) => {
  //         if (section.imageUrl) {
  //           previews[index] = section.imageUrl;
  //         }
  //       });
  //       setImagePreview(previews);
  //     } else {
  //       console.error("No data returned from fetch.");
  //     }
  //   });
  // }, []);
useEffect(() => {
  const loadData = async () => {
    const data = await fetchAboutData();
    console.log("Fetched data:", data); // Log the fetched data

    if (data) {
      // Ensure all required fields exist
      const formattedData = {
        _id: data._id || null,
        title: data.title || "",
        quote: data.quote || "",
        quoteAuthor: data.quoteAuthor || "",
        sections:
          data.sections && data.sections.length > 0
            ? data.sections.map((section) => ({
                title: section.title || "",
                text: section.text || "",
                imageUrl: section.imageUrl || "",
              }))
            : [{ title: "", text: "", imageUrl: "" }],
      };

      console.log("Formatted data:", formattedData); // Debugging log
      setAboutData(formattedData);
      setIsEditing(!!data._id);

      // Initialize image previews
      const previews = {};
      formattedData.sections.forEach((section, index) => {
        if (section.imageUrl) {
          previews[index] = section.imageUrl;
        }
      });
      setImagePreview(previews);
    } else {
      console.error("No data returned from fetch.");
    }
  };

  loadData();
}, []);
  const handleInputChange = (e, sectionIndex = null) => {
    const { name, value } = e.target;
    setAboutData((prev) => {
      if (sectionIndex === null) {
        return { ...prev, [name]: value };
      }
      const updatedSections = [...prev.sections];
      updatedSections[sectionIndex] = {
        ...updatedSections[sectionIndex],
        [name]: value,
      };
      return { ...prev, sections: updatedSections };
    });
  };

  const handleImageUpload = async (e, sectionIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError(
        "Invalid file type. Please upload JPEG, PNG, GIF, or WebP images."
      );
      return;
    }

    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    try {
      // Create local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => ({
          ...prev,
          [sectionIndex]: reader.result,
        }));
      };
      reader.readAsDataURL(file);

      // Upload to server
      const { imageUrl } = await uploadImage(file);

      // Ensure the imageUrl is a full URL
      const fullImageUrl = imageUrl.startsWith("http")
        ? imageUrl
        : `${API_BASE_URL}${imageUrl}`;

      setAboutData((prev) => {
        const updatedSections = [...prev.sections];
        updatedSections[sectionIndex].imageUrl = fullImageUrl;
        return { ...prev, sections: updatedSections };
      });
    } catch (err) {
      setError(err.message || "Image upload failed");
      console.error(err);
    }
  };

  const removeImage = (sectionIndex) => {
    setAboutData((prev) => {
      const updatedSections = [...prev.sections];
      updatedSections[sectionIndex].imageUrl = "";
      return { ...prev, sections: updatedSections };
    });

    setImagePreview((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[sectionIndex];
      return newPreviews;
    });
  };

  const addSection = () => {
    setAboutData((prev) => ({
      ...prev,
      sections: [...prev.sections, { title: "", text: "", imageUrl: "" }],
    }));
  };

  const removeSection = (indexToRemove) => {
    setAboutData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== indexToRemove),
    }));

    setImagePreview((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[indexToRemove];
      return newPreviews;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Enhanced validation
    if (!aboutData.title || !aboutData.quote || !aboutData.quoteAuthor) {
      setError(
        "Please fill in all required fields: Title, Quote, and Quote Author"
      );
      return;
    }

    if (aboutData.sections.length === 0) {
      setError("Please add at least one section");
      return;
    }

    // Validate sections
    const invalidSection = aboutData.sections.find(
      (section) => !section.title || !section.text
    );
    if (invalidSection) {
      setError("All sections must have a title and text");
      return;
    }

    try {
      setLoading(true);
      console.log("Submitting:", aboutData);

      let result;
      // Modify the logic to handle both create and update scenarios
      if (aboutData._id) {
        result = await updateAboutData(aboutData._id, {
          title: aboutData.title,
          quote: aboutData.quote,
          quoteAuthor: aboutData.quoteAuthor,
          sections: aboutData.sections,
        });
      } else {
        result = await createAboutData({
          title: aboutData.title,
          quote: aboutData.quote,
          quoteAuthor: aboutData.quoteAuthor,
          sections: aboutData.sections,
        });
      }

      console.log("API Response:", result);
      alert("Content saved successfully!");
      setError(null);

      // Refresh data after successful save
      await fetchAboutData();
    } catch (err) {
      console.error("Error saving data:", err);
      // More detailed error handling
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.details ||
        err.message ||
        "Failed to save content";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="about-content-manager">
      <h1>About Page Content Manager</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Page Title</label>
          <input
            type="text"
            name="title"
            value={aboutData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Quote</label>
          <textarea
            name="quote"
            value={aboutData.quote}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Quote Author</label>
          <input
            type="text"
            name="quoteAuthor"
            value={aboutData.quoteAuthor}
            onChange={handleInputChange}
            required
          />
        </div>

        {aboutData.sections.map((section, index) => (
          <div key={index} className="section-container">
            <h3>Section {index + 1}</h3>
            <input
              type="text"
              name="title"
              placeholder="Section Title"
              value={section.title}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <textarea
              name="text"
              placeholder="Section Text"
              value={section.text}
              onChange={(e) => handleInputChange(e, index)}
              required
            />

            <div className="image-upload-container">
              <input
                type="file"
                id={`image-upload-${index}`}
                accept="image/*"
                onChange={(e) => handleImageUpload(e, index)}
                hidden
              />
              <label
                htmlFor={`image-upload-${index}`}
                className="image-upload-label"
              >
                <FaUpload /> Upload Image
              </label>

              {(imagePreview[index] || section.imageUrl) && (
                <div className="image-preview">
                  <img
                    src={imagePreview[index] || section.imageUrl}
                    alt={`Section ${index + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="remove-image-btn"
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeSection(index)}
              className="remove-section-btn"
            >
              Remove Section
            </button>
          </div>
        ))}

        <button type="button" onClick={addSection} className="add-section-btn">
          Add New Section
        </button>

        <button type="submit" disabled={loading} className="submit-btn">
          {isEditing ? "Update Content" : "Create Content"}
        </button>
      </form>
    </div>
  );
}

export default AboutContentManager;


// import React, { useEffect, useState } from 'react';
// import { FaTrashAlt, FaEdit } from 'react-icons/fa';
// import { BaseUrl, delet, get } from '../services/Endpoint';
// import toast from 'react-hot-toast';

// export default function AllPost() {
//   const [posts,setPosts]=useState([])
//   const [loadedata,setLoadedata]=useState(false)

//   const handleDelete = async(postId) => {
//  // Display a confirmation dialog
//  const confirmed = window.confirm('Are you sure you want to delete this user?');

//  if (confirmed) {
//    try {
//      const response = await delet(`/blog/delete/${postId}`);
//      const data = response.data;

//      if (data.success) {
//        toast.success(data.message);
//        setLoadedata(!loadedata); // Trigger reloading the data

//      } else {
//        toast.error('Failed to delete the user.');
//      }
//    } catch (error) {
//      console.error('Error deleting user:', error);

//      if (error.response && error.response.data && error.response.data.message) {
//          // setError(error.response.data.message); // Set error message from server response
//          toast.error(error.response.data.message)
//      } else {
//          toast.error("An unexpected error occurred. Please try again.");
//      }
//    }
//  }
//   };

//   const handleUpdate = (postId) => {
//     // Implement the update functionality here
//     console.log(`Post with ID ${postId} updated.`);
//   };

//   useEffect(()=>{
//     const getposts=async()=>{
//       try {
//           const resposne= await get("/blog/GetPosts")
//           const data= resposne.data
//          setPosts(data.posts)
//           console.log(data)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     getposts()
//    },[loadedata])
//   return (
//     <div className="container ">
//       <h1 className="text-center mb-4 text-white">All Posts</h1>
//       <div className="row">
//         {posts && posts.map((post) => (
//           <div className="col-md-4 mb-4" key={post.id}>
//             <div className="card h-100">
//               <img src={`${BaseUrl}/images/${post.image}`} className="card-img-top" alt={post.title} />
//               <div className="card-body">
//                 <h5 className="card-title">{post.title}</h5>
//                 <p className="card-text">{post.description}</p>
//               </div>
//               <div className="card-footer d-flex justify-content-between">
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(post._id)}
//                 >
//                   <FaTrashAlt /> Delete
//                 </button>
//                 <button
//                   className="btn btn-warning"
//                   onClick={() => handleUpdate(post._id)}
//                 >
//                   <FaEdit /> Update
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { FaTrashAlt, FaEdit } from "react-icons/fa";
// import { BaseUrl, delet, get, post, put } from "../services/Endpoint";
// import toast from "react-hot-toast";

// export default function AllPost() {
//   const [posts, setPosts] = useState([]);
//   const [loadedata, setLoadedata] = useState(false);
//   const [editPost, setEditPost] = useState(null); // State to track post being edited
//   const [showEditor, setShowEditor] = useState(false); // Show/hide modal
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     image: null,
//   });

//   // Fetch posts
//   useEffect(() => {
//     const getPosts = async () => {
//       try {
//         const response = await get("/blog/GetPosts");
//         const data = response.data;
//         setPosts(data.posts);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     getPosts();
//   }, [loadedata]);

//   // Delete post
//   const handleDelete = async (postId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this post?"
//     );
//     if (confirmed) {
//       try {
//         const response = await delet(`/blog/delete/${postId}`);
//         if (response.data.success) {
//           toast.success(response.data.message);
//           setLoadedata(!loadedata);
//         } else {
//           toast.error("Failed to delete the post.");
//         }
//       } catch (error) {
//         toast.error(
//           error.response?.data?.message || "An unexpected error occurred."
//         );
//       }
//     }
//   };

//   // Open editor with selected post data
//   const handleUpdate = (post) => {
//     setEditPost(post._id);
//     setFormData({
//       title: post.title,
//       description: post.description,
//       image: null,
//     });
//     setShowEditor(true);
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   // Submit updated post
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("title", formData.title);
//       formDataToSend.append("description", formData.description);
//       if (formData.image) formDataToSend.append("image", formData.image);

//       const response = await put(`/blog/update/${editPost}`, formDataToSend);
//       console.log(response);
//       if (response.data.success) {
//         toast.success("Post updated successfully!");
//         setShowEditor(false);
//         setLoadedata(!loadedata);
//       } else {
//         toast.error("Failed to update post.");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "An error occurred.");
//     }
//   };

//   return (
//     <div className="container">
//       <h1 className="text-center mb-4 text-white">All Posts</h1>
//       <div className="row">
//         {posts.map((post) => (
//           <div className="col-md-4 mb-4" key={post._id}>
//             <div className="card h-100">
//               <img
//                 src={`${BaseUrl}/images/${post.image}`}
//                 className="card-img-top"
//                 alt={post.title}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{post.title}</h5>
//                 <p className="card-text">{post.description}</p>
//               </div>
//               <div className="card-footer d-flex justify-content-between">
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(post._id)}
//                 >
//                   <FaTrashAlt /> Delete
//                 </button>
//                 <button
//                   className="btn btn-warning"
//                   onClick={() => handleUpdate(post)}
//                 >
//                   <FaEdit /> Update
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal for editing */}
//       {showEditor && (
//         <div className="modal show d-block" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Edit Post</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowEditor(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label className="form-label">Title</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="title"
//                       value={formData.title}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Description</label>
//                     <textarea
//                       className="form-control"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Image</label>
//                     <input
//                       type="file"
//                       className="form-control"
//                       name="image"
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <button type="submit" className="btn btn-primary">
//                     Update Post
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { BaseUrl, delet, get, put } from "../Services/Endpoint";
import toast from "react-hot-toast";

export default function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loadedata, setLoadedata] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    previewImage: "",
  });

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await get("/blog/GetPosts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  }, [loadedata]);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await delet(`/blog/delete/${postId}`);
        if (response.data.success) {
          toast.success("Post deleted successfully!");
          setLoadedata(!loadedata);
        } else {
          toast.error("Failed to delete the post.");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "An error occurred.");
      }
    }
  };

  const handleUpdate = (post) => {
    setEditPost(post._id);
    setFormData({
      title: post.title,
      description: post.desc,
      image: null,
      previewImage: `${BaseUrl}/images/${post.image}`,
    });
    setShowEditor(true);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
        previewImage: file ? URL.createObjectURL(file) : "",
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      if (formData.image) formDataToSend.append("postimg", formData.image);

      const response = await put(`/blog/update/${editPost}`, formDataToSend);
      if (response.data.success) {
        toast.success("Post updated successfully!");
        setShowEditor(false);
        setLoadedata(!loadedata);
      } else {
        toast.error("Failed to update post.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4 text-white">All Posts</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-md-4 mb-4" key={post._id}>
            <div className="card h-100">
              <img
                src={`${BaseUrl}/images/${post.image}`}
                className="card-img-top"
                alt={post.title}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.desc}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post._id)}
                >
                  <FaTrashAlt /> Delete
                </button>
                <button
                  className="btn btn-warning"
                  onClick={() => handleUpdate(post)}
                >
                  <FaEdit /> Update
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditor && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Post</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditor(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="image"
                      onChange={handleChange}
                    />
                    {formData.previewImage && (
                      <img
                        src={formData.previewImage}
                        alt="Preview"
                        className="mt-2"
                        width="100%"
                        style={{ height: "250px" }}
                      />
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

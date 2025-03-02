import React, { useState, useEffect } from "react";
import { post, get } from "../../services/Endpoint";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const { id } = useParams(); // Get blog post ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we're in update mode
    if (id) {
      setIsUpdateMode(true);
      fetchBlogPost();
    }
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      const response = await get(`/blog/GetPostById/${id}`);
      const blogPost = response.data.post;

      setTitle(blogPost.title);
      setDescription(blogPost.desc);
      setExistingImage(blogPost.image);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      toast.error("Failed to load blog post for editing");
      navigate("/dashboard/allposts");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate inputs
      if (!title.trim() || !description.trim()) {
        toast.error("Title and description are required");
        return;
      }

      const formData = new FormData();

      // Append image if new image is selected
      if (image) {
        formData.append("postimg", image);
      }

      formData.append("title", title);
      formData.append("desc", description);

      let response;
      if (isUpdateMode) {
        // Update existing post
        response = await post(`/blog/update/${id}`, formData);
      } else {
        // Create new post
        response = await post("/blog/create", formData);
      }

      const data = response.data;

      if (data.success) {
        toast.success(
          isUpdateMode
            ? "Blog updated successfully"
            : "Blog created successfully"
        );

        // Reset form or navigate
        if (!isUpdateMode) {
          setTitle("");
          setImage(null);
          setDescription("");
        }

        // Navigate to all posts after successful operation
        navigate("/dashboard/allposts");
      } else {
        toast.error(data.message || "Operation failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing the blog post");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">
                {isUpdateMode ? "Update Post" : "Add New Post"}
              </h2>
            </div>
            <div className="card-body p-4">
              <form method="post" encType="multipart/form-data">
                <div className="mb-4">
                  <label htmlFor="postImage" className="form-label">
                    {isUpdateMode ? "Update Image" : "Upload Image"}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {existingImage && !image && (
                    <div className="mt-2">
                      <small>Current Image:</small>
                      <img
                        src={`/images/${existingImage}`}
                        alt="Current"
                        style={{ maxWidth: "200px", maxHeight: "200px" }}
                      />
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="postTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postTitle"
                    placeholder="Enter post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="postDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="postDescription"
                    rows="6"
                    placeholder="Write your post description here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    onClick={handleSubmit}
                  >
                    {isUpdateMode ? "Update Post" : "Submit Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./Blog.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../../Services/Endpoint";
import CardBlog from "../../Components/CardBlog";
import moment from "moment";
function AllBlog() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const request = await get("/blog/GetPosts");
        const response = request.data;
        setBlogs(response.posts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const truncateText = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  return (
    <div className="blog">
      <div className="blog-header">
        <h1>
          Articles & News
          <p>
            <Link to="/">Home</Link> / All Blog
          </p>
        </h1>
      </div>

      {/* Blog Articles Section */}
      <div className="blogArticles">
        <h1>Articles & News</h1>
        <p>
          It is a long established fact that a reader will be distracted by the
          of readable content of a page when lookings at its layouts
        </p>
        <div className="container">
          <div className="row">
            <div className="blog-art-list">
              {blogs.length > 0 ? (
                // blogs.slice(0, 4).map(
                //   (
                //     blog
                //   ) => (
                blogs.map((blog) => (
                  <CardBlog
                    key={blog._id}
                    image={`${BaseUrl}/uploads/${blog.image}`}
                    title={blog.title}
                    description={truncateText(blog.desc, 20)}
                    date={moment(blog.createdAt).format("D MMMM, YYYY")}
                    id={blog._id}
                  />
                ))
              ) : (
                <p>Loading articles...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBlog;

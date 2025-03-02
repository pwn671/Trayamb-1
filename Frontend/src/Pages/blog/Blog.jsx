// import React, { useEffect, useState } from "react";
// import "./blog.css";
// import latestNews from "../../images/articles/blogLatest.jpg";
// import article1 from "../../images/articles/article1.jpg";
// import article2 from "../../images/articles/article2.jpg";
// import article3 from "../../images/articles/article3.jpg";
// import article4 from "../../images/articles/article4.jpg";
// import { IoIosArrowForward } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { BaseUrl, get } from "../../services/Endpoint";

// function Blog() {
//   const navigation = useNavigate();

//   const handleBlog = (id) => {
//     navigation(`/blog/${id}`);
//   };

//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const request = await get("/blog/GetPosts");
//         const response = request.data;
//         setBlogs(response.posts);
//         console.log("blogs", response);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   // Helper function to truncate text to a specific number of words
//   const truncateText = (text, wordLimit) => {
//     const words = text.split(" ");
//     if (words.length > wordLimit) {
//       return words.slice(0, wordLimit).join(" ") + "...";
//     }
//     return text;
//   };

//   // const handleChange = (e) => {
//   //   const pClassList = e.target.parentElement;
//   //   if (e.target.classList.contains("notaken")) {
//   //     for (let i = 0; i < pClassList.childNodes.length; i++) {
//   //       if (pClassList.childNodes[i].className === "blog-art taken") {
//   //         pClassList.childNodes[i].className = "blog-art notaken";
//   //       }
//   //     }
//   //     e.target.classList.remove("notaken");
//   //     e.target.classList.add("taken");
//   //   } else if (e.target.classList.contains("taken")) {
//   //     for (let i = 0; i < pClassList.childNodes.length; i++) {
//   //       if (pClassList.childNodes[i].className === "blog-art taken") {
//   //         pClassList.childNodes[i].className = "blog-art notaken";
//   //       }
//   //     }
//   //   }
//   // };
//   return (
//     <div className="blog">
//       <div className="blog-header">
//         <h1>
//           Articles & News<p>Home / Blog</p>
//         </h1>
//       </div>

//       <div className="latestNews">
//         <h1>Latest Post</h1>
//         <div className="lNews">
//           <div className="ln-img">
//             <img src={`${BaseUrl}/images/`} alt="news"></img>
//           </div>
//           <div className="ln-text">
//             <div className="ln-subtext">
//               <h1>{elem.title}</h1>
//               <p>{truncateText(elem.desc, 20)}</p>
//             </div>
//             <div className="ln-detail">
//               <p className="ac-date">3 March 2023</p>
//               <Link to={`/blog-details`}>
//                 <button>
//                   <IoIosArrowForward />
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="blogArticles">
//         <h1>Articles & News</h1>
//         <div className="blog-art-list">
//           <div className="blog-art notaken" onClick={handleChange}>
//             <div className="blog-art-header">
//               <img src={article1} alt="article"></img>
//             </div>
//             <div className="blog-art-content">
//               <p>Let’s Get Solution For Building Construction Work</p>
//               <div className="ba-detail">
//                 <p className="ba-date">3 March 2023</p>
//                 <Link to={`/blog-details`}>
//                   <button>
//                     <IoIosArrowForward />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="blog-art notaken" onClick={handleChange}>
//             <div className="blog-art-header">
//               <img src={article1} alt="article"></img>
//             </div>
//             <div className="blog-art-content">
//               <p>Let’s Get Solution For Building Construction Work</p>
//               <div className="ba-detail">
//                 <p className="ba-date">3 March 2023</p>
//                 <Link to={`/blog-details`}>
//                   <button>
//                     <IoIosArrowForward />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="blog-art notaken" onClick={handleChange}>
//             <div className="blog-art-header">
//               <img src={article1} alt="article"></img>
//             </div>
//             <div className="blog-art-content">
//               <p>Let’s Get Solution For Building Construction Work</p>
//               <div className="ba-detail">
//                 <p className="ba-date">3 March 2023</p>
//                 <Link to={`/blog-details`}>
//                   <button>
//                     <IoIosArrowForward />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="blog-art notaken" onClick={handleChange}>
//             <div className="blog-art-header">
//               <img src={article1} alt="article"></img>
//             </div>
//             <div className="blog-art-content">
//               <p>Let’s Get Solution For Building Construction Work</p>
//               <div className="ba-detail">
//                 <p className="ba-date">3 March 2023</p>
//                 <Link to={`/blog-details`}>
//                   <button>
//                     <IoIosArrowForward />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="blog-art notaken" onClick={handleChange}>
//             <div className="blog-art-header">
//               <img src={article1} alt="article"></img>
//             </div>
//             <div className="blog-art-content">
//               <p>Let’s Get Solution For Building Construction Work</p>
//               <div className="ba-detail">
//                 <p className="ba-date">3 March 2023</p>
//                 <Link to={`/blog-details`}>
//                   <button>
//                     <IoIosArrowForward />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="blog-art notaken" onClick={handleChange}>
//             <div className="blog-art-header">
//               <img src={article1} alt="article"></img>
//             </div>
//             <div className="blog-art-content">
//               <p>Let’s Get Solution For Building Construction Work</p>
//               <div className="ba-detail">
//                 <p className="ba-date">3 March 2023</p>
//                 <Link to={`/blog-details`}>
//                   <button>
//                     <IoIosArrowForward />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Blog;
// import React, { useEffect, useState } from "react";
// import "./blog.css";
// import { IoIosArrowForward } from "react-icons/io";
// import { Link, useNavigate } from "react-router-dom";
// import { BaseUrl, get } from "../../services/Endpoint";
// import CardBlog from "../../Components/CardBlog";

// function Blog() {
//   const navigate = useNavigate();
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const request = await get("/blog/GetPosts");
//         const response = request.data;
//         setBlogs(response.posts);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchBlogs();
//   }, []);

//   const truncateText = (text, wordLimit) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     return words.length > wordLimit
//       ? words.slice(0, wordLimit).join(" ") + "..."
//       : text;
//   };

//   return (
//     <div className="blog">
//       <div className="blog-header">
//         <h1>
//           Articles & News
//           <p>
//             {" "}
//             <Link to="/">Home</Link> / Blog
//           </p>
//         </h1>
//       </div>

//       {/* Latest News Section */}
//       <div className="latestNews">
//         <h1>Latest Post</h1>
//         {blogs.length > 0 ? (
//           <div className="lNews">
//             <div className="ln-img">
//               <img
//                 src={`${BaseUrl}/images/${blogs[blogs.length - 1].image}`}
//                 alt="Latest News"
//               />
//             </div>
//             <div className="ln-text">
//               <div className="ln-subtext">
//                 <h1>{blogs[blogs.length - 1].title}</h1>
//                 <p>{truncateText(blogs[blogs.length - 1].desc, 20)}</p>
//               </div>
//               <div className="ln-detail">
//                 <p className="ac-date">{blogs[blogs.length - 1].date}</p>
//                 <Link to={`/blog/${blogs[blogs.length - 1]._id}`}>
//                   <button>
//                     <IoIosArrowForward />
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>Loading latest post...</p>
//         )}
//       </div>

//       {/* Blog Articles Section */}
//       <div className="blogArticles">
//         <h1>Articles & News</h1>
//         <div className="container">
//           <div className="row">
//             <div className="blog-art-list">
//               {blogs.length > 0 ? (
//                 blogs.slice(0, 6).map(
//                   (
//                     blog // Only show first 4 articles
//                   ) =>
//                     (<CardBlog />)(
//                       <div className="col-md-4 mb-4">
//                         <div className="blog-art notaken" key={blog._id}>
//                           <div className="blog-art-header">
//                             <img
//                               src={`${BaseUrl}/images/${blog.image}`}
//                               alt="Article"
//                             />
//                           </div>
//                           <div className="blog-art-content">
//                             <p>{blog.title}</p>
//                             <div className="ba-detail">
//                               <p className="ba-date">{blog.date}</p>
//                               <Link to={`/blog/${blog._id}`}>
//                                 <button>
//                                   <IoIosArrowForward />
//                                 </button>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )
//                 )
//               ) : (
//                 <p>Loading articles...</p>
//               )}
//             </div>
//             <div className="view-all-blogs">
//               <Link to="/all-blogs">
//                 <button>View All Blogs</button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Blog;

import React, { useEffect, useState } from "react";
import "./blog.css";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, get } from "../../services/Endpoint";
import CardBlog from "../../Components/CardBlog";
import moment from "moment";
import ArticlesBlog from "./ArticlesBlog";
function Blog() {
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
            <Link to="/">Home</Link> / Blog
          </p>
        </h1>
      </div>

      {/* Latest News Section */}
      <div className="latestNews">
        <h1>Latest Post</h1>
        {blogs.length > 0 ? (
          <div className="lNews">
            <div className="ln-img">
              <img
                src={`${BaseUrl}/images/${blogs[blogs.length - 1].image}`}
                alt="Latest News"
              />
            </div>
            <div className="ln-text">
              <div className="ln-subtext">
                <h1>{blogs[blogs.length - 1].title}</h1>
                <p>{truncateText(blogs[blogs.length - 1].desc, 20)}</p>
              </div>
              <div className="ln-detail">
                <p className="ac-date">
                  {moment(blogs.createdAt).format(" D MMMM, YYYY")}
                </p>

                <Link to={`/blog/${blogs[blogs.length - 1]._id}`}>
                  <button>
                    <IoIosArrowForward />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading latest post...</p>
        )}
      </div>

      <ArticlesBlog />
    </div>
  );
}

export default Blog;

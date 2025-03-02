// import React from "react";

// const CardBlog = () => {
//   return (
//     <div className="col-md-4 mb-4">
//       <div className="blog-art notaken" key={blog._id}>
//         <div className="blog-art-header">
//           <img src={`${BaseUrl}/images/${blog.image}`} alt="Article" />
//         </div>
//         <div className="blog-art-content">
//           <p>{blog.title}</p>
//           <div className="ba-detail">
//             <p className="ba-date">{blog.date}</p>
//             <Link to={`/blog/${blog._id}`}>
//               <button>
//                 <IoIosArrowForward />
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CardBlog;

import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

function CardBlog({ image, title, description, date, id }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="blog-art notaken">
        <div className="blog-art-header">
          <img src={image} alt="Article" />
        </div>
        <div className="blog-art-content">
          <p>{title}</p>
          {/* <p className="blog-desc">{description}</p> */}
          <div className="ba-detail">
            <p className="ba-date">{date}</p>
            <Link to={`/blog/${id}`}>
              <button>
                <IoIosArrowForward />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBlog;

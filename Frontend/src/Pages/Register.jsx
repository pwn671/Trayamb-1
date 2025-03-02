import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmpassword: "",
    image: null, // To store the selected image
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById("image").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("username", value.username);
    formData.append("email", value.email);
    formData.append("phonenumber", value.phonenumber);
    formData.append("password", value.password);
    formData.append("confirmpassword", value.confirmpassword);
    formData.append("profile", value.image); // Using 'profile' as the key for the image

    try {
      const response = await post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      if (data.success) {
        console.log(data.message);
        navigate("/login");
        toast.success(data.message);
      }
      console.log("register api", data);
    } catch (error) {
      console.log(error);
      console.error("login error", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // setError(error.response.data.message); // Set error message from server response
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <section className="bg-light">
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
          <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
            <div className="card-body p-4">
              <h1 className="h5  fw-bold text-dark">Create an account</h1>
              <form onSubmit={handleSubmit}>
                <div className=" text-center">
                  <label htmlFor="image" className="form-label">
                    Profile Picture
                  </label>
                  <div className="d-flex justify-content-center ">
                    <img
                      src={
                        value.image
                          ? URL.createObjectURL(value.image)
                          : "https://via.placeholder.com/150"
                      }
                      alt="avatar"
                      className="rounded-circle border-2 border-indigo-600 border-solid"
                      width="100"
                      height="100"
                      style={{ cursor: "pointer" }}
                      onClick={handleImageClick} // Click event to trigger file input
                    />
                  </div>
                  <input
                    type="file"
                    className="form-control d-none" // Hide the file input
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Full Name"
                    required
                    value={value.name}
                    onChange={(e) =>
                      setValue({ ...value, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="User Name"
                    required
                    value={value.username}
                    onChange={(e) =>
                      setValue({ ...value, username: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@company.com"
                    required
                    value={value.email}
                    onChange={(e) =>
                      setValue({ ...value, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phonenumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phonenumber"
                    placeholder="Phone Number"
                    required
                    value={value.phonenumber}
                    onChange={(e) =>
                      setValue({ ...value, phonenumber: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={value.password}
                    onChange={(e) =>
                      setValue({ ...value, password: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmpassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="confirmpassword"
                    className="form-control"
                    id="confirmpassword"
                    placeholder="••••••••"
                    required
                    value={value.confirmpassword}
                    onChange={(e) =>
                      setValue({ ...value, confirmpassword: e.target.value })
                    }
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Sign up
                </button>
              </form>
              <p className="mt-3 mb-0 text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-primary">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

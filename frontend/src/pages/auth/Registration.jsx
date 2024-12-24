import React, { useState, useEffect } from "react";
import "./Commonouterpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Frontend validation
      if (!name || !email || !phonenumber || !password || !confirmpassword) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }
      if (password !== confirmpassword) {
        alert("Password and Confirm Password do not match");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        setLoading(false);
        return;
      }
      if (!email.includes("@")) {
        alert("Please enter a valid email address");
        setLoading(false);
        return;
      }
      console.log("API Request Payload:", {
        name,
        email,
        phonenumber,
        password,
        confirmpassword,
      });
      // Make API call without sending ConfirmPassword
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          name,
          email,
          phonenumber,
          password,
          confirmpassword,
        }
      );
      alert(data?.message || "Registration Successful");
      setSuccessMessage("Registration Successful! Redirecting to login...");
      setLoading(false);

      // Redirect to Login page
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="backgroundcss">
      <div className="middlewareform">
        <h3 className="heading">Registration Form </h3>
        <p>Do not have an account?</p>
        <form onSubmit={handlesubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Name"
          />
          <br />

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email id"
          />
          <br />
          <input
            type="text"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
            placeholder="Enter your Number"
          />
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />
          <br />
          <input
            type="password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            placeholder="Enter your Confirm Password"
          />
          <br />
          <button type="submit" className="signupbutton">
            {" "}
            SignUp
          </button>
          <br />
          <p>{successMessage}</p>
        </form>

        <p>
          Already have an account.? <a href="">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;

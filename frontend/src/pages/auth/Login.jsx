import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import "./Commonouterpage.css";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../conrext/authcontext";
import axios from "axios";

import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate
  const handlesubmit = async () => {
    setLoading(true);
    try {
      if (!email || !password) {
        alert("Please fill all fields");
        setLoading(false);
        return;
      }
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        { email, password }
      );
      //setState(data);
      login();
      await AsyncStorage.setItem("@auth", JSON.stringify(data));
      alert(data?.message || "Login successful");
      console.log("Login Data:", { email, password });
      setLoading(false);

      // Navigate to the home screen after login
      // Uncomment if navigation is set up
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="backgroundcss">
      <div className="middlewareform">
        <div className="heading">
          <h3>Create Your Account</h3>
          <p>Please enter your login credentials to access your account.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email id"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <p className="remember">
            <input type="checkbox" id="rememberMe" /> Remember Me
          </p>
          <button
            className="signinbutton"
            onClick={handlesubmit} // Removed the parentheses to fix the function invocation issue
            disabled={loading} // Disable button while loading
          >
            {loading ? "Loading..." : "Sign In"}
          </button>

          <p className="forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <div className="divisionclass">or</div>
          <button className="facebook">
            <FaFacebookF /> Facebook
          </button>
          <button className="google">
            <FaGoogle /> Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

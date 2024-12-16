import React from "react";
import { Link } from "react-router-dom";
import "./Commonouterpage.css"
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

function Login() {
  return (

    <div className="backgroundcss">
      <div className="middlewareform">
        <div className="heading">
          <h3>Create Your Account</h3>
          <p>Please enter your login credentials to access your account.</p>
          <input type="text" placeholder="Enter your Email id" />
          <input type="text" placeholder="Enter Password" />
          <p className="remember">Remember Me</p>
          <button className="signinbutton">SignIn </button>

        <p className="forgot"> <Link to=""> Forgot Password ?</Link> </p>
        <div className="divisionclass">
          or 
        </div>
        <button className="facebook"> <FaFacebookF /> Facebook</button>
        <button className="google"> <FaGoogle /> Google</button>
          
          

        </div>
      </div>
    </div>

  )
}

export default Login;

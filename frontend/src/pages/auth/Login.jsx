import { Link } from "react-router-dom";
import React, {useState} from "react";
import "./Commonouterpage.css"
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

function Login() {
    const [EnteryourEmailid,setEnteryourEmailid] = useState("");
    const [EnterPassword,setEnterPassword] = useState("");

    const handlesubmit=(e)=>{
      // e.preventDefault();
      // localStorage.clear();
      let userData = {
       EnteryourEmailid : EnteryourEmailid,
       EnteryourPassword : EnteryourPassword,
      };
      localStorage.getItem("userInfo", JSON.stringify(userData));
      console.log(EnteryourEmailid,EnterPassword)
    }
  return (

    <div className="backgroundcss">
      <div className="middlewareform">
        <div className="heading">
          <h3>Create Your Account</h3>
          <p>Please enter your login credentials to access your account.</p>
          <input type="text" value={EnteryourEmailid} onChange={()=>setEnteryourEmailid(event.target.value)}  placeholder="Enter your Email id" />
          <input type="text" value={EnterPassword}onChange={()=>setEnterPassword(event.target.value)}  placeholder="Enter Password" />
          <p className="remember">Remember Me</p>
          <button className="signinbutton" onClick={handlesubmit()}>SignIn </button>

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

import React, { useState,useEffect } from "react";
import "./Commonouterpage.css"

function Registration() {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [EnteryourEmailid,setEnteryourEmailid] = useState("");
  const [EnteryourNumber,setEnteryourNumber] = useState("");
  const [EnteryourPassword,setEnteryourPassword] = useState("");
  const [EnteryourConfirmPassword,setEnteryourConfirmPassword] = useState("");
  const [successMessage,setsuccessMessage] = useState("");
 
  const handlesubmit = (e) => {
    e.preventDefault();
    // setFormValues((prevFormValues) => [...prevFormValues, initialValues]);
    localStorage.clear();
    let userData = {
    firstName : firstName,
  lastName : lastName,
  EnteryourEmailid : EnteryourEmailid,
  EnteryourNumber : EnteryourNumber,
  EnteryourPassword : EnteryourPassword,
  EnteryourConfirmPassword : EnteryourConfirmPassword,
    };
    localStorage.setItem("userInfo", JSON.stringify(userData));
    setsuccessMessage("Successfull registration")
  };

  return(
  <div className="backgroundcss">
<div className="middlewareform">
  <h3 className="heading">Registration Form </h3>
  <p>Do not have an account?</p>
  <form onSubmit={handlesubmit}>

  <input type="text" value={firstName} onChange={(e)=>setFirstName(event.target.value)} placeholder="First Name"/><br />
  <input type="text" value={lastName} onChange={(e)=>setLastName(event.target.value)} placeholder="Last Name" /><br />
  <input type="text" value={EnteryourEmailid}  onChange={(e)=>setEnteryourEmailid(event.target.value)} placeholder="Enter your Email id" /><br />
  <input type="text" value={EnteryourNumber} onChange={(e)=>setEnteryourNumber(event.target.value)} placeholder="Enter your Number" /><br />
  <input type="password" value={EnteryourPassword} onChange={(e)=>setEnteryourPassword(event.target.value)} placeholder="Enter your Password"/><br />
  <input type="password" value={EnteryourConfirmPassword}  onChange={(e)=>setEnteryourConfirmPassword(event.target.value)} placeholder="Enter your Confirm Password" /><br />
  <button type="submit" className="signupbutton" > SignUp</button><br />
  <p>{successMessage}</p>

  </form>
 
  <p>Already have an account.? <a href="">Login</a></p>
  </div>    
  </div>
  ) 

}

export default Registration;


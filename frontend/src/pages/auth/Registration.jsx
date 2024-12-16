import React, { useState } from "react";
import "./Commonouterpage.css"

function Registration() {

  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [EnteryourEmailid,setEnteryourEmailid] = useState("");
  const [EnteryourNumber,setEnteryourNumber] = useState("");
  const [EnteryourPassword,setEnteryourPassword] = useState("");
  const [EnteryourConfirmPassword,setEnteryourConfirmPassword] = useState("");
const handlesubmit=()=>{
  console.log(firstName,lastName,EnteryourEmailid,EnteryourNumber,EnteryourPassword,EnteryourConfirmPassword)
}

  return(
  <div className="backgroundcss">
<div className="middlewareform">
  <h3 className="heading">Registration Form </h3>
  <p>Do not have an account?</p>
  <input type="text" value={firstName} onChange={()=>setFirstName(event.target.value)} placeholder="First Name"/><br />
  <input type="text" value={lastName} onChange={()=>setLastName(event.target.value)} placeholder="Last Name" /><br />
  <input type="text" value={EnteryourEmailid}  onChange={()=>setEnteryourEmailid(event.target.value)} placeholder="Enter your Email id" /><br />
  <input type="text" value={EnteryourNumber} onChange={()=>setEnteryourNumber(event.target.value)} placeholder="Enter your Number" /><br />
  <input type="password" value={EnteryourPassword} onChange={()=>setEnteryourPassword(event.target.value)} placeholder="Enter your Password"/><br />
  <input type="password" value={EnteryourConfirmPassword}  onChange={()=>setEnteryourConfirmPassword(event.target.value)} placeholder="Enter your Confirm Password" /><br />
  <button  className="signupbutton" onClick={handlesubmit()}> SignUp</button><br />
  <p>Already have an account.? <a href="">Login</a></p>
  </div>    
  </div>
  ) 

}

export default Registration;

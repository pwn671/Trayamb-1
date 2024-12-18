import React from 'react'
import { MdAddCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
function Contact() {
  return (
  <>

<div className='main'>
<div className='bgimg'>
    { /* bg-img */ }
    </div>
    <div className='contact'>
      <h1>Contact Us</h1>
    </div>
    <div className='content'>
        <p><a href="">Home</a></p>
        <p>contact</p>
       </div>

</div>
<div className='xxxx'>
<div className='container'>
  <h4>Send us email</h4>
  <h2>Feel free to write</h2>
  <form>
    <div className='inputrow'>
      <input type="text" placeholder='Enter Name' />
      <input type="text" placeholder='Enter Email' />
    </div>
    <div className='inputrow'>
    <input type="text" placeholder=' Enter Subject' />
    <input type="text" placeholder='Enter Phone' />
    </div>
    <textarea placeholder='Enter message' rows="6"></textarea>
    <button className='send' type='submit'> SEND MESSAGE</button>
    <button className='reset' type='submit'> RESET</button>
  
  </form>
  
</div>

<div className='leftparent'>
<div>
  
  <h1>Get in touch with us</h1>
  <div className='h5'>
  <MdAddCall />
  <h5>Have any question</h5>
  <MdEmail />
  <h5>Write email</h5>
  <FaLocationDot />
  <h5>Visit any time</h5>
  </div>
</div>
</div>
</div>


</>
  )
}

export default Contact

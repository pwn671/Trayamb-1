import React from 'react'
import { MdAddCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Withcome from '../components/withcome';
function Contact() {
  return (
  <>
<Withcome name="contact"/>

<div className='xxxx'>
<div className='con'>
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
<h1>Get in touch with us</h1>
<div>
  <div className='h5'>
  <div className='mdicon'> <MdAddCall /></div> 
  <h5>Have any question ?</h5>
  <p>Free +92 (020)-9850</p>
  <div className='mdicon'><MdEmail /></div>
  <h5>Write email</h5>
  <p>needhelp@company.com</p>
 <div className="mdicon"> <FaLocationDot /></div>
  <h5>Visit any time</h5>
  <p>66 broklyn golden street. New York</p>
  </div>
</div>
</div>
</div>


</>
  )
}

export default Contact

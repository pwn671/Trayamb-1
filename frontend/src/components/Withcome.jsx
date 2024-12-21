import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function Withcome(props) {

  return (
    <div className='main withcome'>
 
        <div className='contact'>
          <h1>Contact Us</h1>
          <div className='cont'>
          <p><Link to="/">Home</Link></p>
          /
          <p>{props.name}</p>
         </div>
        </div>
       
    
    </div>
  )
}

export default Withcome

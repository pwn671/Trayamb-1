import React from 'react'
import Banner from './Banner'
import Ban from "../assets/3DJPG.jpg"
import Footer from './Footer'

function Home() {
  return (
    <div>
    <Banner/>
    
    <img src={Ban}/>
    <Footer/>
    </div>
  )
}

export default Home

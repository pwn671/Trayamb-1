import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
//import { Navbar } from '@material-tailwind/react';
import Navbar from "./components/Navbar";

function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

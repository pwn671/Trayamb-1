import Navbar from "./components/Navbar"
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from "./components/About";
import Home from "./components/Home";

function App() {
  return (
    <>
    
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="About" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

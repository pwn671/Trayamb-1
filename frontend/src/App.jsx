// import "./App.css";
// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Service from "./pages/Service";
// import Projects from "./pages/Projects";
// import Contact from "./pages/Contact";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Registration from "./pages/auth/Registration";
// import Login from "./pages/auth/Login";
// import Dashboard from "./innerpages/Dahboard";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/service" element={<Service />} />
//           <Route path="/projects" element={<Projects />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/registration" element={<Registration />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </BrowserRouter>
//       <Footer />
//     </>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./conrext/authcontext";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Dashboard from "./innerpages/Dahboard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PublicRoute>
                <About />
              </PublicRoute>
            }
          />
          <Route
            path="/service"
            element={
              <PublicRoute>
                <Service />
              </PublicRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PublicRoute>
                <Projects />
              </PublicRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PublicRoute>
                <Contact />
              </PublicRoute>
            }
          />
          <Route
            path="/registration"
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Default Route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};
export default App;

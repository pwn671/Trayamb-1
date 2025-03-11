import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { BaseUrl, post } from "../Services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";
import "./NavBar.css";
import { CodeIcon, HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import logo from "../assets/Logo.png";

export default function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [islogin, setIslogin] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = async () => {
    try {
      const request = await post("/auth/logout");
      const response = request.data;
      if (request.status == 200) {
        navigate("/login");
        dispatch(removeUser());
        toast.success(response.message);
      }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink exact to="/" className="nav-logo">
          <img src={logo} alt="logo" />
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              exact
              to="/"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/about"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/servicespage"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Service
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/project"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Projects
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/blog"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Blogs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              exact
              to="/contact"
              activeClassName="active"
              className="nav-links"
              onClick={handleClick}
            >
              Contact Us
            </NavLink>
          </li>
          {!user ? (
            <>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/register"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Registration
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <div className="dropdown">
              <div
                className="avatar-container pointer rounded-circle overflow-hidden bg-info"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: "40px", height: "40px", cursor: "pointer" }}
              >
                <img
                  className="img-fluid h-100 w-100"
                  src={`${BaseUrl}/uploads/${user.profile}`}
                  alt="Profile"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                {/* <li><span className='text-bold fs-4 dropdown-item'>{user && user.FullName}</span></li> */}
                {user.role == "admin" ? (
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <Link className="dropdown-item" to={`/profile/${user._id}`}>
                    Profile
                  </Link>
                </li>
                <li>
                  <a
                    className="dropdown-item "
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          )}
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

          {click ? (
            <span className="icon">
              <HamburgetMenuClose />{" "}
            </span>
          ) : (
            <span className="icon">
              <HamburgetMenuOpen />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

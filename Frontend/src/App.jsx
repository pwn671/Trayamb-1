import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/home/Home";
import Blog from "./Pages/Blog";

import UserLayout from "./Layout/UserLayout";
import Admin from "./Pages/Admin/Admin";
import Adminlayout from "./Layout/Adminlayout";
import AddPost from "./Pages/Admin/AddPost";
import User from "./Pages/Admin/User";
import AllPost from "./Pages/AllPost";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { Provider } from "react-redux";
import { peristor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import Profile from "./Pages/Profile";
import About from "./Pages/about/About";
import Project from "./Pages/project/Project";
import Services from "./Pages/services/Services";
import Blogs from "./Pages/blog/Blog";
import Contact from "./Pages/contact/Contact";
import AllBlog from "./Pages/blog/Allblog";
import AboutContentManager from "./Pages/Admin/AboutContentManager";
import ContactList from "./Pages/Admin/ContactList";
import ProjectManagement from "./Pages/Admin/ProjectManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <ToastContainer />
        <Provider store={store}>
          <PersistGate loading={null} persistor={peristor}>
            <Routes>
              <Route path="/" element={<UserLayout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/project" element={<Project />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blogs />} />
                <Route path="/all-blogs" element={<AllBlog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="blog/:postId" element={<Blog />}></Route>
                <Route path="/profile/:userId" element={<Profile />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
              </Route>
              <Route path="/dashboard" element={<Adminlayout />}>
                <Route index element={<Admin />} />
                <Route path="addpost" element={<AddPost />} />
                <Route path="users" element={<User />} />
                <Route path="allposts" element={<AllPost />} />
                <Route path="allcontactuser" element={<ContactList />} />
                <Route
                  path="projectmanagement"
                  element={<ProjectManagement />}
                />
                <Route
                  path="aboutcontentmanager"
                  element={<AboutContentManager />}
                />
              </Route>
            </Routes>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </>
  );
}

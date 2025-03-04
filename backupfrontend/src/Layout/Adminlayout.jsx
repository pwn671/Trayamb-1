import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Dashboard/Sidebar";
import { useSelector } from "react-redux";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

export default function Adminlayout() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  // console.log("user from reduxt", user);

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else if (user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="content flex-grow-1 p-4">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../../frontend/src/components/Header";
import Footer from "../../../frontend-old/src/components/Footer";
export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

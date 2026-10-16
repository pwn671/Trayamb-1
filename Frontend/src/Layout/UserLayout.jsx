import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import ChatbotWidget from "../Components/ChatbotWidget";
export default function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ChatbotWidget />
    </>
  );
}

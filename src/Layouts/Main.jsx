import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Starter from "../Components/Starter/Starter";
import Banner from "../Pages/Home/Banner/Banner"

const Main = () => {
  return (
    <>
      <Starter></Starter>
      <Banner></Banner>

      <Outlet></Outlet>
        {/* Sticky Navbar at the bottom */}
        <div className="fixed bottom-0 left-0 w-full bg-white z-50">
        <Navbar />
      </div>
    </>
  );
};

export default Main;

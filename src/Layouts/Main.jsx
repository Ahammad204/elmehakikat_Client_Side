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
      <div className="static">
      <Navbar></Navbar>
      </div>
    </>
  );
};

export default Main;

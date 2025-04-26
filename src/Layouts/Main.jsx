import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import Starter from "../Components/Starter/Starter";

const Main = () => {
  return (
    <>
      <Starter></Starter>


      <Outlet></Outlet>
      <div className="static">
      <Navbar></Navbar>
      </div>
    </>
  );
};

export default Main;

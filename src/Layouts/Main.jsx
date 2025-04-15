import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Shared/Navbar";
import { Starter } from "../Pages/Home/starter/Starter";

const Main = () => {
  return (
    <>
    <Starter></Starter>
    <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
};

export default Main;

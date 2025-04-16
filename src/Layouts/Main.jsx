import React from "react";
import { Outlet } from "react-router-dom";
import Starter from "../Components/Starter/Starter";
import Navbar from "../Components/Navbar/Navbar";

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

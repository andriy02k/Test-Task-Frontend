import React from "react";
import { Outlet } from "react-router-dom";
import Aside from "./Aside";

const Layout = () => {
  return (
    <>
      <Aside />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

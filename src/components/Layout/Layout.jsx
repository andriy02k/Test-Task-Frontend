import React from "react";
import { Outlet } from "react-router-dom";
import ChatList from "../ChatList/ChatList";

const Layout = () => {
  return (
    <>
      <ChatList />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import ChatList from "../ChatList/ChatList";
import css from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={css.container}>
      <ChatList />
      <div className={css.chatWindow}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import ChatList from "../components/ChatList";
import Filter from "../components/Filter";

const Aside = () => {
  return (
    <>
      <Filter />
      <ChatList />
    </>
  );
};

export default Aside;

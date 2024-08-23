import React from "react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Chat ID: {id ? id : "Choose anything chat"}</h1>
      {/* Відображення повідомлень та інтерфейсу чату */}
    </div>
  );
};

export default Chat;

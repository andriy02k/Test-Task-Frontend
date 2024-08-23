import React, { useState } from "react";
import { updateChat } from "../api/chatApi";

const EditChatModal = ({ chatId, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateChat(chatId, { firstName, lastName });
      setFirstName("");
      setLastName("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default EditChatModal;

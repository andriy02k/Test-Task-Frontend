import React, { useState } from "react";
import { createChat } from "../../api/chatApi";

const EditChatModal = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createChat({ firstName, lastName });
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
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default EditChatModal;
